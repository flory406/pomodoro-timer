export type Phase = "Work" | "Short Break" | "Long Break";
export type TimerStatus = "idle" | "running" | "paused";
export type StatsRange = "week" | "month";

export interface Settings {
  focusMin: number;
  shortBreakMin: number;
  longBreakMin: number;
  cyclesBeforeLongBreak: number;
  autoStartNext: boolean;
  soundOn: boolean;
}

export interface Task {
  id: number;
  title: string;
  estimatePomodoros: number;
  donePomodoros: number;
  isDone: boolean;
}

export interface Session {
  sessionId: number;
  taskTitle: string;
  phase: Phase;
  plannedMin: number;
  actualSec: number;
  completed: boolean;
  startedAt: string;
  finishedAt: string;
}

export interface TimerState {
  status: TimerStatus;
  phase: Phase;
  cycle: number;
  totalMs: number;
  endAt: number | null;
  remainingMs: number;
}
