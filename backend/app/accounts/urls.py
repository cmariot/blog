from django.urls import path
from .views import (
    RegisterView,
    CookieTokenObtainPairView,
    CookieTokenRefreshView,
    MeView,
    LogoutView
)

urlpatterns = [
    path('register', RegisterView.as_view(), name='auth_register'),
    path('token/', CookieTokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view(), name='me'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
