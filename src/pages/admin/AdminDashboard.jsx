import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminNavbar from "../../components/AdminNavbar";
export default function AdminDashboard() {
  const { logout } = useAuth();

      return (
    <div>
      <AdminNavbar />
      <h1>Tableau de bord admin</h1>

      <div className="dashboard-cards">
        <Link to="/admin/students" className="dashboard-card">
          <span className="dashboard-card-value">--</span>
          <span className="dashboard-card-label">Étudiants</span>
        </Link>
        <Link to="/admin/courses" className="dashboard-card">
          <span className="dashboard-card-value">--</span>
          <span className="dashboard-card-label">Cours</span>
        </Link>
        <Link to="/admin/exams" className="dashboard-card">
          <span className="dashboard-card-value">--</span>
          <span className="dashboard-card-label">Examens</span>
        </Link>
      </div>
    </div>
  );
}