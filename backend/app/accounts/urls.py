from django.urls import path
from .views import RegisterView


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated


# class SecretView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         return Response({"message": f"Bonjour {request.user.username} !"})


urlpatterns = [
    path('register', RegisterView.as_view(), name='auth_register'),
    # path('test', SecretView.as_view(), name="test"),
]
