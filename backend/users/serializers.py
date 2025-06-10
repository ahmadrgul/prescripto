from rest_framework import serializers
from .models import DoctorProfile
from .models import User

class DoctorProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password',write_only=True)

    class Meta:
        model = DoctorProfile
        fields = [
            'id',
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
        email = user_data.pop('email')
        password = user_data.pop('password')

        user = User.objects.create_user(username=username, email=email, password=password)

        doctor_profile = DoctorProfile.objects.create(user=user, **validated_data)
        return doctor_profile
