from django.conf import settings

from django.db import models

# Create your models here.


class Chat(models.Model):
    text = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    # channel = models.ImageField(upload_to="books", null=True)

    def __str__(self):
        return self.text


class Channel(models.Model):
    users = models.ForeignKey(Chat.author)
    # conversation = will contain many different chats?
