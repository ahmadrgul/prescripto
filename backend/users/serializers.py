from rest_framework import serializers
from .models import DoctorProfile, PatientProfile
from .models import User

class DoctorProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')    
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password',write_only=True)

    class Meta:
        model = DoctorProfile
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'password',
            'description',
            'specialization',
            'education',
            'experience',
            'fee',
            'address'
        ]
        
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        username = user_data.pop('username')
        first_name = user_data.pop('first_name')
        last_name = user_data.pop('last_name')
        email = user_data.pop('email')
        password = user_data.pop('password')

        user = User.objects.create_user(username=username, email=email, password=password, first_name=first_name, last_name=last_name, role='doctor')

        doctor_profile = DoctorProfile.objects.create(user=user, **validated_data)
        return doctor_profile


class PatientProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
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
            'username',
            'email',
            'password',
            'address',
            'phone',
            'birthday',
            'gender',
        ]
        
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        username = user_data.pop('username')
        first_name = user_data.pop('first_name')
        last_name = user_data.pop('last_name')
        email = user_data.pop('email')
        password = user_data.pop('password')

        user = User.objects.create_user(username=username, email=email, password=password, first_name=first_name, last_name=last_name, role='patient')
        
        patient_profile = PatientProfile.objects.create(user=user, **validated_data)
        return patient_profile
