from rest_framework import serializers
from .models import DoctorProfile, PatientProfile
from .models import User
from djoser.serializers import UserSerializer as DjoserUserSerializer

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


class DoctorProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')    
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password', write_only=True)

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
            'image'
        ]
        
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        first_name = user_data.pop('first_name')
        last_name = user_data.pop('last_name')
        email = user_data.pop('email')
        password = user_data.pop('password')

        user = User.objects.create_user(email=email, password=password, first_name=first_name, last_name=last_name, role='doctor')

        doctor_profile = DoctorProfile.objects.create(user=user, **validated_data)
        return doctor_profile


class PatientProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')    
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password', write_only=True)

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
        first_name = user_data.pop('first_name')
        last_name = user_data.pop('last_name')
        email = user_data.pop('email')
        password = user_data.pop('password')

        user = User.objects.create_user(email=email, password=password, first_name=first_name, last_name=last_name, role='patient')
        
        patient_profile = PatientProfile.objects.create(user=user, **validated_data)
        return patient_profile


class SpecializationSerializer(serializers.Serializer):
    speciality = serializers.CharField()
