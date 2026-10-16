import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BarChart } from "../components/BarChart";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { EmptyState } from "../components/EmptyState";
import { useApp } from "../context/AppContext";
import { useLanguage } from "../context/LanguageContext";
import {
  formatDuration,
  dayKey,
  getPeriodDays,
  getSecondsByDay,
  getTopTasks,
} from "../lib/utils";

export function StatsPage() {
  const { t } = useLanguage();
  const { sessions } = useApp();
  const [showClear, setShowClear] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const range = searchParams.get("range");
  const isMonth = range === "month";
  const days = getPeriodDays(isMonth ? 30 : 7);
  const periodSessions = sessions.filter(
    (session) =>
      session.phase === "Work" &&
      session.actualSec > 0 &&
      days.includes(dayKey(new Date(session.finishedAt))),
  );

  const clearStatistics = () => {
    localStorage.removeItem("sessions");
    window.location.reload();
  };

  if (periodSessions.length === 0) {
    return (
      <div className="container py-5">
        <EmptyState
          title={t("emptyStats")}
          hint={t("emptyStatsHint")}
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
        <h1 className="mb-0">{t("stats")}</h1>

        <div className="btn-group" role="group" aria-label={t("stats")}>
          <button
            className={
              !isMonth ? "btn btn-primary" : "btn btn-outline-primary"
            }
            onClick={() => setSearchParams({ range: "week" })}
          >
            {t("week")}
          </button>
          <button
            className={
              isMonth ? "btn btn-primary" : "btn btn-outline-primary"
            }
            onClick={() => setSearchParams({ range: "month" })}
          >
            {t("month")}
          </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-2">{t("completedSessions")}</p>
              <h2 className="mb-0">{periodSessions.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-2">{t("totalTime")}</p>
              <h2 className="mb-0">{formatDuration(totalSeconds)}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h4 mb-4">{t("timeByDay")}</h2>
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
          <h2 className="h4 mb-3">{t("topTasks")}</h2>
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

      <div className="text-end mt-4">
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => setShowClear(true)}
        >
          {t("clearStats")}
        </button>
      </div>

      <ConfirmDialog
        open={showClear}
        message={t("clearStatsQuestion")}
        onCancel={() => setShowClear(false)}
        onConfirm={clearStatistics}
        confirmText={t("clear")}
      />
    </div>
  );
}
