from rest_framework import serializers

from .models import Conversation, Message

class ConversationSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    messages = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Message
        fields = ('pk', 'date_created', 'subject', 'messages')

class MessageSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    conversation = serializers.PrimaryKeyRelatedField(
        queryset=Conversation.objects.all(), allow_null=True, required=False)
    class Meta:
        model = Message
        fields = ('pk', 'user', 'date_created', 'subject', 'url', 'conversation')
