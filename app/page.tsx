"use client";

import { useState, useEffect } from "react";
import db from "../lib/db";
import TaskCard from "./components/TaskCard";

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

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div style = {{ padding: "2rem"}}>
      <h1>My Tasks</h1>
      {tasks.map((task) => (
      <TaskCard key = {task.id} task={task}/>
      ))}
    </div>
  );
}