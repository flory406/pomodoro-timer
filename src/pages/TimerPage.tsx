import { useApp } from "../context/AppContext";

import { TimerControls } from "../components/TimerControls";
import { TimerDisplay } from "../components/TimerDisplay";

export function TimerPage() {
  const {
    remainingMs,
    startTimer,
    pauseTimer,
    skipPhase,
    timer,
    settings,
    resetTimer,
    tasks,
    currentTaskId,
    setCurrentTaskId,
  } = useApp();

  const activeTasks = tasks.filter((task) => !task.isDone);

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column gap-3"
      style={{
        minHeight: "calc(100vh - 120px)",
        background:
          "radial-gradient(circle at top, rgba(13, 110, 253, 0.16), transparent 52%), linear-gradient(135deg, rgba(13, 110, 253, 0.04), transparent 60%)",
        borderRadius: "2rem",
        padding: "2rem 1rem",
      }}
    >
      <div
        className="card app-hover-card border-0 shadow-lg rounded-4 w-100"
        style={{
          maxWidth: "560px",
          backgroundColor: "rgba(var(--bs-body-bg-rgb), 0.88)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="card-body">
          <div className="mb-4">
            <label htmlFor="current-task" className="form-label">
              Поточна задача
            </label>

            <select
              id="current-task"
              className="form-select"
              value={currentTaskId ?? ""}
              onChange={(ev) =>
                setCurrentTaskId(
                  ev.target.value === "" ? null : Number(ev.target.value),
                )
              }
              disabled={timer.status === "running" && timer.phase === "Work"}
            >
              <option value="">Без задачі</option>

              {activeTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <TimerDisplay
              remainingMs={remainingMs}
              phase={timer.phase}
              cycle={timer.cycle}
              totalCycles={settings.cyclesBeforeLongBreak}
            />
          </div>

          <div className="d-flex justify-content-center align-items-center gap-3 mt-2">
            <TimerControls
              status={timer.status}
              onStart={startTimer}
              onPause={pauseTimer}
              onReset={resetTimer}
              onSkip={skipPhase}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
