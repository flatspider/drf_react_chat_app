from django.conf import settings

from django.db import models


# Create your models here.

class Channel(models.Model):
    title = models.CharField(max_length=255, db_index=True)

    def __str__(self):
        return self.title


class Chat(models.Model):
    text = models.TextField()
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.text
