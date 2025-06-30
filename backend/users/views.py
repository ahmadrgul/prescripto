from rest_framework import generics, status, viewsets
from rest_framework.exceptions import NotAuthenticated
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from .models import DoctorProfile, PatientProfile
from .permissions import IsAdminOrOwner, IsAdminOrReadOnly
from .serializers import (DoctorProfileSerializer, PatientProfileSerializer,
                          SpecializationSerializer)


class DoctorViewset(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.select_related("user").all()
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]
    search_fields = ["user__first_name", "user__last_name"]
    ordering_fields = ["fee", "experience"]
    filterset_fields = ["speciality", "education"]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = instance.user
        instance.delete()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PatientViewset(viewsets.ModelViewSet):
    queryset = PatientProfile.objects.select_related("user").all()
    serializer_class = PatientProfileSerializer
    parser_classes = [MultiPartParser, FormParser]
    search_fields = ["user__first_name", "user__last_name"]
    ordering_fields = ["birthday", "gender"]

    def get_permissions(self):
        if self.request.method == "POST":
            return []
        else:
            return [IsAdminOrOwner()]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            raise NotAuthenticated("Authentication credentials were not provided.")

        if user.role == "admin":
            return super().get_queryset()
        elif user.role == "patient":
            return super().get_queryset().filter(user=user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = instance.user
        instance.delete()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SpecializationListAPIView(generics.ListAPIView):
    queryset = DoctorProfile.objects.values("speciality").distinct()
    serializer_class = SpecializationSerializer


class TopDoctorsAPIView(generics.ListAPIView):
    queryset = DoctorProfile.objects.select_related("user").order_by("?")[:4]
    serializer_class = DoctorProfileSerializer
