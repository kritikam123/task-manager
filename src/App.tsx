import { useState, useEffect } from "react";
import type { Task, Filter } from "./types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const FILTERS: Filter[] = ["all", "active", "completed"];

const FILTER_LABELS: Record<Filter, string> = {
  all: "All",
  active: "To do",
  completed: "Done",
};

function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem("tasks");
    return saved ? (JSON.parse(saved) as Task[]) : [];
  } catch {
    return [];
  }
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string): void => {
    const newTask: Task = { id: crypto.randomUUID(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string): void => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string): void => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id: string, newText: string): void => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  };

  const visibleTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const remaining = tasks.filter((t) => !t.completed).length;

  const now = new Date();
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const dayMonth = now.toLocaleDateString("en-US", { day: "numeric", month: "long" });

  return (
    <main className="app">
      <header className="hero">
        <h1>Today</h1>
        <p className="greeting">{getGreeting()}</p>
        <div className="stamp" role="status" aria-live="polite">
          <span className="stamp-num">{remaining}</span>
          <span className="stamp-label">
            {remaining === 0 ? "All done" : "Remaining"}
          </span>
        </div>

        <nav className="filters" aria-label="Filter tasks">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </nav>

        <p className="date">
          {weekday}
          <br />
          {dayMonth}
        </p>
      </header>

      <section className="sheet">
        <TaskForm onAdd={addTask} />
        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </section>
    </main>
  );
}

export default App;