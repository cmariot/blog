from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from django.core.mail import send_mail
# from django.conf import settings
from rest_framework.permissions import AllowAny


class ContactView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        subject = request.data.get('subject')
        message = request.data.get('message')

        if not all([name, email, subject, message]):
            return Response(
                {'error': 'All fields are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        full_message = f"Message de: {name} <{email}>\n\n{subject}\n{message}"
        try:
            # send_mail(
            #     subject,
            #     full_message,
            #     settings.DEFAULT_FROM_EMAIL,
            #     [settings.CONTACT_EMAIL],
            #     fail_silently=False,
            # )
            print(full_message)
            return Response(
                {'success': 'Message sent successfully.'},
                status=status.HTTP_200_OK
                )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
