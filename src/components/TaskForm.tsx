import { useState } from "react";
import type {FormEvent} from "react";

interface TaskFormProps {
    onAdd: (text: string) => void;
}

function TaskForm({onAdd} : TaskFormProps) {
    const [text, setText] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!text.trim()) return;
        onAdd(text.trim());
        setText("");

    };
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} placeholder="Add a new task" onChange={(e) => setText(e.target.value)} aria-label="New task"/>
            <button type="submit">Add</button>
        </form>

    );
}

export default TaskForm;