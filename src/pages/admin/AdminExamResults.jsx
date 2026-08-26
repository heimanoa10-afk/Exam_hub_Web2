import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getExam, getExamResults } from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";
export default function AdminExamResults() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      setLoading(true);
      const [examData, resultsData] = await Promise.all([
        getExam(id),
        getExamResults(id),
      ]);
      setExam(examData);
      setResults(resultsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function calculateAverage() {
    if (results.length === 0) return 0;
    const sum = results.reduce((total, r) => total + r.score, 0);
    return (sum / results.length).toFixed(2);
  }

  if (loading) return <p>Chargement...</p>;

    return (
    <div>
      <AdminNavbar />
      <h1>Résultats de l'examen : {exam?.title}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>Moyenne : {calculateAverage()} / 20</p>
      <p>Nombre de tentatives : {results.length}</p>

      <table>
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Email</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.studentId}>
              <td>{result.studentName}</td>
              <td>{result.studentEmail}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}