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

  function loadTasks() {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Tasks</h1>
      <TaskForm onTaskCreated={loadTasks} />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}