from rest_framework import serializers
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            'title',
            'slug',
            'excerpt',
            'content',
            'date',
            'readTime',
            'tags',
            'views',
            'featured',
        ]
        read_only_fields = fields

    def get_tags(self, obj):
        # Retourne une liste de tags (split sur ',')
        return [t.strip() for t in obj.tags.split(',') if t.strip()]
