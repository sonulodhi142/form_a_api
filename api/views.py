from django.shortcuts import render
from rest_framework.views import APIView
from .models import post
from .serializers import postSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class api_views(APIView):
    def get(self, request, pk=None):
        post_queryset = post.objects.all()
        serializer = postSerializer(post_queryset, many=True)
        return Response(serializer.data ,status= status.HTTP_200_OK)
    
    