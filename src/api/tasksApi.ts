const API_URL = "http://localhost:3000";

export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function deleteTask(id: string) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete task");

  return res.json();
}

export async function updateTask(
  id: string,
  task: { title: string; description: string | null }
) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

