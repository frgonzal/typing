from django.urls import path
from .views import WordsAPI

app_name = 'words'
urlpatterns = [
    path('api/<int:nWords>/', WordsAPI.as_view(), name='get-words-api'),
]