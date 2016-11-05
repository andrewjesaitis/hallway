# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-04 22:24
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_auto_20161104_2021'),
        ('conversations', '0004_conversation_last_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='conversation',
            name='discussion_group',
            field=models.OneToOneField(default=0, on_delete=django.db.models.deletion.CASCADE, to='accounts.DiscussionGroup'),
            preserve_default=False,
        ),
    ]