import random
import string


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
    created_by = models.ForeignKey(User, 
                                   null=False, 
                                   related_name='created_by')
    code = models.CharField(max_length=8, null=False, blank=False)
    users = models.ManyToManyField(
        User,
        related_name="discussion_groups", 
        related_query_name="discussion_group")
    
    def __str__(self):
        return "{}".format(self.name)

    def save(self, *args, **kwargs):
        self.code = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(8))
        super(DiscussionGroup, self).save(*args, **kwargs)
