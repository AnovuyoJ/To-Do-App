"use client";

import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

type Task = {
  id: number;
  title: string;
  description: string | null;
  due_date: string;
  topic: string;
  status: string;
  archived: number;
  created_at: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  function loadTasks() {
    fetch(`/api/tasks?archived=${showArchived}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }

  useEffect(() => {
    loadTasks();
  }, [showArchived]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Tasks</h1>

      {!showArchived && <TaskForm onTaskCreated={loadTasks} />}
      {tasks.length === 0 ? (
        <p>No tasks yet , add one above to get started.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onArchive={loadTasks} isArchivedView={showArchived} />
        ))
      )}
      <button onClick={() => setShowArchived(!showArchived)} style={{ marginBottom: "1rem" }}>
        {showArchived ? "Show Active Tasks" : "Show Archived Tasks"}
      </button>
    </div>
  );
}