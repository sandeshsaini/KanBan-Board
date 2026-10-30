import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Dropdown from "./components/Dropdown.jsx";
import TaskCard from "./components/TaskCard.jsx";
import TaskForm from "./components/TaskForm.jsx";
import { COLUMNS, STATUS_OPTIONS, PRIORITY_OPTIONS } from "./constants.js";

// read tasks from localStorage
function loadTasks() {
  try {
    const data = localStorage.getItem("kanban-tasks");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("kanban-theme") || "dark";
    } catch (e) {
      return "dark";
    }
  });

  // apply + remember theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("kanban-theme", theme);
    } catch (e) {}
  }, [theme]);

  // save tasks whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  function saveTask(data) {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...t, ...data } : t)));
    } else {
      setTasks([...tasks, { id: Date.now(), status: "todo", ...data }]);
    }
    closeForm();
  }

  function deleteTask(id) {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  }

  function moveTask(id, status) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  function openEdit(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingTask(null);
  }

  // apply search + filters
  const filtered = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchPriority && matchStatus;
  });

  const isFiltering = search !== "" || priorityFilter !== "all" || statusFilter !== "all";
  const visibleColumns = COLUMNS.filter((c) => statusFilter === "all" || c.id === statusFilter);

  return (
    <div className="layout">
      <div className="main">
        <Navbar
          search={search}
          setSearch={setSearch}
          theme={theme}
          setTheme={setTheme}
          onAdd={() => setShowForm(true)}
        />

        <div className="content">
          <div className="filters">
            <div className="field">
              Priority
              <Dropdown
                value={priorityFilter}
                options={[{ value: "all", label: "All priority types" }, ...PRIORITY_OPTIONS]}
                onChange={setPriorityFilter}
              />
            </div>
            <div className="field">
              Status
              <Dropdown
                value={statusFilter}
                options={[{ value: "all", label: "All status" }, ...STATUS_OPTIONS]}
                onChange={setStatusFilter}
              />
            </div>
          </div>

          {isFiltering && filtered.length === 0 ? (
            <div className="no-results">No tasks match your search or filters.</div>
          ) : (
            <div className="board">
              {visibleColumns.map((col) => {
                const colTasks = filtered.filter((t) => t.status === col.id);
                return (
                  <div key={col.id}>
                    <div className="col-head">
                      {col.name} <span className="count">{colTasks.length}</span>
                    </div>

                    {colTasks.length === 0 ? (
                      <div className="empty">No tasks here yet</div>
                    ) : (
                      colTasks.map((t) => (
                        <TaskCard key={t.id} task={t} onEdit={openEdit} onDelete={deleteTask} onMove={moveTask} />
                      ))
                    )}

                    {col.id === "todo" && (
                      <button className="add-link" onClick={() => setShowForm(true)}>+ ADD TASK</button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showForm && <TaskForm task={editingTask} onSave={saveTask} onCancel={closeForm} />}
    </div>
  );
}

export default App;
