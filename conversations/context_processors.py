from conversations.models import Conversation

def add_conversations(request):
        if request.user.is_authenticated():
            groups = request.user.discussion_groups.all()
            conversations = Conversation.objects.filter(discussion_group__in=groups)
            return {'conversations': conversations}
        return None
