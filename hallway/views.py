from django.shortcuts import render, redirect

def home_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        dg = request.user.discussion_groups.first()
        if dg:
            return redirect('discussion-group-view', pk=dg.pk)
        else:
            return redirect('profile')
        
    return render(request, 'index.html')
