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

export default function TaskCard({task,onArchive,isArchivedView }: { task: Task; onArchive: () => void; isArchivedView: boolean }) {
    const isOverdue = new Date(task.due_date) < new Date() && task.status !== "Complete" ;

    async function handleToggleArchive() {
        await fetch(`/api/tasks/${task.id}`, {
            method: "PATCH",
            headers: {  
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ archived: isArchivedView ? 0 : 1 }),
        });
        onArchive();
    }

    return (
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", marginBottom: "0.5rem" }}>
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <p>Topic: {task.topic}</p>
            <p>Due: {task.due_date} {isOverdue && <strong style={{ color: "red" }}>(Overdue)</strong>}</p>
            <p>Status: {task.status}</p>
            <button
                onClick={handleToggleArchive}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                {isArchivedView ? "Unarchive" : "Archive"}
            </button>
        </div>
    );
}
