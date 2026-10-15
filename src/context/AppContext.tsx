import { createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ReactNode } from "react";

import type { Settings, Task, Session, TimerState } from "../types";
import {
  loadSettings,
  loadTasks,
  loadSessions,
  saveToStorage,
  loadTimer,
} from "../storage";
import {
  getPhaseMs,
  getNextPhase,
  getPhaseName,
  restoreTimer,
} from "../lib/utils";

export type AppContextValue = {
  settings: Settings;
  tasks: Task[];
  sessions: Session[];
  addTask: (title: string, estimate: number) => void;
  toggleTask: (id: number) => void;
  bumpPomodoro: (id: number) => void;
  removeTask: (id: number) => void;
  addSession: (session: Session) => void;

  setSettings: Dispatch<SetStateAction<Settings>>;

  timer: TimerState;
  now: number;
  remainingMs: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;

  finishPhase: () => void;
  skipPhase: () => void;

  currentTaskId: number | null;
  setCurrentTaskId: (id: number | null) => void;
  notice: string | null;
  setNotice: (notice: string | null) => void;
};

export const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProp {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProp) {
  const [settings, setSettings] = useState(() => loadSettings());
  const [tasks, setTasks] = useState(() => loadTasks());
  const [sessions, setSessions] = useState(() => loadSessions());
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const savedTimer = loadTimer();

  const initialTimer: TimerState = savedTimer
    ? restoreTimer(savedTimer, settings)
    : {
        status: "idle",
        phase: "Work",
        cycle: 1,
        totalMs: getPhaseMs("Work", settings),
        endAt: null,
        remainingMs: getPhaseMs("Work", settings),
      };

  const [timer, setTimer] = useState<TimerState>(initialTimer);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    saveToStorage("settings", settings);
  }, [settings]);

  useEffect(() => {
    if (timer.status !== "idle") {
      return;
    }

    const totalMs = getPhaseMs(timer.phase, settings);

    setTimer((previousTimer) => ({
      ...previousTimer,
      totalMs,
      remainingMs: totalMs,
    }));
  }, [settings]);

  useEffect(() => {
    saveToStorage("tasks", tasks);
  }, [tasks]);

  useEffect(() => {
    saveToStorage("sessions", sessions);
  }, [sessions]);

  useEffect(() => {
    if (timer.status !== "running") {
      return;
    } else {
      const intervalId = setInterval(() => {
        setNow(Date.now());
      }, 250);

      return () => clearInterval(intervalId);
    }
  }, [timer.status]);

  useEffect(() => {
    saveToStorage("timer", timer);
  }, [timer]);

  function addTask(title: string, estimate: number) {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      estimatePomodoros: estimate,
      donePomodoros: 0,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task,
      ),
    );
  }

  function bumpPomodoro(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, donePomodoros: task.donePomodoros + 1 }
          : task,
      ),
    );
  }

  function removeTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function addSession(session: Session) {
    setSessions([...sessions, session]);
  }

  function startTimer() {
    const currentTime = Date.now();
    setNow(currentTime);

    setTimer({
      ...timer,
      status: "running",
      endAt: currentTime + timer.remainingMs,
    });
  }

  function pauseTimer() {
    setTimer({
      ...timer,
      status: "paused",
      remainingMs: remainingMs,
      endAt: null,
    });
  }

  function resetTimer() {
    const totalMs = getPhaseMs(timer.phase, settings);

    setTimer({
      ...timer,
      status: "idle",
      totalMs,
      remainingMs: totalMs,
      endAt: null,
    });
  }

  function finishPhase() {
    const finishedAt = new Date();
    setNotice(`Фазу «${getPhaseName(timer.phase)}» завершено`);

    if (settings.soundOn) {
      new Audio("/beep.mp3").play().catch(() => {});
    }

    if (timer.phase === "Work") {
      const currentTask = tasks.find((task) => task.id === currentTaskId);
      if (currentTask) {
        bumpPomodoro(currentTask.id);
        const session: Session = {
          sessionId: Date.now(),
          taskTitle: currentTask.title,
          phase: timer.phase,
          plannedMin: timer.totalMs / 60000,
          actualSec: timer.totalMs / 1000,
          completed: true,
          startedAt: new Date(
            finishedAt.getTime() - timer.totalMs,
          ).toISOString(),
          finishedAt: finishedAt.toISOString(),
        };
        addSession(session);
      } else {
        const session: Session = {
          sessionId: Date.now(),
          taskTitle: "Без задачі",
          phase: timer.phase,
          plannedMin: timer.totalMs / 60000,
          actualSec: timer.totalMs / 1000,
          completed: true,
          startedAt: new Date(
            finishedAt.getTime() - timer.totalMs,
          ).toISOString(),
          finishedAt: finishedAt.toISOString(),
        };
        addSession(session);
      }
    }
    const next = getNextPhase(timer.phase, timer.cycle, settings);
    const totalMs = getPhaseMs(next.phase, settings);
    const currentTime = Date.now();

    setTimer({
      phase: next.phase,
      cycle: next.cycle,
      status: settings.autoStartNext ? "running" : "idle",
      totalMs: totalMs,
      remainingMs: totalMs,
      endAt: settings.autoStartNext ? currentTime + totalMs : null,
    });
  }

  function skipPhase() {
    const next = getNextPhase(timer.phase, timer.cycle, settings);
    const totalMs = getPhaseMs(next.phase, settings);

    setTimer({
      phase: next.phase,
      cycle: next.cycle,
      status: "idle",
      totalMs: totalMs,
      remainingMs: totalMs,
      endAt: null,
    });
  }

  const remainingMs =
    timer.status === "running" && timer.endAt !== null
      ? Math.max(0, timer.endAt - now)
      : timer.remainingMs;

  useEffect(() => {
    if (timer.status === "running" && remainingMs === 0) {
      finishPhase();
    }
  }, [timer.status, remainingMs]);

  const value = {
    settings,
    tasks,
    sessions,
    setSettings,
    addTask,
    toggleTask,
    bumpPomodoro,
    removeTask,
    addSession,
    timer,
    now,
    remainingMs,
    startTimer,
    pauseTimer,
    resetTimer,
    finishPhase,
    skipPhase,
    currentTaskId,
    setCurrentTaskId,
    notice,
    setNotice,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error("Обгорни застосунок у AppProvider");
  } else {
    return context;
  }
}

export default AppProvider;
