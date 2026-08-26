import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getExam, getExamQuestions, createQuestion, deleteQuestion } from "../../services/api";

export default function AdminExamQuestions() {
  const { id } = useParams();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [points, setPoints] = useState(1);
  const [choices, setChoices] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      setLoading(true);
      const [examData, questionsData] = await Promise.all([
        getExam(id),
        getExamQuestions(id),
      ]);
      setExam(examData);
      setQuestions(questionsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  function handleChoiceTextChange(index, value) {
    const updated = [...choices];
    updated[index].text = value;
    setChoices(updated);
  }
  function handleCorrectChange(index) {
    const updated = choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setChoices(updated);
  }
  function addChoice() {
    if (choices.length >= 6) return;
    setChoices([...choices, { text: "", isCorrect: false }]);
  }
  function removeChoice() {
    if (choices.length <= 2) return;
    setChoices(choices.slice(0, -1));
  }

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    const hasCorrectChoice = choices.some((c) => c.isCorrect);
    if (!hasCorrectChoice) {
      setError("Vous devez sélectionner un choix correct.");
      return;
    }

    try {
      await createQuestion(id, { text, points: Number(points), choices });
      setText("");
      setPoints(1);
      setChoices([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ]);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(questionId) {
    setError("");
    try {
      await deleteQuestion(questionId);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Chargement...</p>;

  const isLocked = exam?.hasAttempts;

  return (
    <div>
      <h1>Questions de l'examen : {exam?.title}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLocked && (
        <p style={{ color: "orange" }}>
          ⚠ Cet examen a déjà des tentatives : les questions ne sont plus modifiables.
        </p>
      )}

      {!isLocked && (
        <>
          <h2>Ajouter une question</h2>
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Énoncé de la question"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Points"
              min="1"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              required
            />

            <h3>Choix de réponse</h3>
            {choices.map((choice, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={`Choix ${index + 1}`}
                  value={choice.text}
                  onChange={(e) => handleChoiceTextChange(index, e.target.value)}
                  required
                />
                <label>
                  <input
                    type="radio"
                    name="correctChoice"
                    checked={choice.isCorrect}
                    onChange={() => handleCorrectChange(index)}
                  />
                  Correct
                </label>
              </div>
            ))}

            <button type="button" onClick={addChoice} disabled={choices.length >= 6}>
              + Ajouter un choix
            </button>
            <button type="button" onClick={removeChoice} disabled={choices.length <= 2}>
              - Retirer un choix
            </button>

            <br />
            <button type="submit">Créer la question</button>
          </form>
        </>
      )}

      <h2>Liste des questions</h2>
      {questions.map((q) => (
        <div key={q.id}>
          <p><strong>{q.text}</strong> ({q.points} pts)</p>
          <ul>
            {q.choices.map((c) => (
              <li key={c.id} style={{ color: c.isCorrect ? "green" : "black" }}>
                {c.text} {c.isCorrect && "✓"}
              </li>
            ))}
          </ul>
          {!isLocked && (
            <button onClick={() => handleDelete(q.id)}>Supprimer</button>
          )}
        </div>
      ))}
    </div>
  );
}