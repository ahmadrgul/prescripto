from django.utils import timezone
from rest_framework import serializers

from users.models import DoctorProfile, PatientProfile
from users.serializers import DoctorProfileSerializer, PatientProfileSerializer

from .models import Appointment, DoctorSchedule


class AppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(
        queryset=PatientProfile.objects.all(),
        required=False,
        allow_null=True,
    )

    doctor = serializers.PrimaryKeyRelatedField(
        queryset=DoctorProfile.objects.all(), required=True
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "patient",
            "doctor",
            "appointment_date",
            "appointment_time",
            "state",
        ]

    def validate(self, data):
        user = self.context["request"].user

        if user.role == "admin" and "patient" not in data:
            raise serializers.ValidationError(
                "Patient must be specified for admin-created appointments."
            )

        date = data.get("appointment_date")
        if date is not None:
            if date < timezone.now().date():
                raise serializers.ValidationError(
                    "Appointment date cannot be in the past."
                )

        return data

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user

        if user.role == "patient":
            patient = PatientProfile.objects.get(user=user)
            validated_data["patient"] = patient

        return Appointment.objects.create(**validated_data)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["patient"] = (
            PatientProfileSerializer(instance.patient).data
            if instance.patient
            else None
        )
        rep["doctor"] = DoctorProfileSerializer(instance.doctor).data
        return rep


class DoctorScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorSchedule
        fields = ["weekday", "start_time", "end_time", "slot_duration"]
