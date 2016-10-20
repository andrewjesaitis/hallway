from rest_framework import serializers

from .models import Conversation, Message

class MessageSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )
    conversation = serializers.PrimaryKeyRelatedField(
        queryset=Conversation.objects.all(), allow_null=True, required=False)
    class Meta:
        model = Message
        fields = ('pk', 'user', 'date_created', 'url', 'conversation')


class ConversationSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    messages = MessageSerializer(many=True, read_only=True)
    class Meta:
        model = Conversation
        fields = ('pk', 'date_created', 'subject', 'messages')
