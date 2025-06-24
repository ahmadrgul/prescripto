from rest_framework import viewsets
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsParticipantOrAdmin, AllowAdminPatientOnPost
from users.models import PatientProfile, DoctorProfile
from rest_framework.decorators import api_view
from rest_framework.response import Response


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated, IsParticipantOrAdmin, AllowAdminPatientOnPost]
    ordering_fields = ['appointment_date']
    search_fields = ['patient__user__firstname', 'patient__user__lastname' ,'doctor__user__firstname', 'doctor__user__lastname']
    filterset_fields = ['patient', 'doctor', 'state']

    def get_queryset(self):
        user = self.request.user

        if user.role == 'admin':
            return super().get_queryset()
        elif user.role == 'patient':
            return super().get_queryset().filter(patient__user=user)
        elif user.role == 'doctor':
            return super().get_queryset().filter(doctor__user=user)

        return Appointment.objects.none()


@api_view(['GET'])
def dashboard_stats(request):
    if not request.user.is_authenticated or request.user.role != 'admin':
        return Response({'detail': 'Not authorized'}, status=403)
    
    data = {
        'appointments': Appointment.objects.count(),
        'patients': PatientProfile.objects.count(),
        'doctors': DoctorProfile.objects.count(),
    }

    return Response(data)


@api_view(['GET'])
def recent_appointments(request):
    
    appointments = Appointment.objects.order_by('-appointment_date')[:10]
    serializer = AppointmentSerializer(appointments, many=True)
    
    return Response(serializer.data)