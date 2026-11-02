import type {Task} from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

function TaskList({tasks, onToggle, onDelete, onEdit}: TaskListProps) {
    if(tasks.length === 0) {
        return <p className="empty"> No task here. Add one above please!</p>
    }
    return(
        <div>
            <ul>
                {tasks.map((task) => (
                    <TaskItem 
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit} />
                ))}
            </ul>
        </div>
    );

}

export default TaskList;
