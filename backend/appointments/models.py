from django.db import models
from users.models import PatientProfile, DoctorProfile

class Appointment(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE)
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    state = models.CharField(max_length=20, choices=[
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ], default='scheduled')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['patient', 'appointment_date'], name='unique_patient_appointment'),
            models.UniqueConstraint(fields=['doctor', 'appointment_date'], name='unique_doctor_appointment'),
        ]
    