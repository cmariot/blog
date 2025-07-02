from rest_framework import viewsets
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db import models


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Article.objects \
        .filter(published=True) \
        .order_by('-date', '-created_at')

    serializer_class = ArticleSerializer

    permission_classes = [AllowAny]

    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        no_count = request.query_params.get('no_count')
        if not (no_count == '1' or no_count == 'true' or no_count == 'True'):
            instance.views = models.F('views') + 1
            instance.save(update_fields=["views"])
            instance.refresh_from_db(fields=["views"])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        limit = request.query_params.get('limit')
        queryset = self.filter_queryset(self.get_queryset())
        if limit is not None:
            try:
                limit = int(limit)
                queryset = queryset[:limit]
            except ValueError:
                pass
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
