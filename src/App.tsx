import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

import { NotFoundPage } from "./pages/NotFoundPage";
import { SettingsPage } from "./pages/SettingsPage";
import { StatsPage } from "./pages/StatsPage";
import { TaskDetailPage } from "./pages/TaskDetailPage";
import { TasksPage } from "./pages/TasksPage";
import { TimerPage } from "./pages/TimerPage";

import AppProvider from "./context/AppContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<TimerPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/tasks/:id" element={<TaskDetailPage />} />

                <Route path="*" element={<NotFoundPage />} />
                <Route path="/not-found" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
