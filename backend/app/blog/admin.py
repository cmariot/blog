from django.contrib import admin
from .models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'date', 'featured', 'published', 'views')
    list_filter = ('featured', 'published', 'date', 'tags')
    search_fields = ('title', 'slug', 'excerpt', 'content', 'tags')
    readonly_fields = ('views',)
    prepopulated_fields = {"slug": ("title",)}
    ordering = ('-date', '-created_at')
