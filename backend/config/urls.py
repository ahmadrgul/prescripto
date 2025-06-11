from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('appointments.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='api_token_auth'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='api_token_refresh'),
]