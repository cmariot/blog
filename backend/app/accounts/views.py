from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework import status


# Create a new user
class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = RegisterSerializer


#
class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            access = response.data['access']
            refresh = response.data['refresh']
            # Place les tokens dans des cookies HTTPOnly
            response.set_cookie(
                key='access',
                value=access,
                httponly=True,
                secure=True,
                samesite='None'
            )
            response.set_cookie(
                key='refresh',
                value=refresh,
                httponly=True,
                secure=True,
                samesite='None'
            )
            # Optionnel : ne pas renvoyer les tokens dans le body
            del response.data['access']
            del response.data['refresh']
        return response


class CookieTokenRefreshView(APIView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if not refresh_token:
            return Response({'detail': 'Refresh token missing.'}, status=401)
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
        except TokenError:
            return Response({'detail': 'Invalid refresh token.'}, status=401)
        response = Response({'detail': 'Token refreshed.'})
        response.set_cookie(
            key='access',
            value=access_token,
            httponly=True,
            secure=True,
            samesite='None'
        )
        return response


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return JsonResponse({
            'id': user.id,
            'username': user.username,
            'email': user.email,
        })


class LogoutView(APIView):
    def post(self, request):
        response = Response({'detail': 'Logged out.'})
        response.delete_cookie('access', samesite='None')
        response.delete_cookie('refresh', samesite='None')
        return response
