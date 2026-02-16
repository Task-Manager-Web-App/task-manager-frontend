import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

type Task = {
  id: string;
  title: string;
  description: string | null;
  user_id: string;
};

const TasksPage = ({ session }: any) => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("user");

  // edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Check Session User Details
  console.log("Current session in TasksPage:", session?.user || "No session found");


  // ======================== LOAD TASKS FUNCTION ========================
  const loadTasks = async () => {
    try {

      setLoading(true);

      // Fetch all tasks
      const res = await fetch(`${API_URL}/tasks`);
      
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
      
      // ==== 🧠 GET USER ROLE FROM PROFILE ROUTE
      if (session?.user) {

        const profileRes = await fetch(`${API_URL}/profile/${session.user.id}`);

        const profile = await profileRes.json();
        console.log("User profile data:", profile);
        console.log("User role from profile:", profile.role);

        setUserRole(profile.role?.toLowerCase() || "user");
      }
    } 
    catch (error) {
      console.error(error);
      alert("Cannot load tasks. Is backend running on http://localhost:3000 ?");
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [session]);


  // ======================== DELETE TASK BUTTON ========================
  const handleDelete = async (id: string) => {

    if (!session?.user) {
      alert("Please login first");
      return;
    }

    const ok = confirm("Are you sure you want to delete this task?");
    if (!ok) return;

    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: session.user.id, role: userRole }),
      });

      if (!res.ok) throw new Error("Failed to delete task");
      loadTasks();
    } 
    
    catch (error) {
      console.error(error);
      alert("Delete failed");
    }

  };



  // ======================== EDIT START 
  const handleEditStart = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
  };

  // ======================== EDIT CANCEL
  const handleEditCancel = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // ======================== EDIT BUTTON HANDLE ========================
  const handleEditSave = async (id: string) => {
    if (!session?.user) {
      alert("Please login first");
      return;
    }

    if (!editTitle.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.trim(),
          description: editDescription.trim() ? editDescription.trim() : null,
          user_id: session.user.id,
          role: userRole,
        }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      handleEditCancel();
      loadTasks();
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  // ======================== CHECK IF USER CAN EDIT/DELETE TASK ========================
  const canEdit = (task: Task) => {
    if (!session?.user) return false;
    return task.user_id === session.user.id || userRole === "admin";
  };

  if (loading) {
    return <p className="text-center mt-10">Loading tasks...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Tasks</h1>
            <p className="text-gray-500 text-sm">
              Manage your student project activities
            </p>
          </div>

          <a
            href="/add-task"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            + New Task
          </a>
        </div>

        {/* Task Cards */}
        <div className="space-y-4">
          {tasks.map((task) => {
            const isEditing = editingId === task.id;

            return (
              <div
                key={task.id}
                className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-start"
              >
                <div className="w-full pr-4">
                  {isEditing ? (
                    <>
                      <input
                        className="w-full border rounded-lg p-2 mb-2"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Task title"
                      />
                      <textarea
                        className="w-full border rounded-lg p-2"
                        rows={3}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Task description"
                      />
                    </>
                  ) : (
                    <>
                      <h2 className="font-semibold">{task.title}</h2>
                      <p className="text-gray-500 text-sm mt-1">
                        {task.description ?? "No description"}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  {canEdit(task) && (
                    <>
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleEditSave(task.id)}
                            className="border px-3 py-1 rounded-lg text-sm bg-green-300"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="border px-3 py-1 rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditStart(task)}
                            className="border px-3 py-1 rounded-lg text-sm"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="border border-red-400 text-red-500 px-3 py-1 rounded-lg text-sm"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Displaying {tasks.length} total tasks
        </p>
      </div>
    </div>
  );
};

export default TasksPage;