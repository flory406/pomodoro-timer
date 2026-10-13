import type { Phase } from "../types";
import { formatTime, getPhaseName } from "../lib/utils";

type TimerDisplayProps = {
  remainingMs: number;
  phase: Phase;
  cycle: number;
  totalCycles: number;
};

export function TimerDisplay({
  remainingMs,
  phase,
  cycle,
  totalCycles,
}: TimerDisplayProps) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-3 py-3">
      <span className="badge rounded-pill text-bg-primary px-3 py-2">
        {getPhaseName(phase)}
      </span>
      <h1 className="display-1 fw-bold mb-0">{formatTime(remainingMs)}</h1>

      <p className="text-secondary mb-0">
        Цикл {cycle} з {totalCycles}
      </p>
    </div>
  );
}
