import type { TimerStatus } from "../types";
import { useLanguage } from "../context/LanguageContext";

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
  const { t } = useLanguage();
  const buttonText =
    status === "running"
      ? t("pause")
      : status === "paused"
        ? t("resume")
        : t("start");

  const buttonAction = status === "running" ? onPause : onStart;

  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
      <button className="btn btn-primary rounded-pill px-4" onClick={buttonAction}>
        {buttonText}
      </button>

      <button className="btn btn-outline-secondary rounded-pill px-4" onClick={onReset}>
        {t("reset")}
      </button>

      <button className="btn btn-outline-danger rounded-pill px-4" onClick={onSkip}>
        {t("skipPhase")}
      </button>
    </div>
  );
}
