import { useState, useId } from "react";
import type { FormEvent } from "react";

interface TaskFormProps {
  onAdd: (text: string) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState("");
  const inputId = useId(); // unique id so the label and input are linked

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  const isEmpty = text.trim() === "";

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor={inputId}>
        New task
      </label>

      <div className="field">
        <input
          id={inputId}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What would you like to do?"
          maxLength={80}
          autoComplete="off"
        />
        <button type="submit" disabled={isEmpty} aria-label="Add task">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span>Add</span>
        </button>
      </div>
    </form>
  );
}

export default TaskForm;