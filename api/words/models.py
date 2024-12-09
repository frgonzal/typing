from django.db import models


class EnglishWord(models.Model):
    """Model for English words"""
    word = models.CharField(max_length=45)

    def __str__(self):
        return self.word
