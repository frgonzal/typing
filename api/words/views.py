from django.http import HttpRequest
from django.views import View
from django.http import JsonResponse
from .models import EnglishWord

class WordsAPI(View):
    """API for random words"""

    def get(self, request: HttpRequest, nWords = 1):
        """Get random word"""
        words_obj = EnglishWord.objects.order_by('?')[:nWords]
        words = [word.word for word in words_obj]
        return JsonResponse(words, safe=False)


