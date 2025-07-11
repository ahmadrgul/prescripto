# Generated by Django 5.2.2 on 2025-06-30 06:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("appointments", "0003_appointment_unique_date_patient_doctor"),
        ("users", "0004_alter_patientprofile_address_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="appointment",
            name="patient",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="users.patientprofile",
            ),
        ),
    ]
