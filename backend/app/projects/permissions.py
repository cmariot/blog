from rest_framework import permissions


class CanPublishProject(permissions.BasePermission):
    """
    Autorise uniquement les utilisateurs admin à publier des projets.
    """

    def has_permission(self, request, view):
        if request.method in ['POST', 'PUT', 'PATCH']:
            if 'published' in request.data:
                return request.user.is_authenticated and request.user.is_admin
        return True
