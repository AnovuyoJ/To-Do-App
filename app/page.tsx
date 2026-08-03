"use client";

import { useEffect, useState } from "react";
import { sortTasks ,Task} from "@/lib/sortTasks";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [sortBy, setSortBy] = useState<"topic" | "status" | "due_date">("due_date");

  
  function loadTasks() {
    fetch(`/api/tasks?archived=${showArchived}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }

  useEffect(() => {
    loadTasks();
  }, [showArchived]);

  const sortedTasks = sortTasks(tasks, sortBy);

  return (
    <div style={{ padding: "2rem", color: "#090101", fontFamily: "Lucida Console" }}>
      <h1>My Tasks</h1>

      <div style={{ marginBottom: "1rem", textAlign: "right" }}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "topic" | "status" | "due_date")}>
          <option value="due_date">Due Date</option>
          <option value="topic">Topic</option>
          <option value="status">Status</option>
        </select>
      </div>

      {!showArchived && <TaskForm onTaskCreated={loadTasks} />}
      {sortedTasks.length === 0 ? (
        <p>No tasks yet , add one above to get started.</p>
      ) : (
        sortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} onArchive={loadTasks} isArchivedView={showArchived} />
        ))
      )}
      <button onClick={() => setShowArchived(!showArchived)} style={{ marginBottom: "1rem" }} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
        {showArchived ? "Show Active Tasks" : "Show Archived Tasks"}
      </button>

    </div>
  );
}