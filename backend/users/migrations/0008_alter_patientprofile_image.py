# Generated by Django 5.2.2 on 2025-07-09 06:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0007_alter_doctorprofile_image_alter_patientprofile_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="patientprofile",
            name="image",
            field=models.ImageField(
                default="https://res.cloudinary.com/dsccsqdk2/image/upload/v1751626552/profile_icon_dggge8.png",
                max_length=500,
                null=True,
                upload_to="patient_images",
            ),
        ),
    ]
