from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'slug', 'icon', 'title', 'description',
            'category', 'technologies', 'github_url',
            'demo_url', 'status'
        ]
