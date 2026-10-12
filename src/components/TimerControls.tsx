import type { TimerStatus } from "../types";

type TimerControlsProps = {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
};

export function TimerControls({
  status,
  onStart,
  onPause,
  onReset,
  onSkip,
}: TimerControlsProps) {
  const buttonText =
    status === "running"
      ? "Пауза"
      : status === "paused"
        ? "Продовжити"
        : "Старт";

  const buttonAction = status === "running" ? onPause : onStart;

  return (
    <div className="d-flex justify-content-center align-items-center gap-3">
      <button className="btn btn-primary" onClick={buttonAction}>
        {buttonText}
      </button>

      <button className="btn btn-secondary" onClick={onReset}>
        Скинути
      </button>

      <button className="btn btn-outline-danger" onClick={onSkip}>
        Пропустити фазу
      </button>
    </div>
  );
}
