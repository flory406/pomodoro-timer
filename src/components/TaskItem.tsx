import type { Task } from "../types";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

type TasksProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TaskItem({ task, onToggle, onDelete }: TasksProps) {
  const { t } = useLanguage();
  const percentage = Math.min(
    100,
    (task.donePomodoros / task.estimatePomodoros) * 100,
  );

  const titleClass = task.isDone ? "text-decoration-line-through" : "";

  return (
    <div
      className="card app-hover-card h-100 border-0 shadow-lg rounded-4 p-4"
      style={{
        backgroundColor: "rgba(var(--bs-body-bg-rgb), 0.88)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="d-flex justify-content-between align-items-start gap-3">
        <Link
          className={`fs-4 fw-semibold text-decoration-none ${titleClass}`}
          to={`/tasks/${task.id}`}
        >
          {task.title}
        </Link>

        <div className="form-check flex-shrink-0">
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => onToggle(task.id)}
            className="form-check-input"
            aria-label={`${t("markTask")} "${task.title}"`}
          />
        </div>
      </div>

      <div className="d-flex flex-column gap-3 mt-4 h-100">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-secondary">{t("progress")}</span>
          <span className="fw-semibold">
            {task.donePomodoros} {t("of")} {task.estimatePomodoros}
          </span>
        </div>

        <div className="progress w-100" style={{ height: "8px" }}>
          <div
            className="progress-bar"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-auto pt-3">
          <button
            className="btn btn-outline-danger w-100"
            onClick={() => onDelete(task.id)}
          >
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
