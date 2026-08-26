import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminNavbar() {
  const { logout } = useAuth();

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand">Exam Hub — Admin</div>
      <div className="admin-navbar-links">
        <Link to="/admin">Tableau de bord</Link>
        <Link to="/admin/students">Étudiants</Link>
        <Link to="/admin/courses">Cours</Link>
        <Link to="/admin/exams">Examens</Link>
      </div>
      <button onClick={logout}>Se déconnecter</button>
    </nav>
  );
}