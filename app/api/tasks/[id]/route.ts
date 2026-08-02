import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();

  if (data.archived !== undefined) {
    db.prepare("UPDATE tasks SET archived = ? WHERE id = ?").run(
      data.archived ? 1 : 0,
      id
    );
  }

  const updatedTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  return NextResponse.json(updatedTask);
}