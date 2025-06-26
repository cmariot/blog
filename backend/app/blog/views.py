from rest_framework import viewsets
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.permissions import AllowAny


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Article.objects \
        .filter(published=True) \
        .order_by('-date', '-created_at')

    serializer_class = ArticleSerializer

    permission_classes = [AllowAny]

    lookup_field = 'slug'  # pour utiliser /articles/<slug>/
