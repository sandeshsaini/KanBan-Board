export const COLUMNS = [
  { id: "todo", name: "To Do" },
  { id: "progress", name: "In Progress" },
  { id: "done", name: "Done" },
];

export const STATUS_OPTIONS = COLUMNS.map((c) => ({ value: c.id, label: c.name }));

export const PRIORITY_OPTIONS = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];
