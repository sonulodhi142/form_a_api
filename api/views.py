from django.shortcuts import render
from rest_framework.views import APIView
from .models import post
from .serializers import postSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class api_views(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                post_instance = post.objects.get(pk=pk)
            except:
                return Response({'error': "data is not found"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer = postSerializer(post_instance)
                return Response(serializer.data ,status= status.HTTP_200_OK)
        
        post_queryset = post.objects.all()
        serializer = postSerializer(post_queryset, many=True)
        return Response(serializer.data ,status= status.HTTP_200_OK)
    
    def post(self, request):
        serializer = postSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data ,status= status.HTTP_201_CREATED)
        return Response({'error': "request is not accecpted"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            post_instance = post.objects.get(pk=pk)
        except:
            return Response({'error': "data is not found"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = postSerializer(post_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data ,status= status.HTTP_202_ACCEPTED)
        return Response({'error': "request is not accecpted"}, status=status.HTTP_400_BAD_REQUEST)