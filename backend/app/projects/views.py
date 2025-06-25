from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import CanPublishProject


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.exclude(status='draft').order_by('-id')
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, CanPublishProject]
    lookup_field = 'slug'
