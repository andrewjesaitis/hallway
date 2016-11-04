from django.conf.urls import include, url
from django.contrib.auth.decorators import login_required

from .views import UpdateProfileView, GroupView, delete_group

urlpatterns = [
    url(r'^', include('allauth.urls')),
    url(r'^profile/$', login_required(UpdateProfileView.as_view()), name='profile'),
    url(r'^groups/$', login_required(GroupView.as_view()), name='groups'),
    url(r'^groups/(?P<pk>\d+)/delete/', delete_group, name='delete-group'),
]
