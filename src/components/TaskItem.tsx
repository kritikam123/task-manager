import { useState } from "react";
import type { Task } from "../types";

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

function TaskItem({task, onToggle, onDelete, onEdit} : TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleSave = () => {
        if(!editText.trim()) return;
        onEdit(task.id, editText.trim());
        setIsEditing(false);
    };
    return(
        <div>
            <li className={task.completed ? "completed" : ""}>
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />

                {isEditing ? (
                    <>
                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={()=> setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                    <span>{task.text}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(task.id)}>Delete</button>
                    </>
                )}

            </li>
        </div>
    );
}

export default TaskItem;
