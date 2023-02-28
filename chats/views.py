from django.shortcuts import render

# Create your views here.

# Instead of filtering based on the react GET request, create additional views.

# At the end of api_v1/POST?access query params

# During your pass in the fetch request, pass in a filter to the query selector.


from rest_framework import generics

from .models import Chat, Channel

from .serializers import ChatSerializer, ChannelSerializer, UserSerializer

from django.shortcuts import get_object_or_404

from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated

# Default is setup to allow for GET requests.
# We need to add additional information in order to add a POST request.
# Change the generics.ListAPIView to generics.ListCreateAPIView
# This will add the POST ability.


# Where is the author being saved?
# This can be blank=true
# Go into the serializer and say that this is
# The perform create method needs to be over ridden. Self.request.user

class ChatListAPIView(generics.ListCreateAPIView):
    # Go to the Book table and get all of the objects.
    permission_classes = [IsAuthenticated]
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    # The rest framework needs a serializer.


class ChannelListAPIView(generics.ListCreateAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer

    # def perform_create(self, serializer):
    #   serializer.save(user=self.request.user)


class UserListAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
