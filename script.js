const form = document.getElementById("employeeForm");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const employeeList = document.getElementById("employeeList");
const emptyMessage = document.getElementById("emptyMessage");

// Load saved employees from the browser.
let employees = JSON.parse(localStorage.getItem("employees")) || [];

function displayEmployees() {
    employeeList.innerHTML = "";

    employees.forEach((employee, index) => {
        const item = document.createElement("li");
        const details = document.createElement("span");
        details.textContent = employee.name + " - " + employee.department;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
            employees.splice(index, 1);
            saveAndDisplay();
        });

        item.appendChild(details);
        item.appendChild(deleteButton);
        employeeList.appendChild(item);
    });

    emptyMessage.style.display = employees.length === 0 ? "block" : "none";
}

function saveAndDisplay() {
    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees();
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const department = departmentInput.value.trim();

    if (name === "" || department === "") {
        alert("Please enter both name and department.");
        return;
    }

    employees.push({ name, department });
    saveAndDisplay();
    form.reset();
    nameInput.focus();
});

displayEmployees();
