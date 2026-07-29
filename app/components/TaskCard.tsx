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

export default function TaskCard({ task }: { task: Task }) {
    const isOverdue = new Date(task.due_date) < new Date() && task.status !== "Complete" ;

    return (
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", marginBottom: "0.5rem" }}>
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <p>Topic: {task.topic}</p>
            <p>Due: {task.due_date} {isOverdue && <strong style={{ color: "red" }}>(Overdue)</strong>}</p>
            <p>Status: {task.status}</p>
        </div>
    );
}
