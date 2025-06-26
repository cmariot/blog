from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'slug', 'image', 'title', 'description',
            'category', 'tech', 'github', 'demo', 'status', 'featured'
        ]
