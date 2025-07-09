from collections import defaultdict
from datetime import date, datetime, timedelta

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import DoctorProfile, PatientProfile

from .models import Appointment, DoctorSchedule, TimeOff
from .permissions import AllowAdminPatientOnPost, IsParticipantOrAdmin
from .serializers import AppointmentSerializer, DoctorScheduleSerializer

from django.conf import settings
from django.core.management import call_command
from django.views.decorators.csrf import csrf_exempt



class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [
        IsAuthenticated,
        IsParticipantOrAdmin,
        AllowAdminPatientOnPost,
    ]
    ordering_fields = ["appointment_date", "state"]
    search_fields = [
        "patient__user__firstname",
        "patient__user__lastname",
        "doctor__user__firstname",
        "doctor__user__lastname",
    ]
    filterset_fields = ["patient", "doctor", "state"]

    def get_queryset(self):
        user = self.request.user

        if user.role == "admin":
            return super().get_queryset()
        elif user.role == "patient":
            return super().get_queryset().filter(patient__user=user)
        elif user.role == "doctor":
            return super().get_queryset().filter(doctor__user=user)

        return Appointment.objects.none()


class DoctorScheduleViewSet(viewsets.ModelViewSet):
    queryset = DoctorSchedule.objects.all()
    serializer_class = DoctorScheduleSerializer
    permission_classes = [IsAdminUser]


class DoctorScheduleByDoctorView(APIView):
    def get(self, request, doctor_id):
        schedules = DoctorSchedule.objects.filter(doctor_id=doctor_id)
        schedule_map = {s.weekday: s for s in schedules}
        days_off = set(
            TimeOff.objects.filter(doctor_id=doctor_id).values_list("date", flat=True)
        )

        today = date.today()
        next_week = today + timedelta(days=7)

        appointments = Appointment.objects.filter(
            doctor_id=doctor_id, appointment_date__range=[today, next_week], state="scheduled"
        )

        appointments_by_date = defaultdict(set)
        for app in appointments:
            app_date = app.appointment_date
            app_time = app.appointment_time
            appointments_by_date[app_date].add(app_time)

        refined_schedule = []

        for i in range(0, 7):
            day = today + timedelta(days=i)
            weekday = day.weekday()

            if weekday in schedule_map and day not in days_off:
                schedule = schedule_map[weekday]
                start_dt = datetime.combine(day, schedule.start_time)
                end_dt = datetime.combine(day, schedule.end_time)
                slot_duration = timedelta(minutes=schedule.slot_duration)

                slots = []
                current = start_dt
                while current < end_dt:
                    if current.time() not in appointments_by_date[day]:
                        slots.append(current.time().isoformat(timespec="minutes"))
                    current += slot_duration

                serialized = DoctorScheduleSerializer(schedule).data
                serialized["date"] = day.isoformat()
                serialized["slots"] = slots
                refined_schedule.append(serialized)

        return Response(refined_schedule)


@api_view(["GET"])
def dashboard_stats(request):
    if not request.user.is_authenticated or request.user.role != "admin":
        return Response({"detail": "Not authorized"}, status=403)

    data = {
        "appointments": Appointment.objects.count(),
        "patients": PatientProfile.objects.count(),
        "doctors": DoctorProfile.objects.count(),
    }

    return Response(data)


@api_view(["GET"])
def recent_appointments(request):
    appointments = Appointment.objects.exclude(state="cancelled").order_by("appointment_date")[:10]
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)

CRON_SECRET = settings.CRON_SECRET

@csrf_exempt
@api_view(["POST"])
def handle_expired_appointments(request):
    token = request.headers.get("X-CRON-TOKEN")
    if token != CRON_SECRET:
        return Response({"error": "Invalid Token"}, status=400)
    
    call_command("handle_expired_appointments")
    return Response({"status": "Job excecuted"})