from rest_framework.permissions import SAFE_METHODS, BasePermission
from rest_framework.request import HttpRequest


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        return user.is_authenticated and getattr(user, "role", None) == "admin"


class IsAdminOrOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated and (
            getattr(request.user, "role") == "admin" or obj.user == request.user
        )
