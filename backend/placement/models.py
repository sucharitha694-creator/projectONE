from django.db import models


class Company(models.Model):

    name = models.CharField(max_length=100)

    role = models.CharField(max_length=100)

    package = models.CharField(max_length=50)

    minimum_cgpa = models.FloatField()

    def __str__(self):
        return self.name


class Application(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    status = models.CharField(
        max_length=50,
        default="Applied"
    )

    applied_date = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.company.name} - {self.status}"


class Student(models.Model):

    name = models.CharField(
        max_length=100
    )

    email = models.EmailField(
        unique=True
    )

    register_number = models.CharField(
        max_length=50,
        unique=True
    )

    password = models.CharField(
        max_length=100
    )

    def __str__(self):
        return self.name