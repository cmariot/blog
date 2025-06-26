from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ("blog", "0002_article_author_article_duration_article_published_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="article",
            name="excerpt",
            field=models.TextField(blank=True, help_text="Résumé de l'article"),
        ),
        migrations.AddField(
            model_name="article",
            name="date",
            field=models.DateField(null=True, blank=True, help_text="Date de publication"),
        ),
        migrations.AddField(
            model_name="article",
            name="readTime",
            field=models.CharField(max_length=32, blank=True, help_text="Temps de lecture formaté, ex: '12 min'"),
        ),
        migrations.AddField(
            model_name="article",
            name="featured",
            field=models.BooleanField(default=False, help_text="Article mis en avant"),
        ),
    ]
