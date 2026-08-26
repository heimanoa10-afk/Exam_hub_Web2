const API_BASE_URL = "http://localhost:4000/api";
async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue");
    }

    return data;
}

export function login(email, password) {
    return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password}),
    })
}

export function getStudents() {
  return apiFetch("/students");
}

export function createStudent(studentData) {
  return apiFetch("/students", {
    method: "POST",
    body: JSON.stringify(studentData),
  });
}

export function updateStudent(id, studentData) {
  return apiFetch(`/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(studentData),
  });
}

export function deactivateStudent(id) {
  return apiFetch(`/students/${id}`, {
    method: "DELETE",
  });
}
export default apiFetch;