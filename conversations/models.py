from django.db import models
from django.contrib.auth.models import User


class Conversation(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    subject = models.CharField(max_length=120)    

    def __unicode__(self):
        return "{}".format(self.subject)

class Message(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='messages')
    date_created = models.DateTimeField(auto_now_add=True)
    url =  models.URLField()
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name='messages')

    def __unicode__(self):
        return "{}'s message in {}".format(self.user.username, self.conversation.subject)

    def save(self, *args, **kwargs):
        super(Message, self).save(*args, **kwargs)
        self.conversation.save()
