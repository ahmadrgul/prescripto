from rest_framework import serializers
from .models import Appointment
from django.utils import timezone
from users.models import PatientProfile


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'doctor', 'appointment_date', 'state']
        extra_kwargs = {
            'patient': {'required': False, 'allow_null': True, 'default': None}
        }

    def validate(self, data):
        user = self.context['request'].user

        if user.role == 'admin' and 'patient' not in data:
            raise serializers.ValidationError("Patient must be specified for admin-created appointments.")

        date = data.get('appointment_date')
        if date is not None:
            if date < timezone.now():
                raise serializers.ValidationError("Appointment date cannot be in the past.")
        
        return data
    
    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user

        if user.role == 'patient':
            patient = PatientProfile.objects.get(user=user)
            validated_data['patient'] = patient

        return Appointment.objects.create(**validated_data)
