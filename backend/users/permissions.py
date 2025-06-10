from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.request import HttpRequest

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request: HttpRequest, view):
        if request.method in SAFE_METHODS:
            return True
        
        user = request.user
        return user.is_authenticated and getattr(user, 'role', None) == 'admin'
