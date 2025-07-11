from django.db import models

from users.models import DoctorProfile, PatientProfile


class Appointment(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE)
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    state = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("scheduled", "Scheduled"),
            ("completed", "Completed"),
            ("cancelled", "Cancelled"),
        ],
        default="pending",
    )
    paid = models.BooleanField(default=False)
    reserved_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["appointment_date", "appointment_time"], name="unique_date_time", condition=~models.Q(state="cancelled")
            ),
        ]


class DoctorSchedule(models.Model):
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE)
    weekday = models.SmallIntegerField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    slot_duration = models.SmallIntegerField()


class TimeOff(models.Model):
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE)
    date = models.DateField()
    reason = models.TextField(blank=True)
