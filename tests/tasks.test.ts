import { describe, it, expect, beforeEach } from "vitest";
import fs from "node:fs";
import path from "node:path";

const TEST_DB_PATH = path.resolve(__dirname, "test.db");
if (fs.existsSync(TEST_DB_PATH)) fs.unlinkSync(TEST_DB_PATH);
process.env.DB_PATH = TEST_DB_PATH;

const { GET, POST } = await import("../app/api/tasks/route");
const { PATCH } = await import("../app/api/tasks/[id]/route");
const db = (await import("../lib/db")).default;

beforeEach(() => {
  db.exec("DELETE FROM tasks");
});

describe("POST /api/tasks", () => {
  it("creates a task and it appears in GET /api/tasks", async () => {
    const req = new Request("http://localhost/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Finish assignment",
        due_date: "2026-12-01",
        topic: "Uni",
      }),
    });

    const postRes = await POST(req);
    expect(postRes.status).toBe(200);

    const getRes = await GET(new Request("http://localhost/api/tasks?archived=false"));
    const tasks = await getRes.json();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Finish assignment");
    expect(tasks[0].status).toBe("Todo"); // confirms DEFAULT works
  });

  it("rejects a task with no title", async () => {
    const req = new Request("http://localhost/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        due_date: "2026-12-01",
        topic: "Uni",
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Title is required");
  });
});

describe("PATCH /api/tasks/[id]", () => {
  it("archives a task so it no longer appears in the active list", async () => {
    const postReq = new Request("http://localhost/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Old task",
        due_date: "2026-01-01",
        topic: "Personal",
      }),
    });
    const postRes = await POST(postReq);
    const created = await postRes.json();

    const patchReq = new Request(`http://localhost/api/tasks/${created.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived: true }),
    });
    await PATCH(patchReq, { params: Promise.resolve({ id: String(created.id) }) });

    const activeRes = await GET(new Request("http://localhost/api/tasks?archived=false"));
    const activeTasks = await activeRes.json();

    const archivedRes = await GET(new Request("http://localhost/api/tasks?archived=true"));
    const archivedTasks = await archivedRes.json();

    expect(activeTasks).toHaveLength(0);
    expect(archivedTasks).toHaveLength(1);
    expect(archivedTasks[0].title).toBe("Old task");
  });
});