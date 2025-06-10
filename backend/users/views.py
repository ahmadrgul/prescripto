from rest_framework import viewsets
from .models import DoctorProfile
from .permissions import IsAdminOrReadOnly
from .serializers import DoctorProfileSerializer

class DoctorViewset(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.select_related('user').all()
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ['user__first_name', 'user__last_name']
    ordering_fields = ['fee', 'experience']
    filterset_fields = ['specialization', 'education']
