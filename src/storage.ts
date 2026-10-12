import { defaultSettings, defaultTasks } from "./data";
import type { Settings, Task, Session, TimerState } from "./types";

export function saveToStorage(key: string, value: any) {
  const valueTexted = JSON.stringify(value);
  localStorage.setItem(key, valueTexted);
}

export function loadTasks(): Task[] {
  const getTasks = localStorage.getItem("tasks");

  if (getTasks === null || getTasks.length === 0) {
    return defaultTasks;
  } else {
    try {
      const parsedTasks = JSON.parse(getTasks);

      if (Array.isArray(parsedTasks)) {
        return parsedTasks;
      } else {
        return defaultTasks;
      }
    } catch (error) {
      return defaultTasks;
    }
  }
}

export function loadSessions(): Session[] {
  const getSessions = localStorage.getItem("sessions");

  if (getSessions === null || getSessions.length === 0) {
    return [];
  } else {
    try {
      const parsedSessions = JSON.parse(getSessions);

      if (Array.isArray(parsedSessions)) {
        return parsedSessions;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }
}

export function loadSettings(): Settings {
  const getSettings = localStorage.getItem("settings");

  if (getSettings === null || getSettings.length === 0) {
    return defaultSettings;
  } else {
    try {
      const parsedSettings = JSON.parse(getSettings);

      if (
        parsedSettings !== null &&
        typeof parsedSettings === "object" &&
        !Array.isArray(parsedSettings)
      ) {
        return parsedSettings;
      } else {
        return defaultSettings;
      }
    } catch (error) {
      return defaultSettings;
    }
  }
}

export function loadTimer(): TimerState | null {
  const timer = localStorage.getItem("timer");

  if (timer === null || timer.length === 0) {
    return null;
  } else {
    try {
      const parsedTimer = JSON.parse(timer);

      if (
        parsedTimer !== null &&
        typeof parsedTimer === "object" &&
        !Array.isArray(parsedTimer) &&
        "status" in parsedTimer &&
        "remainingMs" in parsedTimer
      ) {
        return parsedTimer;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }
}
