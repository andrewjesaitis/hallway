from django.shortcuts import render
from django.views.generic.base import TemplateView


from rest_framework import viewsets, filters, permissions
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

class MessagesPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            return request.user == obj.user
        return True

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.filter(messages__isnull=False).distinct()
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]
    filter_fields = ('discussion_group',)
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend,)
    ordering_fields = ('last_updated',)
    ordering = ('-last_updated',)

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated, MessagesPermissions]
    filter_fields = ('conversation',)

    def get_serializer_context(self):
        context = super(MessageViewSet, self).get_serializer_context()
        context['request'] = self.request
        return context

class DiscussionGroupView(TemplateView):
    template_name = 'discussion_group.html'

    def get_context_data(self, **kwargs):
        context = super(DiscussionGroupView, self).get_context_data(**kwargs)
        context['pk'] = kwargs.pop('pk', None)
        return context
    
