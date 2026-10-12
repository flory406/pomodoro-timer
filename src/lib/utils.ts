import type { Phase, Settings, TimerState } from "../types";

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

export function restoreTimer(
  saved: TimerState,
  settings: Settings,
): TimerState {
  const currentTime = Date.now();

  if (saved.status !== "running" || saved.endAt === null) {
    return saved;
  } else if (saved.endAt > currentTime) {
    return {
      ...saved,
      status: "paused",
      remainingMs: saved.endAt - currentTime,
      endAt: null,
    };
  } else {
    const totalMs = getPhaseMs(saved.phase, settings);
    return {
      ...saved,
      status: "idle",
      totalMs,
      remainingMs: totalMs,
      endAt: null,
    };
  }
}
