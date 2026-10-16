import React, { useState } from "react";
import { validate } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";

type TaskFormProps = {
  onAdd: (title: string, estimate: number) => void;
};

export function TaskForm({ onAdd }: TaskFormProps) {
  const { t, language } = useLanguage();
  const [title, setTitle] = useState("");
  const [estimate, setEstimate] = useState("");
  const [errors, setErrors] = useState<{ title?: string; estimate?: string }>(
    {},
  );

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const validationErrors = validate(title, estimate, language);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    } else {
      onAdd(title.trim(), Number(estimate));
      setTitle("");
      setEstimate("");
      setErrors({});
    }
  };

  return (
    <div
      className="card border-0 shadow-lg rounded-4 w-100"
      style={{
        maxWidth: "560px",
        backgroundColor: "rgba(var(--bs-body-bg-rgb), 0.88)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="card-body p-4 p-md-5">
        <div className="mb-4">
          <h2 className="h4 fw-bold mb-2">{t("addTask")}</h2>
          <p className="text-secondary mb-0">
            {t("taskDescription")}
          </p>
        </div>

      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-3"
      >
        <div>
          <label htmlFor="task-title" className="form-label fw-semibold">
            {t("taskTitle")}
          </label>
          <input
            id="task-title"
            type="text"
            onChange={(ev) => setTitle(ev.target.value)}
            value={title}
            className={`form-control form-control-lg ${
              errors.title ? "is-invalid" : ""
            }`}
            placeholder={t("taskTitlePlaceholder")}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div>
          <label htmlFor="task-estimate" className="form-label fw-semibold">
            {t("taskEstimate")}
          </label>
          <input
            id="task-estimate"
            type="number"
            min="1"
            max="20"
            onChange={(ev) => setEstimate(ev.target.value)}
            value={estimate}
            className={`form-control form-control-lg ${
              errors.estimate ? "is-invalid" : ""
            }`}
            placeholder={t("estimatePlaceholder")}
          />
          {errors.estimate && (
            <div className="invalid-feedback">{errors.estimate}</div>
          )}
        </div>

        <button className="btn btn-primary btn-lg rounded-pill mt-2" type="submit">
          {t("addTaskButton")}
        </button>
      </form>
      </div>
    </div>
  );
}
