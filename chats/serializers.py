from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Chat, Channel


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ('id', 'title',)
        # fields = '__all__' returns all fields


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class ChatSerializer(serializers.ModelSerializer):
    # channel = ChannelSerializer(read_only=True)
    channel_title = serializers.ReadOnlyField(source='channel.title')
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Chat
        fields = ('id', 'text', 'author', 'author_name',
                  'channel', 'channel_title')
        read_only_fields = ('author', 'channel')


# Can also use excludes.
# CustomTokenSerializer
# CustomRegisterSerializer?
