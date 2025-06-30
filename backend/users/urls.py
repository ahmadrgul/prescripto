from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r"doctors", views.DoctorViewset, basename="doctor")
router.register(r"patients", views.PatientViewset, basename="patient")

urlpatterns = [
    path("", include(router.urls)),
    path("specializations", view=views.SpecializationListAPIView.as_view()),
    path("top-docs", view=views.TopDoctorsAPIView.as_view()),
]
