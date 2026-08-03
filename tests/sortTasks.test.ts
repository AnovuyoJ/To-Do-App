import { describe, it, expect } from "vitest";
import { sortTasks, Task } from "../lib/sortTasks";

const sampleTasks: Task[] = [
  { id: 1, title: "B task", description: null, due_date: "2026-06-01", topic: "Zebra", status: "Complete", archived: 0, created_at: "" },
  { id: 2, title: "A task", description: null, due_date: "2026-01-01", topic: "Apple", status: "Todo", archived: 0, created_at: "" },
  { id: 3, title: "C task", description: null, due_date: "2026-03-01", topic: "Mango", status: "In-Progress", archived: 0, created_at: "" },
];

describe("sortTasks", () => {
  it("sorts by due date, earliest first", () => {
    const sorted = sortTasks(sampleTasks, "due_date");
    expect(sorted.map((t) => t.id)).toEqual([2, 3, 1]);
  });

  it("sorts by topic alphabetically", () => {
    const sorted = sortTasks(sampleTasks, "topic");
    expect(sorted.map((t) => t.topic)).toEqual(["Apple", "Mango", "Zebra"]);
  });

  it("sorts by status in workflow order (Todo, In-Progress, Complete)", () => {
    const sorted = sortTasks(sampleTasks, "status");
    expect(sorted.map((t) => t.status)).toEqual(["Todo", "In-Progress", "Complete"]);
  });
});