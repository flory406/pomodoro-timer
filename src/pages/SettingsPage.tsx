import { useState } from "react";
import { useApp } from "../context/AppContext";
import type { Settings } from "../types";
import { validateSettings } from "../lib/utils";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useLanguage } from "../context/LanguageContext";

export function SettingsPage() {
  const { t, language } = useLanguage();
  const { settings, setSettings } = useApp();
  const [draft, setDraft] = useState<Settings>(() => ({ ...settings }));

  const [errors, setErrors] = useState<{
    focusMin?: string;
    shortBreakMin?: string;
    longBreakMin?: string;
    cyclesBeforeLongBreak?: string;
  }>({});

  const [saved, setSaved] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleNumberChange = (
    key:
      | "focusMin"
      | "shortBreakMin"
      | "longBreakMin"
      | "cyclesBeforeLongBreak",
    value: string,
  ) => {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue) || numberValue < 1) {
      return;
    }

    setDraft({
      ...draft,
      [key]: numberValue,
    });
  };

  const handleSave = () => {
    const validationErrors = validateSettings(draft, language);

    setErrors(validationErrors);
    setSaved(false);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSettings(draft);
    setSaved(true);
  };

  const handleReset = () => {
    ["settings", "tasks", "sessions", "timer"].forEach((key) => {
      localStorage.removeItem(key);
    });

    window.location.reload();
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h1 className="mb-4">{t("settings")}</h1>

        <div className="mb-3">
          <label htmlFor="focusMin" className="form-label">
            {t("workPhase")}
          </label>

          <input
            id="focusMin"
            type="number"
            min={1}
            step={1}
            className={`form-control ${errors.focusMin ? "is-invalid" : ""}`}
            value={draft.focusMin}
            onChange={(event) =>
              handleNumberChange("focusMin", event.target.value)
            }
          />
          {errors.focusMin && (
            <div className="invalid-feedback">{errors.focusMin}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="shortBreakMin" className="form-label">
            {t("shortBreakMinutes")}
          </label>

          <input
            id="shortBreakMin"
            type="number"
            min={1}
            step={1}
            className={`form-control ${errors.shortBreakMin ? "is-invalid" : ""}`}
            value={draft.shortBreakMin}
            onChange={(event) =>
              handleNumberChange("shortBreakMin", event.target.value)
            }
          />
          {errors.shortBreakMin && (
            <div className="invalid-feedback">{errors.shortBreakMin}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="longBreakMin" className="form-label">
            {t("longBreakMinutes")}
          </label>

          <input
            id="longBreakMin"
            type="number"
            min={1}
            step={1}
            className={`form-control ${errors.longBreakMin ? "is-invalid" : ""}`}
            value={draft.longBreakMin}
            onChange={(event) =>
              handleNumberChange("longBreakMin", event.target.value)
            }
          />
          {errors.longBreakMin && (
            <div className="invalid-feedback">{errors.longBreakMin}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="cyclesBeforeLongBreak" className="form-label">
            {t("cyclesBeforeBreak")}
          </label>

          <input
            id="cyclesBeforeLongBreak"
            type="number"
            min={1}
            step={1}
            className={`form-control ${errors.cyclesBeforeLongBreak ? "is-invalid" : ""}`}
            value={draft.cyclesBeforeLongBreak}
            onChange={(event) =>
              handleNumberChange(
                "cyclesBeforeLongBreak",
                event.target.value,
              )
            }
          />
          {errors.cyclesBeforeLongBreak && (
            <div className="invalid-feedback">
              {errors.cyclesBeforeLongBreak}
            </div>
          )}
        </div>

        <div className="form-check mb-3">
          <input
            id="autoStartNext"
            type="checkbox"
            className="form-check-input"
            checked={draft.autoStartNext}
            onChange={(event) =>
              setDraft({
                ...draft,
                autoStartNext: event.target.checked,
              })
            }
          />

          <label htmlFor="autoStartNext" className="form-check-label">
            {t("autoStart")}
          </label>
        </div>

        {saved && (
          <div className="alert alert-success mt-3" role="alert">
            {t("saved")}
          </div>
        )}
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button
            type="button"
            className="btn btn-primary btn-lg rounded-pill mt-3"
            onClick={handleSave}
            style={{ width: "200px" }}
          >
            {t("save")}
          </button>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <button
            type="button"
            className="btn btn-outline-danger mt-3"
            onClick={() => setShowReset(true)}
          >
            {t("resetData")}
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={showReset}
        message={t("resetDataQuestion")}
        onCancel={() => setShowReset(false)}
        onConfirm={handleReset}
        confirmText={t("confirm")}
      />
    </div>
  );
}
