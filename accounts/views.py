from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.messages import get_messages
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic.edit import UpdateView, FormView

from accounts.models import Profile
from accounts.forms import UserForm, ProfileForm, InviteForm, DiscussionGroupForm


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


class InviteView(FormView):
    template_name = 'invite.html'
    form_class = InviteForm
    discussion_group_form_class = DiscussionGroupForm
    success_url = '/invite-created/'

    def get_form_kwargs(self):
        kwargs = super(InviteView, self).get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs

    def get_context_data(self, **kwargs):
        context = super(InviteView, self).get_context_data(**kwargs)
        if 'form' not in context:
            context['form'] = self.form_class(self.request.GET)
        if 'discussion_group_form' not in context:
            context['discussion_group_form'] = self.discussion_group_form_class()
        return context

    def get(self, request, *args, **kwargs):
        super(InviteView, self).get(request, *args, **kwargs)
        form = self.form_class(request=request)
        discussion_group_form = self.discussion_group_form_class()
        return self.render_to_response(self.get_context_data(
            form=form, discussion_group_form=discussion_group_form))

    def post(self, request, *args, **kwargs):
        processing_dg = 'submit_discussion_group' in request.POST
        processing_invite = 'submit_invite' in request.POST

        if processing_dg:
            discussion_group_form = self.discussion_group_form_class(request.POST)
            if discussion_group_form.is_valid():
                discussion_group = discussion_group_form.save(commit=False)
                discussion_group.created_by = request.user
                discussion_group.save()
                messages.success(self.request, "Discussion Group Created")
                return self.render_to_response(
                    self.get_context_data(
                        form = self.form_class(request=request),
                        discussion_group_form = self.discussion_group_form_class()))
            else:
                return self.render_to_response(
                    self.get_context_data(
                        form = self.form_class(request=request),
                        discussion_group_form = discussion_group_form))

        if processing_invite:
            form = self.form_class(request.POST, request=request)
            if form.is_valid():
                hash_key = form.save()
                messages.success(self.request, "Invite created")
                messages.success(self.request, hash_key, extra_tags='hash_key')
                return redirect('invite-success')
            else:
                return self.render_to_response(
                    self.get_context_data(
                        form=form,
                        discussion_group_form=self.discussion_group_form_class()))


def invite_success(request):
    messages = get_messages(request)
    hash_key = None
    for msg in messages:
        if 'hash_key' in msg.tags:
            hash_key = msg.message
    return render(request, 'success.html', {'hash_key': hash_key})
