from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import stripe.error
from appointments.models import Appointment
from django.conf import settings
import stripe
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

stripe.api_key = settings.STRIPE_SECRET_KEY
endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

class CreateCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            appt_id = request.data.get("appointment_id")
            appointment = Appointment.objects.select_related("doctor").select_related("patient").get(id=appt_id)
            
            if appointment.patient.user != request.user:
                return Response({"message": "Unauthorized"}, status=403)

            if appointment.paid:
                return Response({"message": "Already Paid"}, status=400)
            
            doctor = appointment.doctor
            patient = appointment.patient

            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                mode="payment",
                line_items=[{
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            'name': f"{patient.user.first_name} Appointment with Dr. {doctor.user.first_name}",
                        },
                        "unit_amount": int(doctor.fee * 100),
                    },
                    "quantity": 1,
                }],
                metadata={
                    "appointment_id": str(appointment.id)
                },
                success_url=f"{settings.FRONTEND_URL}/appointments",
                cancel_url=f"{settings.FRONTEND_URL}/appointments",
            )
            return Response({"id": session.id})

        except Appointment.DoesNotExist:
            return Response({"message": "Appointment not found"}, status=400)
        
        except Exception as e:
            return Response({'error': str(e)}, status=500)

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except stripe.error.SingatureVerificationError:
        return HttpResponse(status=400)
    except Exception:
        return HttpResponse(status=400)

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        appt_id = session.get("metadata", {}).get("appointment_id")

        if appt_id:
            try:
                appt = Appointment.objects.get(id=appt_id)
                appt.paid = True
                appt.state = "scheduled"
                appt.save()
            except Appointment.DoesNotExist:
                pass
    
    return HttpResponse(status=200)
