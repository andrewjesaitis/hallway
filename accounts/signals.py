from django.dispatch import receiver
from allauth.socialaccount.signals import social_account_added
from allauth.account.signals import user_signed_up

from .models import Profile

@receiver(user_signed_up)
def on_social_account_added(sender, **kwargs):
    user = kwargs.get('user')
    if not user:
        return
    profile, created = Profile.objects.get_or_create(user=user) 

    sl = kwargs.get('sociallogin')
    if not sl: 
        return

    provider = sl.account.get_provider()
    if provider.name == 'Google':
        profile.google_plus_url = sl.account.get_profile_url()

    profile.save()

