# Pomodoro Timer

A React and TypeScript web application for planning focused work sessions,
breaks, tasks, and productivity statistics.

## Features

- work, short-break, and long-break timer phases;
- automatic transition to the next phase;
- configurable phase durations and cycle count;
- task creation, completion tracking, and deletion;
- current-task selection for work sessions;
- tasks, settings, timer state, and sessions saved in `localStorage`;
- weekly and monthly statistics;
- daily time chart and top tasks;
- statistics reset with confirmation;
- Ukrainian and English interface;
- light and dark themes with a coordinated blue-violet palette;
- task details page and custom 404 page;
- responsive Bootstrap interface.

## Technologies

- React 19
- TypeScript
- Vite
- React Router
- Bootstrap 5

## Local Development

Node.js and npm are required.

```bash
npm install
npm run dev
```

Open the address shown by Vite, usually:

```text
http://localhost:5173
```

## Available Commands

```bash
npm run dev      # start the development server
npm run build    # run TypeScript checks and create a production build
npm run lint     # run ESLint
npm run preview  # preview the production build
```

## Main Pages

| URL | Description |
| --- | --- |
| `/` | Timer and current-task selection |
| `/tasks` | Task list, search, and filters |
| `/tasks/:id` | Details for a specific task |
| `/stats` | Session statistics |
| `/settings` | Timer settings |

Any unknown route opens the custom 404 page.

## Data Storage

The application stores data in the browser's `localStorage`:

- `settings` — timer settings;
- `tasks` — tasks;
- `sessions` — work-session statistics;
- `timer` — timer state used to restore the timer after a page refresh;
- `language` — selected interface language;
- `theme` — selected light or dark theme.

Statistics can be cleared using the button at the bottom of `/stats`.
Tasks, settings, sessions, and timer state can all be reset from `/settings`.

---

# Помодоро Таймер

Вебзастосунок на React і TypeScript для планування робочих сесій, перерв,
задач і відстеження продуктивності.

## Можливості

- таймер робочої фази, короткої та довгої перерви;
- автоматичний перехід до наступної фази;
- налаштування тривалості фаз і кількості циклів;
- створення задач, відстеження виконання та видалення;
- вибір поточної задачі для робочої сесії;
- збереження задач, налаштувань, таймера та сесій у `localStorage`;
- статистика за тиждень і місяць;
- графік часу по днях і топ задач;
- очищення статистики з підтвердженням;
- український та англійський інтерфейс;
- світла й темна теми з узгодженою синьо-фіолетовою палітрою;
- сторінка деталей задачі та власна сторінка 404;
- адаптивний інтерфейс на Bootstrap.

## Технології

- React 19
- TypeScript
- Vite
- React Router
- Bootstrap 5

## Локальний запуск

Потрібен Node.js та npm.

```bash
npm install
npm run dev
```

Після запуску відкрий адресу, яку покаже Vite, зазвичай:

```text
http://localhost:5173
```

## Доступні команди

```bash
npm run dev      # запуск development-сервера
npm run build    # перевірка TypeScript і production-збірка
npm run lint     # перевірка ESLint
npm run preview  # перегляд production-збірки
```

## Основні сторінки

| URL | Опис |
| --- | --- |
| `/` | Таймер і вибір поточної задачі |
| `/tasks` | Список задач, пошук і фільтри |
| `/tasks/:id` | Деталі конкретної задачі |
| `/stats` | Статистика сесій |
| `/settings` | Налаштування таймера |

Будь-який невідомий маршрут відкриває власну сторінку 404.

## Збереження даних

Застосунок зберігає дані в `localStorage` браузера:

- `settings` — налаштування таймера;
- `tasks` — задачі;
- `sessions` — статистика робочих сесій;
- `timer` — стан таймера для відновлення після оновлення сторінки;
- `language` — вибрана мова інтерфейсу;
- `theme` — вибрана світла або темна тема.

Статистику можна очистити кнопкою внизу сторінки `/stats`.
Повністю скинути задачі, налаштування, сесії та таймер можна на сторінці
`/settings`.
