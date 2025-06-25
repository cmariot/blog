from django.db import models


class Project(models.Model):
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    icon = models.CharField(
        max_length=10, blank=True, help_text="Emoji ou icône du projet"
    )
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    technologies = models.JSONField(
        default=list, blank=True,
        help_text="Liste des technologies utilisées"
    )
    github_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    STATUS_CHOICES = [
        ("draft", "Brouillon"),
        ("idea", "Idée"),
        ("in_progress", "En cours"),
        ("completed", "Terminé"),
        ("archived", "Archivé"),
    ]
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="draft"
    )

    def __str__(self):
        return self.title
