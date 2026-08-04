
export type Task = {
  id: number;
  title: string;
  description: string | null;
  due_date: string;
  topic: string;
  status: string;
  archived: number;
  created_at: string;
};

export function isOverdue(task: Task, now: Date = new Date()): boolean {
  return new Date(task.due_date) < now && task.status !== "Complete";
}

export function sortTasks(tasks: Task[], sortBy: "topic" | "status" | "due_date"): Task[] {
  const statusOrder = { "Todo": 0, "In-Progress": 1, "Complete": 2 };

  return [...tasks].sort((a, b) => {
    if (sortBy === "topic") {
      return a.topic.localeCompare(b.topic);
    }
    if (sortBy === "status") {
      return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
    }
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });
}
