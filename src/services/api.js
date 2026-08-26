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

export function getCourses() {
  return apiFetch("/courses");
}

export function createCourse(courseData) {
  return apiFetch("/courses", {
    method: "POST",
    body: JSON.stringify(courseData),
  });
}

export function updateCourse(id, courseData) {
  return apiFetch(`/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(courseData),
  });
}

export function deleteCourse(id) {
  return apiFetch(`/courses/${id}`, {
    method: "DELETE",
  });
}

export function getExams() {
  return apiFetch("/exams");
}

export function getExam(id) {
  return apiFetch(`/exams/${id}`);
}

export function createExam(examData) {
  return apiFetch("/exams", {
    method: "POST",
    body: JSON.stringify(examData),
  });
}

export function updateExam(id, examData) {
  return apiFetch(`/exams/${id}`, {
    method: "PUT",
    body: JSON.stringify(examData),
  });
}

export function deleteExam(id) {
  return apiFetch(`/exams/${id}`, {
    method: "DELETE",
  });
}

export function getExamQuestions(examId) {
  return apiFetch(`/exams/${examId}/questions`);
}

export function createQuestion(examId, questionData) {
  return apiFetch(`/exams/${examId}/questions`, {
    method: "POST",
    body: JSON.stringify(questionData),
  });
}

export function updateQuestion(id, questionData) {
  return apiFetch(`/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify(questionData),
  });
}

export function deleteQuestion(id) {
  return apiFetch(`/questions/${id}`, {
    method: "DELETE",
  });
}

export function getExamResults(examId) {
  return apiFetch(`/exams/${examId}/results`);
}
export default apiFetch;