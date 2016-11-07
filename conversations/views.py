from django.shortcuts import render
from django.views.generic.base import TemplateView


from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]
    filter_fields = ('discussion_group',)
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend,)
    ordering_fields = ('last_updated',)
    ordering = ('-last_updated',)

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    filter_fields = ('conversation',)

class DiscussionGroupView(TemplateView):
    template_name = 'discussion_group.html'

    def get_context_data(self, **kwargs):
        context = super(DiscussionGroupView, self).get_context_data(**kwargs)
        context['pk'] = kwargs.pop('pk', None)
        return context
    
