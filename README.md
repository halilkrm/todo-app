<div align="center">

# ✅ Todo App

A task-management application built with **React** and **Vite**.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=black)

</div>

---

## Overview

The current source stores tasks in browser `localStorage` and implements task creation, editing, completion toggling, deletion, filtering, priority selection, and completed-task cleanup.

---

## Implemented Features

- Add task
- Edit task
- Toggle completed / active state
- Delete task
- Delete all completed tasks
- Filter:
  - all
  - active
  - completed
- Counts for all / active / completed tasks
- Completion percentage
- Local persistence with `localStorage`
- Task title
- Task description
- Priority:
  - low
  - medium
  - high
- Deadline date input in the form
- Minimum selectable deadline set to the current date

---

## Local Storage

Storage key used by the current code:

```text
todo-app-items
```

Tasks are loaded with:

```js
localStorage.getItem(STORAGE_KEY)
```

and saved with:

```js
localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
```

---

## Current Task Flow

```text
Load localStorage
   ↓
React state
   ↓
Add / update / toggle / delete
   ↓
Save updated array to localStorage
```

---

## Filtering

The current filter values are:

```text
all
active
completed
```

The code uses `useMemo` to derive filtered tasks and counts.

---

## Deadline Behavior in the Current Source

The form includes a date input and prevents selecting a date before today through:

```html
min={today}
```

However, there is an implementation mismatch in the current add flow:

- `TodoForm` submits `deadline`
- `handleAdd` does not pass `deadline` to `createTodo`
- `createTodo` does not define a `deadline` field
- `handleUpdate` does write `deadline` while editing

Therefore, the current code does **not** persist a newly entered deadline when a new task is created. The edit flow can add/update a `deadline` field later.

---

## Main Source Structure

```text
src/
├── components/
│   ├── FilterBar.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   └── TodoList.jsx
├── interfaces/
│   └── Todo.js
├── pages/
│   └── TodoPage.jsx
├── App.jsx
├── index.css
└── main.jsx
```

---

## Tech Stack Confirmed by `package.json`

Runtime dependencies include:

```text
react
react-dom
```

Development tooling includes:

```text
vite
eslint
@vitejs/plugin-react
tailwindcss
postcss
autoprefixer
```

---

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

## Getting Started

```bash
git clone https://github.com/halilkrm/todo-app.git
cd todo-app
npm install
npm run dev
```

---

## Current Repository Notes

The repository currently tracks generated or machine-specific items including:

```text
node_modules/
dist/
.DS_Store
```

These are repository-state observations, not application features.

---

## License

This repository contains an MIT License.
