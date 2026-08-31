from django.http import JsonResponse
from .models import Company, Application, Student

from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json


def get_companies(request):

    companies = Company.objects.all()

    company_list = []

    for company in companies:

        company_list.append({
            "id": company.id,
            "name": company.name,
            "role": company.role,
            "package": company.package,
            "minimum_cgpa": company.minimum_cgpa
        })

    return JsonResponse(company_list, safe=False)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def applications(request):

    if request.method == "POST":

        data = json.loads(request.body)

        company_id = data.get("company_id")

        company = Company.objects.get(id=company_id)

        application = Application.objects.create(
            company=company
        )

        return JsonResponse({
            "message": "Application submitted successfully!",
            "id": application.id
        })

    applications_list = Application.objects.all()

    data = []

    for application in applications_list:

        data.append({
            "id": application.id,
            "company": application.company.name,
            "role": application.company.role,
            "package": application.company.package,
            "status": application.status,
        })

    return JsonResponse(data, safe=False)
@csrf_exempt
@require_http_methods(["POST"])
def register_student(request):

    try:

        data = json.loads(request.body)

        student = Student.objects.create(
            name=data.get("name"),
            email=data.get("email"),
            register_number=data.get("registerNumber"),
            password=data.get("password")
        )

        return JsonResponse({
            "message": "Registration Successful!",
            "student_id": student.id
        })

    except Exception as error:

        return JsonResponse({
            "error": str(error)
        }, status=400)
@csrf_exempt
@require_http_methods(["POST"])
def login_student(request):

    try:

        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        student = Student.objects.get(
            email=email,
            password=password
        )

        return JsonResponse({
            "message": "Login Successful!",
            "name": student.name,
            "email": student.email,
            "registerNumber": student.register_number
        })

    except Student.DoesNotExist:

        return JsonResponse({
            "error": "Invalid email or password!"
        }, status=401)