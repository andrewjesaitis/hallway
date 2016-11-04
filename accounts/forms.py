from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.forms import ModelForm

from crispy_forms.bootstrap import FieldWithButtons
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, Button, ButtonHolder, Submit, Div

from .models import Profile, DiscussionGroup, Invite

# If you don't do this you cannot use Bootstrap CSS
class LoginForm(AuthenticationForm):
    username = forms.CharField(label="Username", max_length=30, 
                               widget=forms.TextInput(attrs={'class': 'form-control', 'name': 'username'}))
    password = forms.CharField(label="Password", max_length=30, 
                               widget=forms.TextInput(attrs={'class': 'form-control', 'name': 'password', 'type':'password'}))


class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name',)

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()

class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        fields = ('twitter_url', 'google_plus_url', 'facebook_url',)

    def __init__(self, *args, **kwargs):
        super(ProfileForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()

class DiscussionGroupForm(ModelForm):
    class Meta:
        model = DiscussionGroup
        fields = ('name',)

    def __init__(self, *args, **kwargs):
        super(DiscussionGroupForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            None,
            Div('name', css_class='modal-body'),
            Div(ButtonHolder(
                    Button('cancel', 'Cancel', css_class='btn btn-default', data_dismiss='modal'),
                    Submit('submit_discussion_group', 'Create', css_class='btn btn-primary')
                ), css_class='modal-footer'))
                

class InviteForm(forms.Form):
    discussion_group = forms.ModelChoiceField(DiscussionGroup.objects.none())
    emails = forms.CharField(label="Emails (comma separated)", widget=forms.Textarea)

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(InviteForm, self).__init__(*args, **kwargs)
        self.fields['discussion_group'].queryset = DiscussionGroup.objects.filter(created_by=self.request.user)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Fieldset(
                None,
                FieldWithButtons('discussion_group',
                                 Button(
                                     'add_discussion_group', 
                                     '+', 
                                     data_toggle='modal',
                                     data_target='#discussionGroupModal')),
                'emails',
                ButtonHolder(
                    Submit('submit_invite', 'Create', css_class='button white')
                )
            )
        )
    
    def save(self, *args, **kwargs):
        emails = [email.strip() for email in self.cleaned_data['emails'].split(',')]
        dg = self.cleaned_data['discussion_group']
        blank_invite = Invite(discussion_group=dg)
        blank_invite.save()
        for email in emails:
            invite = Invite(email=email, discussion_group=dg)
            invite.save()
        return blank_invite.hash_key
