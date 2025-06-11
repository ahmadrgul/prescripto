from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS

class IsParticipantOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return user == obj.patient.user or user == obj.doctor.user or getattr(user, 'role', None) == 'admin'
    
class AllowAdminPatientOnPost(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return request.user.role in ['admin', 'patient']
        
        return True
