from rest_framework import serializers
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(
        source='author.username',
        read_only=True
    )

    class Meta:
        model = Article
        fields = [
            'id',
            'slug',
            'title',
            'content',
            'tags',
            'duration',
            'author_username',
            'published',
            'created_at',
            'updated_at',
            'views'
        ]
