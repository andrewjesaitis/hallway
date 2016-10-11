from django.shortcuts import render
from django.views.generic.edit import UpdateView
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse

from accounts.models import Profile
from accounts.forms import UserForm, ProfileForm


class UpdateProfileView(UpdateView):
    model = User
    form_class = UserForm
    profile_form_class = ProfileForm
    template_name = 'profile.html'

    def get_object(self):
        """
        Returns the request's user.
        """
        return self.request.user

    def get_context_data(self, **kwargs):
        context = super(UpdateProfileView, self).get_context_data(**kwargs)
        if 'form' not in context:
            context['form'] = self.form_class(self.request.GET, instance=self.request.user)
        if 'profile_form' not in context:
            current_profile, created = Profile.objects.get_or_create(user=self.request.user)
            context['profile_form'] = self.profile_form_class(self.request.GET, instance=current_profile)
        return context

    def get(self, request, *args, **kwargs):
        super(UpdateProfileView, self).get(request, *args, **kwargs)
        form = self.form_class(instance=request.user)
        current_profile, created = Profile.objects.get_or_create(user=request.user)
        profile_form = self.profile_form_class(instance=current_profile)
        return self.render_to_response(self.get_context_data(
            object=self.object, form=form, profile_form=profile_form))

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = self.form_class(request.POST, instance=request.user)
        current_profile, created = Profile.objects.get_or_create(user=request.user)
        profile_form = self.profile_form_class(request.POST, instance=current_profile)

        if form.is_valid() and profile_form.is_valid():
            userdata = form.save(commit=False)
            # used to set the password, but no longer necesarry
            userdata.save()
            profiledata = profile_form.save(commit=False)
            profiledata.user = userdata
            profiledata.save()
            messages.success(self.request, 'User Profile saved successfully')
            return HttpResponseRedirect(self.get_success_url())
        else:
            return self.render_to_response(
              self.get_context_data(form=form, profile_form=profile_form))

    def get_success_url(self):
        return reverse('profile')
