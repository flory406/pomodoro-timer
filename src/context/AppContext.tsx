import { createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ReactNode } from "react";

import type { Settings, Task, Session } from "../types";
import {
  loadSettings,
  loadTasks,
  loadSessions,
  saveToStorage,
} from "../storage";

export type AppContextValue = {
  settings: Settings;
  tasks: Task[];
  sessions: Session[];
  addTask: (title: string, estimate: number) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  addSession: (session: Session) => void;

  setSettings: Dispatch<SetStateAction<Settings>>;
};

export const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProp {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProp) {
  const [settings, setSettings] = useState(() => loadSettings());
  const [tasks, setTasks] = useState(() => loadTasks());
  const [sessions, setSessions] = useState(() => loadSessions());

  useEffect(() => {
    saveToStorage("settings", settings);
  }, [settings]);

  useEffect(() => {
    saveToStorage("tasks", tasks);
  }, [tasks]);

  useEffect(() => {
    saveToStorage("sessions", sessions);
  }, [sessions]);

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

  function removeTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function addSession(session: Session) {
    setSessions([...sessions, session]);
  }

  const value = {
    settings,
    tasks,
    sessions,
    setSettings,
    addTask,
    toggleTask,
    removeTask,
    addSession,
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
