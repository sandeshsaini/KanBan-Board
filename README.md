# Kanban Board

A responsive Kanban board to manage tasks across **To Do**, **In Progress** and **Done** columns. Built with **React + Vite**.

## Demo

[![Kanban Board Demo](https://img.youtube.com/vi/hqDl9tLjTJg/maxresdefault.jpg)](https://youtu.be/hqDl9tLjTJg)

Click the image to watch the demo video.

## Features

- Add tasks with title, description, priority and due date
- Edit and delete tasks
- Move tasks between To Do, In Progress and Done
- Search tasks by title
- Filter by priority and status
- Data saved in LocalStorage, so tasks stay after a page refresh
- Dark / light theme toggle (theme is also saved)
- Responsive layout for desktop and mobile
- Empty state, no-results state and basic form validation

## Tech Stack

- React 18
- Vite
- HTML5
- CSS3
- LocalStorage

## Project Structure

```
kanban-board/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── constants.js
    ├── index.css
    └── components/
        ├── Navbar.jsx
        ├── Dropdown.jsx
        ├── TaskCard.jsx
        └── TaskForm.jsx
```

## Getting Started

Make sure Node.js is installed, then run:

```bash
# install dependencies
npm install

# start the development server
npm run dev
```

Open the local link shown in the terminal (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## How It Works

- `App.jsx` holds the main state (tasks, search, filters, theme) and the board layout.
- `Navbar.jsx` has the title, search box, theme toggle and "Add Task" button.
- `TaskForm.jsx` is the add/edit popup with validation (the title is required).
- `TaskCard.jsx` shows one task with its priority tag, due date and actions.
- `Dropdown.jsx` is a reusable custom dropdown used in the filters, the form and the cards.
- Tasks and theme are stored in LocalStorage.

## Validation

- The title is required.
- The title must be under 60 characters.
