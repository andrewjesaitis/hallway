from rest_framework import serializers

from .models import Conversation, Message

class UnixEpochDateField(serializers.DateTimeField):
    def to_representation(self, value):
        """ Return epoch time for a datetime object or ``None``"""
        import datetime
        try:
            return int(value.timestamp() * 1000)
        except (AttributeError, TypeError):
            return None

    def to_internal_value(self, value):
        import datetime
        return datetime.datetime.fromtimestamp(int(value))

class MessageSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field='email',
        default=serializers.CurrentUserDefault()
    )
    conversation = serializers.PrimaryKeyRelatedField(
        queryset=Conversation.objects.all(), allow_null=True, required=False)
    date_created = UnixEpochDateField(read_only=True)
    class Meta:
        model = Message
        fields = ('pk', 'user', 'date_created', 'url', 'conversation')


class ConversationSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    messages = MessageSerializer(many=True, read_only=True)
    date_created = UnixEpochDateField(read_only=True)
    last_updated = UnixEpochDateField(read_only=True)
    class Meta:
        model = Conversation
        fields = ('pk', 'date_created', 'last_updated', 'subject', 'messages')
