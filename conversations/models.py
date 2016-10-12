from django.db import models
from django.contrib.auth.models import User


class Conversation(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    subject = models.CharField(max_length=120)

    def __unicode__(self):
        return "{}".format(self.subject)

class Message(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='messages')
    date_created = models.DateTimeField(auto_now_add=True)
    subject = models.CharField(max_length=120)
    url =  models.URLField()
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name='messages')

    def save(self, *args, **kwargs):
        if not self.pk and not self.conversation_id:
            conversation = Conversation(subject=self.subject)
            conversation.save()
            self.conversation = conversation
        super(Message, self).save(*args, **kwargs)

    def __unicode__(self):
        return "{}: {}".format(self.user.username, self.subject)
