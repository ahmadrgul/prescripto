from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (AppointmentViewSet, DoctorScheduleByDoctorView,
                    DoctorScheduleViewSet, dashboard_stats,
                    recent_appointments, handle_expired_appointments)

router = DefaultRouter()
router.register(r"appointments", AppointmentViewSet, basename="appointment")
router.register(r"doctors-schedule", DoctorScheduleViewSet, basename="doctor-schedules")

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/stats/", dashboard_stats, name="dashboard-stats"),
    path(
        "dashboard/recent-appointments/",
        recent_appointments,
        name="recent-appointments",
    ),
    path("doctors/<int:doctor_id>/schedule", DoctorScheduleByDoctorView.as_view()),
    path("cron/run/handle-expired-appointments", handle_expired_appointments)
]
