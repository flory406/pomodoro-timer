import type { Phase, Session, Settings, TimerState } from "../types";
import type { Language } from "../context/LanguageContext";

type TaskFormErrors = {
  title?: string;
  estimate?: string;
};

type SettingsErrors = {
  focusMin?: string;
  shortBreakMin?: string;
  longBreakMin?: string;
  cyclesBeforeLongBreak?: string;
};

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

export function validate(title: string, estimate: string, language: Language = "uk") {
  const errors: TaskFormErrors = {};

  const trimmedTitle = title.trim();
  const estimateNumber = Number(estimate);

  if (trimmedTitle.length < 2 || trimmedTitle.length > 80) {
    errors.title =
      language === "uk"
        ? "Назва має містити від 2 до 80 символів"
        : "The name must contain 2 to 80 characters";
  }

  if (
    !Number.isInteger(estimateNumber) ||
    estimateNumber < 1 ||
    estimateNumber > 20
  ) {
    errors.estimate =
      language === "uk"
        ? "Оцінка має бути цілим числом від 1 до 20"
        : "The estimate must be an integer from 1 to 20";
  }

  return errors;
}

export function validateSettings(settings: Settings, language: Language = "uk") {
  const errors: SettingsErrors = {};

  if (
    !Number.isInteger(settings.focusMin) ||
    settings.focusMin < 1 ||
    settings.focusMin > 120
  ) {
    errors.focusMin =
      language === "uk"
        ? "Робоча фаза має бути цілим числом від 1 до 120"
        : "The work phase must be an integer from 1 to 120";
  }

  if (
    !Number.isInteger(settings.shortBreakMin) ||
    settings.shortBreakMin < 1 ||
    settings.shortBreakMin > 60
  ) {
    errors.shortBreakMin =
      language === "uk"
        ? "Коротка перерва має бути цілим числом від 1 до 60"
        : "The short break must be an integer from 1 to 60";
  }

  if (
    !Number.isInteger(settings.longBreakMin) ||
    settings.longBreakMin < 1 ||
    settings.longBreakMin > 60
  ) {
    errors.longBreakMin =
      language === "uk"
        ? "Довга перерва має бути цілим числом від 1 до 60"
        : "The long break must be an integer from 1 to 60";
  }

  if (
    !Number.isInteger(settings.cyclesBeforeLongBreak) ||
    settings.cyclesBeforeLongBreak < 2 ||
    settings.cyclesBeforeLongBreak > 8
  ) {
    errors.cyclesBeforeLongBreak =
      language === "uk"
        ? "Кількість циклів має бути цілим числом від 2 до 8"
        : "The number of cycles must be an integer from 2 to 8";
  }

  return errors;
}

export function dayKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getPeriodDays(days: number) {
  const today = new Date();

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - index,
    );

    return dayKey(date);
  }).reverse();
}

export function getSecondsByDay(sessions: Session[], days: string[]) {
  return days.map((day) => {
    const sec = sessions
      .filter(
        (session) =>
          session.phase === "Work" &&
          session.actualSec > 0 &&
          dayKey(new Date(session.finishedAt)) === day,
      )
      .reduce((total, session) => total + session.actualSec, 0);

    return { day, sec };
  });
}

export function getTopTasks(sessions: Session[], days: string[]) {
  const secondsByTask: Record<string, number> = {};

  sessions
    .filter(
      (session) =>
        session.phase === "Work" &&
        session.actualSec > 0 &&
        days.includes(dayKey(new Date(session.finishedAt))),
    )
    .forEach((session) => {
      secondsByTask[session.taskTitle] =
        (secondsByTask[session.taskTitle] ?? 0) + session.actualSec;
    });

  return Object.entries(secondsByTask)
    .map(([taskTitle, sec]) => ({ taskTitle, sec }))
    .sort((a, b) => b.sec - a.sec)
    .slice(0, 5);
}

export function formatDuration(sec: number) {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);

  if (hours === 0) {
    return `${minutes} хв`;
  }

  return `${hours} год ${minutes} хв`;
}
