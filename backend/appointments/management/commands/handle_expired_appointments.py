from appointments.models import Appointment
from django.utils import timezone
from datetime import timedelta
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Cancel unpaid (pending) amounts after 10 minutes"

    def handle(self, *args, **kwargs):
        expired = Appointment.objects.filter(
            state="pending", 
            reserved_at__lt=timezone.now() - timedelta(minutes=10)
        )
        count = expired.update(state="cancelled")
        self.stdout.write(self.style.SUCCESS(f"{count} expired appointments cancelled."))
