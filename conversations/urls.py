"""
hallway URL Configuration
"""
from django.conf.urls import url
from .views import DiscussionGroupView

urlpatterns = [
    url(r'^(?P<pk>\d+)/$', DiscussionGroupView.as_view(), name='discussion-group-view'),
]
