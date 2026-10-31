import { useState } from "react";
import Dropdown from "./Dropdown.jsx";
import { PRIORITY_OPTIONS } from "../constants.js";

// form to add or edit a task
function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [priority, setPriority] = useState(task ? task.priority : "medium");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");
  const [error, setError] = useState("");
  const now = new Date();
  const minDueDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  function handleSave() {
    if (title.trim() === "") {
      setError("Title is required");
      return;
    }
    if (title.trim().length > 60) {
      setError("Title must be under 60 characters");
      return;
    }
    if (dueDate && dueDate < minDueDate) {
      setError("Due date cannot be before today");
      return;
    }
    onSave({ title: title.trim(), description: description.trim(), priority, dueDate });
  }

  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{task ? "Edit Task" : "Add Task"}</h2>

        <label>
          Title
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            placeholder="Task title"
            autoFocus
          />
        </label>
        {error && <div className="error">{error}</div>}

        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional" />
        </label>

        <div className="mlabel">
          Priority
          <Dropdown value={priority} options={PRIORITY_OPTIONS} onChange={setPriority} />
        </div>

        <label>
          Due date
          <input type="date" min={minDueDate} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>

        <div className="modal-btns">
          <button onClick={onCancel}>Cancel</button>
          <button className="btn-new" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
