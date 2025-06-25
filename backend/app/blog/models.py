from django.db import models
from django.utils.text import slugify


class Article(models.Model):

    slug = models.SlugField(max_length=255, unique=True, blank=True)

    title = models.CharField(max_length=255, unique=True)
    content = models.TextField(
        blank=True,
        help_text="Contenu en markdown"
    )
    tags = models.CharField(
        max_length=255,
        blank=True,
        help_text="Liste de tags séparés par des virgules"
    )
    duration = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Durée de lecture en minutes"
    )
    author = models.ForeignKey(
        'accounts.User',
        on_delete=models.CASCADE,
        default=None,
        null=True,
        related_name='articles',
        help_text="Auteur de l'article"
    )
    published = models.BooleanField(
        default=False,
        help_text="L'article est-il publié ? (sinon, il est en brouillon)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
