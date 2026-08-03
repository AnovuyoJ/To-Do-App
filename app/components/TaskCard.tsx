"use client";

import { useState } from "react";
import { Task } from "@/lib/sortTasks";

export default function TaskCard({
  task,
  onArchive,
  isArchivedView,
}: {
  task: Task;
  onArchive: () => void;
  isArchivedView: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [dueDate, setDueDate] = useState(task.due_date);
  const [topic, setTopic] = useState(task.topic);
  const [status, setStatus] = useState(task.status);

  const isOverdue = new Date(task.due_date) < new Date() && task.status !== "Complete";

  async function handleToggleArchive() {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived: isArchivedView ? 0 : 1 }),
    });
    onArchive();
  }

  async function handleSaveEdit() {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: description || null,
        due_date: dueDate,
        topic,
        status,
      }),
    });
    setIsEditing(false);
    onArchive(); // reuse this to trigger a refresh of the list
  }

  if (isEditing) {
    return (
      <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", marginBottom: "0.5rem" }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic" />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Todo">Todo</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Complete">Complete</option>
        </select>
        <div justify-content="space-between" style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
          <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <div style={{ border: "5px solid #ccc", borderRadius: "8px", padding: "1rem", marginBottom: "0.5rem" }}>
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <p>Topic: {task.topic}</p>
        <p>Due: {task.due_date} {isOverdue && <strong style={{ color: "red" }}>(Overdue)</strong>}</p>
        <p>Status: {task.status}</p>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
        {!isArchivedView && <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          Edit
        </button>}
        <button onClick={handleToggleArchive} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          {isArchivedView ? "Unarchive" : "Archive"}
        </button>
        </div>
    </div>
    );
}