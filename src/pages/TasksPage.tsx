import { useApp } from "../context/AppContext";
import { TaskForm } from "../components/TaskForm";
import { TaskItem } from "../components/TaskItem";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { EmptyState } from "../components/EmptyState";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export function TasksPage() {
  const { t } = useLanguage();
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
        padding: "2rem 1rem",
      }}
    >
      <TaskForm onAdd={(title, estimate) => addTask(title, estimate)} />

      <div className="d-flex justify-content-center align-items-center flex-column mt-5">
        <h1 className="fw-bold mb-1">{t("myTasks")}</h1>
        <p className="text-secondary mb-0">{t("taskCount")}: {tasks.length}</p>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
        <button
          className={
            doneFilter === null ? "btn btn-primary" : "btn btn-outline-primary"
          }
          onClick={() => setSearchParams({})}
        >
          {t("all")}
        </button>

        <button
          className={
            doneFilter === "false"
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={() => setSearchParams({ done: "false" })}
        >
          {t("active")}
        </button>

        <button
          className={
            doneFilter === "true"
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={() => setSearchParams({ done: "true" })}
        >
          {t("completed")}
        </button>
      </div>

      <div>
        <ConfirmDialog
          open={deleteTask !== null}
          message={t("deleteTaskQuestion")}
          onCancel={() => setDeleteTask(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>

      <div className="row g-4 w-100">
        {tasks.length === 0 ? (
          <EmptyState
            title={t("noTasks")}
            hint={t("addFirstTask")}
          />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            title={t("noFilterItems")}
            hint={t("tryAnotherFilter")}
            buttonText={t("clearFilter")}
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
