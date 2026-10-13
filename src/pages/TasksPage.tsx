import { useApp } from "../context/AppContext";
import { TaskForm } from "../components/TaskForm";
import { TaskItem } from "../components/TaskItem";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { EmptyState } from "../components/EmptyState";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function TasksPage() {
  const { tasks, addTask, toggleTask, removeTask } = useApp();

  const [deleteTask, setDeleteTask] = useState<number | null>(null);

  const handleConfirmDelete = () => {
    if (deleteTask === null) {
      return;
    }

    removeTask(deleteTask);
    setDeleteTask(null);
  };
  const [searchParams, setSearchParams] = useSearchParams();

  const doneFilter = searchParams.get("done");

  let filteredTasks = tasks;

  if (doneFilter === "true") {
    filteredTasks = filteredTasks.filter((task) => task.isDone);
  } else if (doneFilter === "false") {
    filteredTasks = filteredTasks.filter((task) => !task.isDone);
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column gap-4"
      style={{
        minHeight: "calc(100vh - 120px)",
        background:
          "radial-gradient(circle at top, rgba(13, 110, 253, 0.16), transparent 52%), linear-gradient(135deg, rgba(13, 110, 253, 0.04), transparent 60%)",
        borderRadius: "2rem",
        padding: "2rem 1rem",
      }}
    >
      <TaskForm onAdd={(title, estimate) => addTask(title, estimate)} />

      <div className="d-flex justify-content-center align-items-center flex-column mt-5">
        <h1 className="fw-bold mb-1">Мої задачі</h1>
        <p className="text-secondary mb-0">Задач: {tasks.length}</p>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
        <button
          className={
            doneFilter === null ? "btn btn-primary" : "btn btn-outline-primary"
          }
          onClick={() => setSearchParams({})}
        >
          Усі
        </button>

        <button
          className={
            doneFilter === "false"
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={() => setSearchParams({ done: "false" })}
        >
          Активні
        </button>

        <button
          className={
            doneFilter === "true"
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={() => setSearchParams({ done: "true" })}
        >
          Виконані
        </button>
      </div>

      <div>
        <ConfirmDialog
          open={deleteTask !== null}
          message="Точно видалити цю задачу?"
          onCancel={() => setDeleteTask(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>

      <div className="row g-4 w-100">
        {tasks.length === 0 ? (
          <EmptyState
            title="Немає задач"
            hint="Додай першу задачу у формі вище"
          />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            title="За цим фільтром нічого немає"
            hint="Спробуй вибрати інший фільтр"
            buttonText="Скинути фільтр"
            onClick={() => setSearchParams({})}
          />
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="col-12 col-md-6 col-lg-4">
              <TaskItem
                task={task}
                onToggle={toggleTask}
                onDelete={(id) => setDeleteTask(id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
