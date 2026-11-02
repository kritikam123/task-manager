import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS = {
  edit: "M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4",
  trash: "M5 7h14M10 11v6M14 11v6M6 7l1 12h10l1-12M9 7V4h6v3",
  check: "M5 12.5l4.5 4.5L19 7.5",
  close: "M6 6l12 12M18 6L6 18",
};

function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const startEdit = () => {
    setEditText(task.text);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const saveEdit = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit(task.id, trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <li className={`task ${task.completed ? "completed" : ""}`}>
      <label className="check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.text}" as complete`}
        />
        <span className="check-mark" />
      </label>

      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={80}
            aria-label="Edit task"
            autoFocus
          />
          <div className="actions always">
            <button
              className="save"
              onClick={saveEdit}
              disabled={!editText.trim()}
              aria-label="Save changes"
            >
              <Icon d={ICONS.check} />
            </button>
            <button onClick={cancelEdit} aria-label="Cancel editing">
              <Icon d={ICONS.close} />
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="task-text">{task.text}</span>
          <div className="actions">
            <button onClick={startEdit} aria-label={`Edit "${task.text}"`}>
              <Icon d={ICONS.edit} />
            </button>
            <button
              className="danger"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete "${task.text}"`}
            >
              <Icon d={ICONS.trash} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;