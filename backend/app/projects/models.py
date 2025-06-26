from django.db import models


class Project(models.Model):
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    image = models.CharField(
        max_length=10, blank=True, help_text="Emoji ou icône du projet"
    )
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    tech = models.JSONField(
        default=list, blank=True,
        help_text="Liste des technologies utilisées"
    )
    github = models.URLField(blank=True)
    demo = models.URLField(blank=True)
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
    featured = models.BooleanField(
        default=False,
        help_text="Projet mis en avant"
    )

    def __str__(self):
        return self.title
