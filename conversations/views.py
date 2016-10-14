from django.shortcuts import render

from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

class ConversationViewSet(mixins.RetrieveModelMixin, 
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          mixins.ListModelMixin,
                          viewsets.GenericViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    filter_fields = ('subject',)
    permission_classes = [AllowAny]

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [AllowAny]
