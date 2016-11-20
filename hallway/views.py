from django.shortcuts import render, redirect

def home_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        dg = request.user.discussion_groups.first()
        return redirect('discussion-group-view', pk=dg.pk)
        
    return render(request, 'index.html')
