from rest_framework import viewsets
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsParticipantOrAdmin, AllowAdminPatientOnPost


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
