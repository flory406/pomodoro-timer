import { useApp } from "../context/AppContext";

export function TasksPage() {
  const { tasks } = useApp();

  return (
    <div>
      <h1>Tasks</h1>
      <p>Задач: {tasks.length}</p>
    </div>
  );
}
