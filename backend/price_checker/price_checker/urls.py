from django.contrib import admin
from django.urls import path, re_path

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', views.search),
    re_path(r'', views.catchall),
]
