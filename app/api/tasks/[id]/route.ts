import { NextResponse } from "next/server";
import db from "@/lib/db";

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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();

  const existing = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task | undefined;
  if (!existing) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const stmt = db.prepare(`
    UPDATE tasks
    SET
      title = ?,
      description = ?,
      due_date = ?,
      topic = ?,
      status = ?,
      archived = ?
    WHERE id = ?
  `);

  stmt.run(
    data.title ?? existing.title,
    data.description !== undefined ? data.description : existing.description,
    data.due_date ?? existing.due_date,
    data.topic ?? existing.topic,
    data.status ?? existing.status,
    data.archived !== undefined ? (data.archived ? 1 : 0) : existing.archived,
    id
  );


  const updatedTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  return NextResponse.json(updatedTask);
}