import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Language = "uk" | "en";

type TranslationKey = keyof typeof translations.uk;

const translations = {
  uk: {
    timer: "Таймер",
    tasks: "Задачі",
    stats: "Статистика",
    settings: "Налаштування",
    language: "English",
    currentTask: "Поточна задача",
    noTask: "Без задачі",
    work: "Робота",
    shortBreak: "Коротка перерва",
    longBreak: "Довга перерва",
    cycle: "Цикл",
    of: "з",
    minutes: "хв",
    pause: "Пауза",
    resume: "Продовжити",
    start: "Старт",
    reset: "Скинути",
    skipPhase: "Пропустити фазу",
    myTasks: "Мої задачі",
    taskCount: "Задач",
    all: "Усі",
    active: "Активні",
    completed: "Виконані",
    deleteTaskQuestion: "Точно видалити цю задачу?",
    noTasks: "Немає задач",
    addFirstTask: "Додай першу задачу у формі вище",
    noFilterItems: "За цим фільтром нічого немає",
    tryAnotherFilter: "Спробуй вибрати інший фільтр",
    clearFilter: "Скинути фільтр",
    addTask: "Додати нову задачу",
    taskDescription: "Запиши, що потрібно зробити, і оціни кількість помідорів.",
    taskTitle: "Назва задачі",
    taskTitlePlaceholder: "Наприклад, підготувати презентацію",
    taskEstimate: "Оцінка в помідорах",
    estimatePlaceholder: "Від 1 до 20",
    addTaskButton: "Додати задачу",
    progress: "Прогрес",
    delete: "Видалити",
    markTask: "Позначити задачу",
    week: "Тиждень",
    month: "Місяць",
    completedSessions: "Завершено сесій",
    totalTime: "Загальний час",
    timeByDay: "Час по днях",
    topTasks: "Топ задач",
    emptyStats: "Статистика порожня",
    emptyStatsHint: "Завершені робочі сесії за цей період з'являться тут",
    clearStats: "Очистити статистику",
    clearStatsQuestion: "Усю статистику буде видалено. Продовжити?",
    clear: "Очистити",
    taskDone: "Виконана",
    taskNotDone: "Не виконана",
    sessions: "Сесії",
    noTaskStats: "Статистика відсутня",
    noTaskStatsHint: "Статистики по цій задачі на даний момент немає",
    makeCurrent: "Зробити поточною",
    workPhase: "Робоча фаза, хвилини",
    shortBreakMinutes: "Коротка перерва, хвилини",
    longBreakMinutes: "Довга перерва, хвилини",
    cyclesBeforeBreak: "Цикл перед перервою",
    autoStart: "Автоматично запускати наступну фазу",
    saved: "Збережено",
    save: "Зберегти",
    resetData: "Скинути дані",
    resetDataQuestion: "Усі задачі, сесії й налаштування буде скинуто до початкових. Продовжити?",
    confirm: "Підтвердити",
    cancel: "Скасувати",
    lostTimer: "Схоже, таймер заблукав",
    pageNotFound: "Сторінку не знайдено",
    pageNotFoundHint: "Посилання могло бути змінене або цієї сторінки більше не існує.",
    backToTimer: "Повернутися до таймера",
    phaseFinished: "Фазу «{phase}» завершено",
    validationTitle: "Назва має містити від 2 до 80 символів",
    validationEstimate: "Оцінка має бути цілим числом від 1 до 20",
    validationFocus: "Робоча фаза має бути цілим числом від 1 до 120",
    validationShort: "Коротка перерва має бути цілим числом від 1 до 60",
    validationLong: "Довга перерва має бути цілим числом від 1 до 60",
    validationCycles: "Кількість циклів має бути цілим числом від 2 до 8",
  },
  en: {
    timer: "Timer",
    tasks: "Tasks",
    stats: "Stats",
    settings: "Settings",
    language: "Українська",
    currentTask: "Current task",
    noTask: "No task",
    work: "Work",
    shortBreak: "Short break",
    longBreak: "Long break",
    cycle: "Cycle",
    of: "of",
    minutes: "min",
    pause: "Pause",
    resume: "Resume",
    start: "Start",
    reset: "Reset",
    skipPhase: "Skip phase",
    myTasks: "My tasks",
    taskCount: "Tasks",
    all: "All",
    active: "Active",
    completed: "Completed",
    deleteTaskQuestion: "Are you sure you want to delete this task?",
    noTasks: "No tasks",
    addFirstTask: "Add your first task using the form above",
    noFilterItems: "Nothing found for this filter",
    tryAnotherFilter: "Try selecting another filter",
    clearFilter: "Clear filter",
    addTask: "Add a new task",
    taskDescription: "Write down what needs to be done and estimate the pomodoros.",
    taskTitle: "Task name",
    taskTitlePlaceholder: "For example, prepare a presentation",
    taskEstimate: "Pomodoro estimate",
    estimatePlaceholder: "From 1 to 20",
    addTaskButton: "Add task",
    progress: "Progress",
    delete: "Delete",
    markTask: "Mark task",
    week: "Week",
    month: "Month",
    completedSessions: "Completed sessions",
    totalTime: "Total time",
    timeByDay: "Time by day",
    topTasks: "Top tasks",
    emptyStats: "Statistics are empty",
    emptyStatsHint: "Completed work sessions for this period will appear here",
    clearStats: "Clear statistics",
    clearStatsQuestion: "All statistics will be deleted. Continue?",
    clear: "Clear",
    taskDone: "Completed",
    taskNotDone: "Not completed",
    sessions: "Sessions",
    noTaskStats: "No statistics",
    noTaskStatsHint: "There is no statistics for this task yet",
    makeCurrent: "Make current",
    workPhase: "Work phase, minutes",
    shortBreakMinutes: "Short break, minutes",
    longBreakMinutes: "Long break, minutes",
    cyclesBeforeBreak: "Cycles before break",
    autoStart: "Automatically start the next phase",
    saved: "Saved",
    save: "Save",
    resetData: "Reset data",
    resetDataQuestion: "All tasks, sessions and settings will be reset. Continue?",
    confirm: "Confirm",
    cancel: "Cancel",
    lostTimer: "It looks like the timer got lost",
    pageNotFound: "Page not found",
    pageNotFoundHint: "The link may have changed or this page no longer exists.",
    backToTimer: "Back to timer",
    phaseFinished: "The “{phase}” phase is complete",
    validationTitle: "The name must contain 2 to 80 characters",
    validationEstimate: "The estimate must be an integer from 1 to 20",
    validationFocus: "The work phase must be an integer from 1 to 120",
    validationShort: "The short break must be an integer from 1 to 60",
    validationLong: "The long break must be an integer from 1 to 60",
    validationCycles: "The number of cycles must be an integer from 2 to 8",
  },
} as const;

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey, values?: Record<string, string>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return saved === "en" ? "en" : "uk";
  });

  const toggleLanguage = () => {
    const nextLanguage = language === "uk" ? "en" : "uk";
    setLanguage(nextLanguage);
    localStorage.setItem("language", nextLanguage);
  };

  const t = (key: TranslationKey, values?: Record<string, string>) => {
    let text: string = translations[language][key];
    Object.entries(values ?? {}).forEach(([name, value]) => {
      text = text.replace(`{${name}}`, value);
    });
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error("Обгорни застосунок у LanguageProvider");
  }
  return context;
}
