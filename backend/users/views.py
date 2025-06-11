from rest_framework import viewsets
from .models import DoctorProfile, PatientProfile
from .permissions import IsAdminOrReadOnly, IsAdminOrOwner
from .serializers import DoctorProfileSerializer, PatientProfileSerializer
from rest_framework.exceptions import NotAuthenticated
from rest_framework.response import Response
from rest_framework import status

class DoctorViewset(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.select_related('user').all()
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ['user__first_name', 'user__last_name']
    ordering_fields = ['fee', 'experience']
    filterset_fields = ['specialization', 'education']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = instance.user
        instance.delete()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PatientViewset(viewsets.ModelViewSet):
    queryset = PatientProfile.objects.select_related('user').all()
    serializer_class = PatientProfileSerializer
    permission_classes = [IsAdminOrOwner]
    search_fields = ['user__first_name', 'user__last_name']
    ordering_fields = ['birthday', 'gender']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            raise NotAuthenticated("Authentication credentials were not provided.")

        if user.role == 'admin':
            return super().get_queryset()
        elif user.role == 'patient':
            return super().get_queryset().filter(user=user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = instance.user
        instance.delete()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
