from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AppointmentViewSet, dashboard_stats, recent_appointments

router = DefaultRouter()
router.register(r'appointments', AppointmentViewSet, basename='appointment')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/stats/', dashboard_stats, name='dashboard-stats'),
    path('dashboard/recent-appointments/', recent_appointments, name='recent-appointments'),
]