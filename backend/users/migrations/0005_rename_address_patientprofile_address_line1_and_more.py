# Generated by Django 5.2.2 on 2025-07-01 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0004_alter_patientprofile_address_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="patientprofile",
            old_name="address",
            new_name="address_line1",
        ),
        migrations.AddField(
            model_name="patientprofile",
            name="address_line2",
            field=models.TextField(null=True),
        ),
    ]
