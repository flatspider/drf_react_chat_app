from django.conf import settings

from django.db import models

from django.contrib.auth import get_user_model

# Create your models here.

# Each chat can only be in one channel.
# A channel can have many chats.
# How do you properly describe that within the Django framework?


class Chat(models.Model):
    text = models.CharField(max_length=255)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return self.text


class Channel(models.Model):
    users = models.ManyToManyField(
        get_user_model(), related_name='channels', blank=True, null=True)
    # conversation = will contain many different chats?
    # Many users can exist in a single channel. Therefore this should not be a ForeignKey model but instead a
    # ManyToManyField


class Author(models.Model):
    pass
