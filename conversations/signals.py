from django.dispatch import receiver

from accounts.models import discussion_group_created
from .models import Conversation

@receiver(discussion_group_created)
def on_discussion_group_created(sender, **kwargs):
    convo = Conversation(subject=sender.name, discussion_group=sender)
    convo.save()
