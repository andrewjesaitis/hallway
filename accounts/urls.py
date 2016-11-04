from django.conf.urls import include, url
from django.contrib.auth.decorators import login_required

from .views import UpdateProfileView, InviteView, invite_success


urlpatterns = [
    url(r'^', include('allauth.urls')),
    url(r'^profile/$', login_required(UpdateProfileView.as_view()), name='profile'),
    url(r'^invite/$', login_required(InviteView.as_view()), name='invite'),
    url(r'^invite/success/$', invite_success, name='invite-success'),
]
