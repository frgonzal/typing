from django.http import HttpRequest
from django.views import View
from django.http import JsonResponse
# from django.shortcuts import render


class WordsAPI(View):
    """API for random words"""

    def get(self, request: HttpRequest, nWords = 1):
        """Get random word"""
        data = [
            "apple",
            "banana",
        ]
        return JsonResponse(data, safe=False)


