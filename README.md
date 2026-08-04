# To-Do App

A basic to-do list app for your tasks.

## Features
- Create, edit, and archive tasks.
- Each task has a Title, Description, Due Date, and Topic
- Three fixed statuses: ToDo, In-Progress, and Complete.
- Overdue tasks are visually flagged. 
- View tasks as a list, sortable by Topic, Status, or Due Date.
- View archived tasks separately, with the option to unarchive.


## Project Structure
```
to-do-app/
├── app/
│   ├── page.tsx                 # Main page: fetches, sorts, and displays tasks
│   ├── layout.tsx               # Root layout shared across all pages
│   ├── globals.css              # Global styles (Tailwind)
│   ├── components/
│   │   ├── TaskForm.tsx         # Form for creating new tasks
│   │   └── TaskCard.tsx         # Displays a single task, with edit/archive controls
│   └── api/
│       └── tasks/
│           ├── route.ts         # GET (list tasks) and POST (create task)
│           └── [id]/
│               └── route.ts     # PATCH (edit / archive / unarchive a task)
├── lib/
│   ├── db.ts                    # SQLite connection and schema setup
│   └── sortTasks.ts             # Shared sorting logic and Task type
├── tests/
│   ├── tasks.test.ts            # Tests for the task creation/validation/archiving API
│   └── sortTasks.test.ts        # Tests for sorting logic
├── data/
│   └── todos.db                 # SQLite database file (created automatically, gitignored)
└── README.md

```
