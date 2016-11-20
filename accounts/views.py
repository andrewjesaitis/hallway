from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.messages import get_messages
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic.edit import UpdateView, FormView

from accounts.models import Profile, DiscussionGroup
from accounts.forms import UserForm, ProfileForm, CodeForm, DiscussionGroupForm


class UpdateProfileView(UpdateView):
    model = User
    form_class = UserForm
    profile_form_class = ProfileForm
    code_form_class = CodeForm
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
        if 'code_form' not in context:
            context['code_form'] = self.code_form_class(self.request.GET, request=self.request)
        context['discussion_groups'] = self.request.user.discussion_groups.all()
        return context

    def get(self, request, *args, **kwargs):
        super(UpdateProfileView, self).get(request, *args, **kwargs)
        form = self.form_class(instance=request.user)
        current_profile, created = Profile.objects.get_or_create(user=request.user)
        profile_form = self.profile_form_class(instance=current_profile)
        code_form = self.code_form_class(request=self.request)
        return self.render_to_response(self.get_context_data(
            object=self.object, form=form, profile_form=profile_form, code_form=code_form))

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = self.form_class(instance=request.user)
        current_profile, created = Profile.objects.get_or_create(user=request.user)
        profile_form = self.profile_form_class(instance=current_profile)
        code_form = self.code_form_class(request.POST, request=self.request)

        # first check if we are submitting a code
        if 'submit_code' in request.POST:
            if code_form.is_valid():
                code_form.process_code(user=request.user)
            else:
                messages.error(self.request, "Group code was invalid")
            code_form = self.code_form_class(request=self.request)
            return self.render_to_response(
              self.get_context_data(object=object,
                  form=form, profile_form=profile_form, code_form=code_form
              ))

        # nope, submit was at the profile level
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
              self.get_context_data(object=object,
                  form=form, profile_form=profile_form, code_form=code_form
              ))

    def get_success_url(self):
        return reverse('profile')


class GroupView(FormView):
    template_name = 'group.html'
    form_class =  DiscussionGroupForm

    def get_form_kwargs(self):
        kwargs = super(GroupView, self).get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs

    def get_context_data(self, *args, **kwargs):
        context = super(GroupView, self).get_context_data(**kwargs)
        if 'user' in context:
            User = context['user']
            context['groups'] = User.discussion_groups.all()
        if 'form' not in context:
            context['form'] = self.form_class(request=self.request)
        return context

    def get(self, *args, **kwargs):
        super(GroupView, self).get(*args, **kwargs)
        form = self.form_class(request=self.request)
        return self.render_to_response(self.get_context_data(
            user=self.request.user, form=form))

    def post(self, *args, **kwargs):
        form = self.form_class(self.request.POST, request=self.request)
        if form.is_valid():
            group_name = form.save()
            messages.success(self.request, "{} created".format(group_name))
        else:
            messages.error(self.request, "Could not create group")
        return self.render_to_response(
            self.get_context_data(user=self.request.user, form=form))

def delete_group(request, pk):
    try:
        group = DiscussionGroup.objects.get(id=pk, created_by=request.user)
        group.delete()
        messages.success(request, "{} deleted".format(group.name))
    except:
        messages.error(request, "Could not delete group")
    return redirect('groups')
    
