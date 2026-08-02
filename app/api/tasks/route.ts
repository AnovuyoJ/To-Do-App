
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const showArchived = searchParams.get("archived") === "true";

    const stmt = db.prepare("SELECT * FROM tasks WHERE archived = ?");
    const tasks = stmt.all(showArchived ? 1 : 0);
    return NextResponse.json(tasks);
}

export async function POST(request: Request) {
    const data = await request.json();

    if(!data.title){
        return NextResponse.json({error: "Title is required"}, {status: 400});
    }
    if(!data.topic){
        return NextResponse.json({error: "Topic is required"}, {status: 400});
    }

    if(!data.due_date){
        return NextResponse.json({error: "Due date is required"}, {status: 400});
    }

    const stmt = db.prepare("INSERT INTO tasks (title, description, due_date, topic) VALUES (?, ?, ?, ?)");
    const result = stmt.run(data.title, data.description ?? null, data.due_date, data.topic);
    return NextResponse.json({ message: "Task created successfully", id: result.lastInsertRowid });
}
