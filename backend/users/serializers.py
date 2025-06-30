from rest_framework import serializers
from .models import DoctorProfile, PatientProfile, User
from djoser.serializers import UserSerializer as DjoserUserSerializer
from appointments.models import DoctorSchedule
import json


class UserSerializer(DjoserUserSerializer):
    class Meta():
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'password',
            'role',
        )
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        if password:
            user = User(**validated_data)
            user.set_password(password)
            user.save()
            return user
        raise serializers.ValidationError("Password is required to create a user.")

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class AvailabilityField(serializers.ListField):
    def to_internal_value(self, data):
        data = data.copy()
        data = json.loads(data[0])

        return super().to_internal_value(data)


class DoctorProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')    
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password', write_only=True)

    availability = AvailabilityField(child=serializers.DictField(),write_only=True)

    class Meta:
        model = DoctorProfile
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'password',
            'description',
            'speciality',
            'education',
            'experience',
            'fee',
            'address_line1',
            'address_line2',
            'image',
            'availability',
        ]

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        schedule_data = validated_data.pop('availability')
        
        user = User.objects.create_user(
            email=user_data.pop('email'), 
            password=user_data.pop('password'), 
            first_name=user_data.pop('first_name'), 
            last_name=user_data.pop('last_name'), 
            role='doctor')

        doctor_profile = DoctorProfile.objects.create(user=user, **validated_data)

        for schedule in schedule_data:
            DoctorSchedule.objects.create(doctor=doctor_profile, **schedule)

        return doctor_profile
        


class PatientProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name', required=False)    
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password', write_only=True)

    address = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    birthday = serializers.DateField(required=False, allow_null=True)
    gender = serializers.ChoiceField(choices=[('M', 'Male'), ('F', 'Female'), ('N', 'Non-B')], required=False)
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = PatientProfile
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'password',
            'address',
            'phone',
            'birthday',
            'gender',
            'image',
        ]
        
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['role'] = 'patient'
        serialized_user = UserSerializer(data=user_data)
        serialized_user.is_valid(raise_exception=True)
        user = serialized_user.save()
        
        patient_profile = PatientProfile.objects.create(user=user, **validated_data)
        return patient_profile


class SpecializationSerializer(serializers.Serializer):
    speciality = serializers.CharField()
