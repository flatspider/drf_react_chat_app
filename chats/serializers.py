from rest_framework import serializers

from .models import Chat, Channel


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        # fields = '__all__' # '__all__'This returns all of the fields. Not very secure.
        # This is a TOOPLE. tuple. Not mutable.
        fields = ('text', 'author', 'channel',)
        # There is also an excludes. Set excludes = and pass through the field you do NOT want display.


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ('id', 'title',)
        # fields = '__all__' returns all fields
