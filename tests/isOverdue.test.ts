import { describe, it, expect } from "vitest";
import { isOverdue, Task } from "../lib/sortTasks";

const fixedNow = new Date("2026-08-01T00:00:00");

const baseTask: Task = {
  id: 1,
  title: "Sample",
  description: null,
  due_date: "2026-01-01",
  topic: "Test",
  status: "Todo",
  archived: 0,
  created_at: "",
};

describe("isOverdue", () => {
  it("returns true when due_date is in the past and status is not Complete", () => {
    expect(isOverdue(baseTask, fixedNow)).toBe(true);
  });

  it("returns false when due_date is in the future", () => {
    const futureTask = { ...baseTask, due_date: "2027-01-01" };
    expect(isOverdue(futureTask, fixedNow)).toBe(false);
  });

  it("returns false when the task is already Complete, even if overdue", () => {
    const completedTask = { ...baseTask, status: "Complete" };
    expect(isOverdue(completedTask, fixedNow)).toBe(false);
  });
});
