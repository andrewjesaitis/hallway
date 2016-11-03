import hashlib

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import EmailValidator

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    twitter_url = models.URLField(null=True, blank=True)
    google_plus_url = models.URLField(null=True, blank=True)
    facebook_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return "{}'s Profile".format(self.user.username)

class DiscussionGroup(models.Model):
    name = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.name)

class Invite(models.Model):
    email = models.EmailField(validators=[EmailValidator], null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    associated_user = models.ForeignKey(User, 
                                        null=True, related_name='invites')
    discussion_group = models.ForeignKey(DiscussionGroup, 
                                         null=False, related_name='discussion_groups')
    hash_key = models.CharField(max_length=32, null=False, blank=False)
    
    def __str__(self):
        return "{}".format(self.email)

    def save(self, *args, **kwargs):
        self.hash_key = hashlib.md5("{} {}".format(self.date_created, 
                                               self.discussion_group.name)).hexdigest()
        super(Invite, self).save(*args, **kwargs)
