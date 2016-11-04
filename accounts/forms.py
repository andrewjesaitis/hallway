from django.contrib import messages
from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.forms import ModelForm

from crispy_forms.bootstrap import FieldWithButtons
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, Button, ButtonHolder, Submit, Div

from .models import Profile, DiscussionGroup

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

class DiscussionGroupForm(forms.Form):
    name = forms.CharField(label="Name")

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(DiscussionGroupForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            None,
            Div('name', css_class='modal-body'),
            Div(ButtonHolder(
                    Button('cancel', 'Cancel', css_class='btn btn-default', data_dismiss='modal'),
                    Submit('submit_discussion_group', 'Create', css_class='btn btn-primary')
                ), css_class='modal-footer'))

    def save(self, *args, **kwargs):
        dg = DiscussionGroup(
            name=self.cleaned_data['name'],
            created_by=self.request.user)
        dg.save()
        dg.users.add(self.request.user)
        return dg.name
                
class CodeForm(forms.Form):
    code = forms.CharField(label="Invite Code", max_length=8)

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(CodeForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            None,
            Div('code', css_class='modal-body'),
            Div(ButtonHolder(
                    Button('cancel', 'Cancel', css_class='btn btn-default', data_dismiss='modal'),
                    Submit('submit_code', 'Submit', css_class='btn btn-primary')
                ), css_class='modal-footer'))

    def process_code(self, *args, **kwargs):
        try:
            group = DiscussionGroup.objects.get(code=self.cleaned_data['code'])
            group.users.add(self.request.user)
            messages.success(self.request, "Added to {}".format(group.name))
        except DiscussionGroup.DoesNotExist:
            messages.error(self.request, "No group with that code exists")
