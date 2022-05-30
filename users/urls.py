from django.urls import re_path

from . import views

urlpatterns = [
    re_path(
        r'^register/$',
        view=views.RegisterView.as_view(),
        name='register'
    ),

    re_path(
        r'^login/$',
        view=views.LoginView.as_view(),
        name='login'
    ),
    re_path(
        r'^logout/$',
        view=views.LogoutView.as_view(),
        name='logout'
    ),

    re_path(
        r'^members/$',
        view=views.MembersView.as_view(),
        name='members'
    ),
]
