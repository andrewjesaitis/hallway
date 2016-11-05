# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-04 20:21
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0006_auto_20161103_1910'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invite',
            name='associated_user',
        ),
        migrations.RemoveField(
            model_name='invite',
            name='discussion_group',
        ),
        migrations.AddField(
            model_name='discussiongroup',
            name='code',
            field=models.CharField(default=1, max_length=8),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='discussiongroup',
            name='users',
            field=models.ManyToManyField(related_name='discussion_groups', related_query_name='discussion_group', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Invite',
        ),
    ]