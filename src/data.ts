import type { Settings, Task } from "./types";

export const defaultSettings: Settings = {
  focusMin: 25,
  shortBreakMin: 5,
  longBreakMin: 15,
  cyclesBeforeLongBreak: 4,
  autoStartNext: true,
  soundOn: true,
};

export const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Підготувати курсову",
    estimatePomodoros: 5,
    donePomodoros: 2,
    isDone: false,
  },

  {
    id: 2,
    title: "Повторити React",
    estimatePomodoros: 3,
    donePomodoros: 0,
    isDone: false,
  },

  {
    id: 3,
    title: "Зробити лабу з БД",
    estimatePomodoros: 4,
    donePomodoros: 4,
    isDone: true,
  },
];
