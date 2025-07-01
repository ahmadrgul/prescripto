from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("doctor", "Doctor"),
        ("patient", "Patient"),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    email = models.EmailField(unique=True)
    last_name = models.CharField(max_length=150, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()


class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.TextField()
    speciality = models.CharField(max_length=255)
    education = models.CharField(max_length=255)
    experience = models.SmallIntegerField()
    fee = models.DecimalField(max_digits=5, decimal_places=2)
    address_line1 = models.TextField()
    address_line2 = models.TextField()
    image = models.ImageField(upload_to="doctor_images", default="defaults/upload_area.png")


class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(null=True, max_length=20)
    address_line1 = models.TextField(null=True)
    address_line2 = models.TextField(null=True)
    birthday = models.DateField(null=True)
    GENDER_CHOICES = (
        ("M", "male"),
        ("F", "female"),
        ("O", "other"),
    )
    gender = models.CharField(max_length=5, null=True)
    image = models.ImageField(upload_to="pateint_images", null=True)
