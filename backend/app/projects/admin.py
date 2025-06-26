from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "status", "featured")
    search_fields = ("title", "category", "status")
    list_filter = ("category", "status", "featured")
    prepopulated_fields = {"slug": ("title",)}
    # Ajoute tous les champs dans le formulaire d'ajout/édition
    fieldsets = (
        (None, {
            'fields': (
                'title', 'slug', 'image', 'description', 'category',
                'tech', 'github', 'demo', 'status', 'featured'
            )
        }),
    )
