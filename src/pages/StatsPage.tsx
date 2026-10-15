import { useSearchParams } from "react-router-dom";
import { BarChart } from "../components/BarChart";
import { EmptyState } from "../components/EmptyState";
import { useApp } from "../context/AppContext";
import {
  formatDuration,
  dayKey,
  getPeriodDays,
  getSecondsByDay,
  getTopTasks,
} from "../lib/utils";

export function StatsPage() {
  const { sessions } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const range = searchParams.get("range");
  const isMonth = range === "month";
  const days = getPeriodDays(isMonth ? 30 : 7);
  const periodSessions = sessions.filter(
    (session) =>
      session.phase === "Work" &&
      session.completed &&
      days.includes(dayKey(new Date(session.finishedAt))),
  );

  if (periodSessions.length === 0) {
    return (
      <div className="container py-5">
        <EmptyState
          title="Статистика порожня"
          hint="Завершені робочі сесії за цей період з'являться тут"
        />
      </div>
    );
  }

  const secondsByDay = getSecondsByDay(sessions, days);
  const totalSeconds = periodSessions.reduce(
    (total, session) => total + session.actualSec,
    0,
  );
  const topTasks = getTopTasks(sessions, days);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Статистика</h1>

        <div className="btn-group" role="group" aria-label="Період статистики">
          <button
            className={
              !isMonth ? "btn btn-primary" : "btn btn-outline-primary"
            }
            onClick={() => setSearchParams({ range: "week" })}
          >
            Тиждень
          </button>
          <button
            className={
              isMonth ? "btn btn-primary" : "btn btn-outline-primary"
            }
            onClick={() => setSearchParams({ range: "month" })}
          >
            Місяць
          </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-2">Завершено сесій</p>
              <h2 className="mb-0">{periodSessions.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-2">Загальний час</p>
              <h2 className="mb-0">{formatDuration(totalSeconds)}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h4 mb-4">Час по днях</h2>
          <BarChart
            items={secondsByDay.map(({ day, sec }) => ({
              label: isMonth ? day.slice(8) : day.slice(5),
              value: sec,
            }))}
            compactLabels={isMonth}
          />
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h2 className="h4 mb-3">Топ задач</h2>
          <div className="list-group">
            {topTasks.map((task) => (
              <div
                key={task.taskTitle}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{task.taskTitle}</span>
                <span className="text-secondary">
                  {formatDuration(task.sec)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
