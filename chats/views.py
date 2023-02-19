from django.shortcuts import render

# Create your views here.


# from django.shortcuts import render
# from django.views.generic import ListView
# from .models import Book
# Create your views here.
# class BookListView(ListView):
#  model = Book
# template_name = 'book_list.html'


from rest_framework import generics

from .models import Chat

from .serializers import ChatSerializer

from django.shortcuts import get_object_or_404

# Default is setup to allow for GET requests.
# We need to add additional information in order to add a POST request.
# Change the generics.ListAPIView to generics.ListCreateAPIView
# This will add the POST ability.


class ChatListAPIView(generics.ListCreateAPIView):
    # Go to the Book table and get all of the objects.
    queryset = Chat.objects.all()
    # The rest framework needs a serializer.
    serializer_class = ChatSerializer
