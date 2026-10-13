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
    <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
      <button className="btn btn-primary rounded-pill px-4" onClick={buttonAction}>
        {buttonText}
      </button>

      <button className="btn btn-outline-secondary rounded-pill px-4" onClick={onReset}>
        Скинути
      </button>

      <button className="btn btn-outline-danger rounded-pill px-4" onClick={onSkip}>
        Пропустити фазу
      </button>
    </div>
  );
}
