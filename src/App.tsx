import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import type { Task, Filter } from "./types";
import TaskList from "./components/TaskList";
import "./App.css";

const FILTERS: Filter[] = ["all", "active", "completed"];

function loadTasks() : Task[] {
  try{
    const saved = localStorage.getItem("tasks");
    return saved ? (JSON.parse(saved) as Task[]) : [];
  } catch{
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string): void => {
  const newTask: Task = {id: crypto.randomUUID(), text, completed: false};
  setTasks([...tasks, newTask]);
};

const toggleTask = (id: string): void => {
  setTasks(tasks.map((t) => (t.id === id ? {...t, completed: !t.completed} : t)));
}

const deleteTask = (id: string) : void => {
  setTasks(tasks.filter((t) => t.id !==id));
}

const editTask = (id: string, newText: string) : void => {
  setTasks(tasks.map((t) => (t.id === id ? {...t, text: newText} : t)));
}

const visibleTasks = tasks.filter((t) => {
  if(filter === "active") return !t.completed;
  if(filter === "completed") return t.completed;
  return true;
})
  return(
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />

      <div className="filters">
       {FILTERS.map((f) => (
        <button
        key={f}
        className={filter === f ? "actve" : ""}
        onClick={() => setFilter(f)}>
          {f}
        </button>
       ))}

      </div>

      <TaskList
      tasks={visibleTasks}
      onToggle={toggleTask}
      onDelete={deleteTask}
      onEdit={editTask} />

    </div>
  );
}

export default App;