from rest_framework import serializers

from .models import Conversation, Message
from accounts.models import DiscussionGroup

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

    can_delete = serializers.SerializerMethodField('_created_by_current_user')

    class Meta:
        model = Message
        fields = ('pk', 'user', 'date_created', 'url', 'conversation', 'can_delete')

    def _created_by_current_user(self, obj):
        print(self.context)
        return self.context['request'].user == obj.user

class ConversationSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    messages = MessageSerializer(many=True, read_only=True)
    date_created = UnixEpochDateField(read_only=True)
    last_updated = UnixEpochDateField(read_only=True)
    discussion_group = serializers.PrimaryKeyRelatedField(
        queryset=DiscussionGroup.objects.all(), allow_null=False, required=True)
    class Meta:
        model = Conversation
        fields = ('pk', 'date_created', 'discussion_group', 'last_updated', 'subject', 'messages')
