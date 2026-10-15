import { useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { NotFoundPage } from "./NotFoundPage";
import { EmptyState } from "../components/EmptyState";
import { useNavigate } from "react-router-dom";

export function TaskDetailPage() {
  const { id } = useParams();
  const { tasks, sessions, setCurrentTaskId } = useApp();
  const navigate = useNavigate();

  const taskId = Number(id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return <NotFoundPage />;
  }

  const taskSessions = sessions.filter(
    (session) =>
      session.taskTitle === task.title &&
      session.phase === "Work" &&
      session.completed,
  );

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h1>{task.title}</h1>

        <p>
          {task.donePomodoros} з {task.estimatePomodoros}
        </p>

        <div className="progress mb-3">
          <div
            className="progress-bar"
            style={{
              width: `${Math.min(
                100,
                (task.donePomodoros / task.estimatePomodoros) * 100,
              )}%`,
            }}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center flex-column mt-2">
          <h3>{task.isDone ? "Виконана" : "Не виконана"}</h3>
          <button
            className="btn btn-primary mt-3"
            onClick={() => {
              setCurrentTaskId(task.id);
              navigate("/");
            }}
          >
            Зробити поточною
          </button>
        </div>
      </div>

      <div className="card shadow-lg border-0 rounded-4 p-4 mt-4">
        <h2>Сесії</h2>

        {taskSessions.length === 0 ? (
          <EmptyState
            title="Статистика відсутня"
            hint="Статистики по цій задачі на даний момент немає"
          />
        ) : (
          <div className="list-group">
            {taskSessions.map((session) => (
              <div key={session.sessionId} className="list-group-item">
                <div>{new Date(session.finishedAt).toLocaleDateString()}</div>
                <div>{session.actualSec / 60} хв</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
