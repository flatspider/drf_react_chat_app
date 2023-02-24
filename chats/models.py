from django.conf import settings

from django.db import models


from django.contrib.auth import get_user_model

# Create your models here.

# Each chat can only be in one channel.
# A channel can have many chats.
# How do you properly describe that within the Django framework?


class Channel(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    # users = models.ManyToManyField(get_user_model()) = will contain many different chats?
    # Many users can exist in a single channel. Therefore this should not be a ForeignKey model but instead a
    # ManyToManyField

    def __str__(self):
        return self.title


class Chat(models.Model):
    text = models.TextField()
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.text
