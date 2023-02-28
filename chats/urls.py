from django.urls import path

from . import views

# Do I need to create another view for the channels list? What would that return?

urlpatterns = [

    path('<int:pk>/', views.ChatDetailAPIView.as_view()),
    path('delete/<int:pk>/', views.ChatDeleteAPIView.as_view()),
    path('channels/', views.ChannelListAPIView.as_view()),
    path('users/', views.UserListAPIView.as_view()),
    path('', views.ChatListAPIView.as_view()),
]
