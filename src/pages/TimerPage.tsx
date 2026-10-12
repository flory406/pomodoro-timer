import { useApp } from "../context/AppContext";

import { TimerControls } from "../components/TimerControls";
import { TimerDisplay } from "../components/TimerDisplay";

export function TimerPage() {
  const {
    remainingMs,
    startTimer,
    pauseTimer,
    skipPhase,
    timer,
    settings,
    resetTimer,
  } = useApp();

  return (
    <div className="d-flex justify-content-center align-items-center flex-column gap-3 mt-3">
      <div className="card p-3">
        <div className="card-body">
          <div className="d-flex justify-content-center align-items-center">
            <TimerDisplay
              remainingMs={remainingMs}
              phase={timer.phase}
              cycle={timer.cycle}
              totalCycles={settings.cyclesBeforeLongBreak}
            />
          </div>

          <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
            <TimerControls
              status={timer.status}
              onStart={startTimer}
              onPause={pauseTimer}
              onReset={resetTimer}
              onSkip={skipPhase}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
