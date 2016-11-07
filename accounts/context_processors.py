def user_discussion_groups(request):
    if request.user.is_authenticated():
        groups = request.user.discussion_groups.all()
        return {'discussion_groups': groups}
    return dict()
