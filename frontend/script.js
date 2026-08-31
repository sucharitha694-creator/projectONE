// Register Form Validation
// Register Form
// Register Student using Django API

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const registerNumber =
            document.getElementById("registerNumber").value;

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            alert("Passwords do not match!");
            return;
        }

        fetch("http://127.0.0.1:8000/api/register/", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                registerNumber: registerNumber,
                password: password
            })
        })

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            if (data.error) {

                alert(data.error);

            } else {

                alert(data.message);

                window.location.href = "login.html";
            }
        })

        .catch(function (error) {

            alert("Registration failed!");

            console.log(error);
        });
    });
}


// Apply for Job
function applyJob(companyId) {

    fetch("http://127.0.0.1:8000/api/applications/", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            company_id: companyId
        })
    })

    .then(function (response) {
        return response.json();
    })

    .then(function (data) {

        alert(data.message);

        window.location.href = "applications.html";
    })

    .catch(function (error) {

        alert("Unable to submit application!");

        console.log(error);
    });
}

// Display Applications
// Display Applications from Django API

const applicationContainer =
    document.getElementById("applicationContainer");

if (applicationContainer) {

    fetch("http://127.0.0.1:8000/api/applications/")

        .then(function (response) {
            return response.json();
        })

        .then(function (applications) {

            if (applications.length === 0) {

                applicationContainer.innerHTML = `
                    <div class="application-card">

                        <h2>No Applications Yet</h2>

                        <p>
                            You haven't applied to any companies yet.
                        </p>

                        <button onclick="location.href='companies.html'">
                            Explore Companies
                        </button>

                    </div>
                `;

            } else {

                applications.forEach(function (application) {

                    applicationContainer.innerHTML += `

                        <div class="application-card">

                            <h2>${application.company}</h2>

                            <p>
                                <strong>Role:</strong>
                                ${application.role}
                            </p>

                            <p>
                                <strong>Package:</strong>
                                ${application.package}
                            </p>

                            <p>
                                <strong>Status:</strong>
                                <span class="status">
                                    ${application.status}
                                </span>
                            </p>

                        </div>
                    `;
                });
            }
        })

        .catch(function (error) {

            applicationContainer.innerHTML =
                "<p>Unable to load applications.</p>";

            console.log(error);
        });
}

// Display Student Profile

const profileName =
    document.getElementById("profileName");

if (profileName) {

    const student =
        JSON.parse(localStorage.getItem("student"));

    if (student) {

        document.getElementById("profileName").textContent =
            student.name;

        document.getElementById("profileEmail").textContent =
            student.email;

        document.getElementById(
            "profileRegisterNumber"
        ).textContent =
            student.registerNumber;

    } else {

        profileName.textContent = "Student";
    }
}
// Check Eligibility

function checkEligibility() {

    const cgpa =
        Number.parseFloat(document.getElementById("cgpa").value);

    const result =
        document.getElementById("eligibilityResult");

    if (!cgpa || cgpa < 0 || cgpa > 10) {

        result.innerHTML =
            "<p>Please enter a valid CGPA between 0 and 10.</p>";

        return;
    }

    let eligibleCompanies = [];

    if (cgpa >= 7.0) {
        eligibleCompanies.push(
            "TechNova Solutions - Software Developer",
            "CloudBridge Systems - Python Developer"
        );
    }

    if (cgpa >= 6.5) {
        eligibleCompanies.push(
            "InnovateX Technologies - Web Developer"
        );
    }

    if (cgpa >= 7.5) {
        eligibleCompanies.push(
            "DataSphere - Data Analyst"
        );
    }

    if (eligibleCompanies.length === 0) {

        result.innerHTML =
            "<p>No companies available for your current CGPA.</p>";

    } else {

        result.innerHTML = `
            <h3>You are eligible for:</h3>
            <ul>
                ${eligibleCompanies
                    .map(company => `<li>${company}</li>`)
                    .join("")}
            </ul>
        `;
    }
}


// Login using Django API

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const loginEmail =
            document.getElementById("loginEmail").value;

        const loginPassword =
            document.getElementById("loginPassword").value;

        fetch("http://127.0.0.1:8000/api/login/", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword
            })
        })

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            if (data.error) {

                alert(data.error);

            } else {

                // Save logged-in student details

                localStorage.setItem(
                    "student",
                    JSON.stringify({
                        name: data.name,
                        email: data.email,
                        registerNumber: data.registerNumber
                    })
                );

                alert(data.message);

                window.location.href = "dashboard.html";
            }
        })

        .catch(function (error) {

            alert("Login failed!");

            console.log(error);
        });
    });
}
// Display Student Name on Dashboard

const studentName = document.getElementById("studentName");

if (studentName) {

    const student =
        JSON.parse(localStorage.getItem("student"));

    if (student) {
        studentName.textContent = student.name;
    }
}
// Logout Function

function logout() {

    localStorage.removeItem("student");

    window.location.href = "login.html";

}
// Fetch Companies from Django API

const companyContainer =
    document.getElementById("companyContainer");

if (companyContainer) {

    fetch("http://127.0.0.1:8000/api/companies/")

        .then(function (response) {
            return response.json();
        })

        .then(function (companies) {

            companies.forEach(function (company) {

                companyContainer.innerHTML += `

                    <div class="company-card">

                        <h2>${company.name}</h2>

                        <p>
                            <strong>Role:</strong>
                            ${company.role}
                        </p>

                        <p>
                            <strong>Package:</strong>
                            ${company.package}
                        </p>

                        <p>
                            <strong>Minimum CGPA:</strong>
                            ${company.minimum_cgpa}
                        </p>

                       <button onclick="applyJob(${company.id})">
    Apply Now
</button>

                    </div>

                `;
            });
        })

        .catch(function (error) {

            companyContainer.innerHTML =
                "<p>Unable to load companies.</p>";

            console.log(error);
        });
}