from django.urls import path

from . import views


urlpatterns = [

    path('', views.ChatListAPIView.as_view()),
]
