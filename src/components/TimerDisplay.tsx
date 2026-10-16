import type { Phase } from "../types";
import { formatTime } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";

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
  const { t } = useLanguage();
  const phaseKey =
    phase === "Work" ? "work" : phase === "Short Break" ? "shortBreak" : "longBreak";
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-3 py-3">
      <span className="badge rounded-pill text-bg-primary px-3 py-2">
        {t(phaseKey)}
      </span>
      <h1 className="display-1 fw-bold mb-0">{formatTime(remainingMs)}</h1>

      <p className="text-secondary mb-0">
        {t("cycle")} {cycle} {t("of")} {totalCycles}
      </p>
    </div>
  );
}
