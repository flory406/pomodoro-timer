import type { Phase, Settings } from "../types";

export function formatTime(ms: number) {
  const totalSeconds = Math.ceil(ms / 1000);
  const seconds = totalSeconds % 60;
  const secondsText = String(seconds).padStart(2, "0");

  const min = Math.floor(totalSeconds / 60);
  const minText = String(min).padStart(2, "0");

  return `${minText}:${secondsText}`;
}

export function getPhaseMs(phase: Phase, settings: Settings) {
  let minutes: number;

  switch (phase) {
    case "Work":
      minutes = settings.focusMin;
      break;

    case "Short Break":
      minutes = settings.shortBreakMin;
      break;

    case "Long Break":
      minutes = settings.longBreakMin;
      break;
  }

  return minutes * 60 * 1000;
}

export function getPhaseName(phase: Phase) {
  switch (phase) {
    case "Work":
      return "Робота";

    case "Long Break":
      return "Довга перерва";

    case "Short Break":
      return "Коротка перерва";
  }
}

export function getNextPhase(
  phase: Phase,
  cycle: number,
  settings: Settings,
): { phase: Phase; cycle: number } {
  switch (phase) {
    case "Work":
      if (cycle === settings.cyclesBeforeLongBreak) {
        return {
          phase: "Long Break",
          cycle: cycle,
        };
      } else {
        return {
          phase: "Short Break",
          cycle: cycle,
        };
      }

    case "Short Break":
      return {
        phase: "Work",
        cycle: cycle + 1,
      };

    case "Long Break":
      return {
        phase: "Work",
        cycle: 1,
      };
  }
}
