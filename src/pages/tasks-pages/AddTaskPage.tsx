import { useState } from "react";

export default function AddTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setError(null);
  };

  const handleSave = async () => {
    setError(null);

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.message || "Failed to save task.");
        return;
      }

      alert("Task saved! Check Supabase → Table Editor → tasks");
      setTitle("");
      setDescription("");
    } catch (e: any) {
      setError(e?.message || "Server error. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-16">
      <div className="w-full max-w-3xl px-4">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800">Add Task</h1>
        <p className="mt-2 text-gray-500">
          Create a new item for your to-do list.
        </p>

        {/* Card */}
        <div className="mt-6 rounded-lg border bg-white">
          {/* Task Title section */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-2 text-gray-800 font-semibold">
              <span className="text-emerald-600">✎</span>
              <span>Task Title</span>
            </div>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title (e.g., Study for History Midterm)..."
              className="mt-3 w-full rounded-md border px-4 py-3 text-sm focus:outline-none focus:border-emerald-600"
              disabled={loading}
            />
          </div>

          {/* Description section */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-2 text-gray-800 font-semibold">
              <span className="text-emerald-600">≡</span>
              <span>Description</span>
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more details about this task. Include links, requirements, or sub-tasks..."
              className="mt-3 w-full min-h-[180px] resize-none rounded-md border px-4 py-3 text-sm focus:outline-none focus:border-emerald-600"
              disabled={loading}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="px-6 pt-4 text-sm text-red-600">{error}</div>
          )}

          {/* Footer buttons */}
          <div className="p-6 flex items-center justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-emerald-600 px-8 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
