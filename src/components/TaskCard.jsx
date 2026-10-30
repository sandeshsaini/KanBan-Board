import Dropdown from "./Dropdown.jsx";
import { STATUS_OPTIONS } from "../constants.js";

// one task card
function TaskCard({ task, onEdit, onDelete, onMove }) {
  const today = new Date().toISOString().slice(0, 10);
  const isOverdue = task.dueDate && task.dueDate < today && task.status !== "done";

  return (
    <div className="task">
      <span className={"tag " + task.priority}>{task.priority}</span>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      {task.dueDate && <div className={"due " + (isOverdue ? "overdue" : "")}>Due {task.dueDate}</div>}

      <div className="actions">
        <Dropdown value={task.status} options={STATUS_OPTIONS} onChange={(v) => onMove(task.id, v)} />
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
