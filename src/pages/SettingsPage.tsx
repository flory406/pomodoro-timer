import { useState } from "react";
import { useApp } from "../context/AppContext";
import type { Settings } from "../types";
import { validateSettings } from "../lib/utils";

export function SettingsPage() {
  const { settings, setSettings } = useApp();
  const [draft, setDraft] = useState<Settings>(() => ({ ...settings }));

  const [errors, setErrors] = useState<{
    focusMin?: string;
    shortBreakMin?: string;
    longBreakMin?: string;
    cyclesBeforeLongBreak?: string;
  }>({});

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const validationErrors = validateSettings(draft);

    setErrors(validationErrors);
    setSaved(false);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSettings(draft);
    setSaved(true);
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h1 className="mb-4">Налаштування</h1>

        <div className="mb-3">
          <label htmlFor="focusMin" className="form-label">
            Робоча фаза, хвилини
          </label>

          <input
            id="focusMin"
            type="number"
            className={`form-control ${errors.focusMin ? "is-invalid" : ""}`}
            value={draft.focusMin}
            onChange={(event) =>
              setDraft({
                ...draft,
                focusMin: Number(event.target.value),
              })
            }
          />
          {errors.focusMin && (
            <div className="invalid-feedback">{errors.focusMin}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="shortBreakMin" className="form-label">
            Коротка перерва, хвилини
          </label>

          <input
            id="shortBreakMin"
            type="number"
            className={`form-control ${errors.shortBreakMin ? "is-invalid" : ""}`}
            value={draft.shortBreakMin}
            onChange={(event) =>
              setDraft({
                ...draft,
                shortBreakMin: Number(event.target.value),
              })
            }
          />
          {errors.shortBreakMin && (
            <div className="invalid-feedback">{errors.shortBreakMin}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="longBreakMin" className="form-label">
            Довга перерва, хвилини
          </label>

          <input
            id="longBreakMin"
            type="number"
            className={`form-control ${errors.longBreakMin ? "is-invalid" : ""}`}
            value={draft.longBreakMin}
            onChange={(event) =>
              setDraft({
                ...draft,
                longBreakMin: Number(event.target.value),
              })
            }
          />
          {errors.longBreakMin && (
            <div className="invalid-feedback">{errors.longBreakMin}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="cyclesBeforeLongBreak" className="form-label">
            Цикл перед перервою
          </label>

          <input
            id="cyclesBeforeLongBreak"
            type="number"
            className={`form-control ${errors.cyclesBeforeLongBreak ? "is-invalid" : ""}`}
            value={draft.cyclesBeforeLongBreak}
            onChange={(event) =>
              setDraft({
                ...draft,
                cyclesBeforeLongBreak: Number(event.target.value),
              })
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
            Автоматично запускати наступну фазу
          </label>
        </div>

        <div className="form-check mb-3">
          <input
            id="soundOn"
            type="checkbox"
            className="form-check-input"
            checked={draft.soundOn}
            onChange={(event) =>
              setDraft({
                ...draft,
                soundOn: event.target.checked,
              })
            }
          />

          <label htmlFor="soundOn" className="form-check-label">
            Увімкнути звук
          </label>
        </div>

        {saved && (
          <div className="alert alert-success mt-3" role="alert">
            Збережено
          </div>
        )}
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button
            type="button"
            className="btn btn-primary btn-lg rounded-pill mt-3"
            onClick={handleSave}
            style={{ width: "200px" }}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}
