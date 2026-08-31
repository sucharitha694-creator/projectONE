from django.urls import path
from . import views

urlpatterns = [
    path("companies/", views.get_companies),
     path("applications/", views.applications),
]
from django.urls import path
from . import views

urlpatterns = [
    path("companies/", views.get_companies),
    path("applications/", views.applications),
    path("register/", views.register_student),
]
from django.urls import path
from . import views

urlpatterns = [
    path("companies/", views.get_companies),
    path("applications/", views.applications),
    path("register/", views.register_student),
    path("login/", views.login_student),
]