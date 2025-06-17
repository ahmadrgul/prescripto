from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('doctor', 'Doctor'),
        ('patient', 'Patient'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.TextField()
    specialization = models.CharField(max_length=255)
    education = models.CharField(max_length=255)
    experience = models.SmallIntegerField()
    fee = models.DecimalField(max_digits=5, decimal_places=2)
    address = models.TextField()
    image = models.ImageField(upload_to='doctor_images', null=True)


class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    birthday = models.DateField()
    GENDER_CHOICES = (
        ('M', 'male'),
        ('F', 'female'),
        ('O', 'other'),
    )
    gender = models.CharField(max_length=5)
    image = models.ImageField(upload_to='pateint_images', null=True)
