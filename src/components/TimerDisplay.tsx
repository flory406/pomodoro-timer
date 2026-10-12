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
    <div className="d-flex flex-column justify-content-center align-items-center gap-3 mt-1">
      <h2>{getPhaseName(phase)}</h2>
      <h1 className="display-1">{formatTime(remainingMs)}</h1>

      <p className="text-secondary">
        Цикл {cycle} з {totalCycles}
      </p>
    </div>
  );
}
