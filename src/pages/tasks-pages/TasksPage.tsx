const TasksPage = () => {
  const tasks = [
    {
      id: 1,
      title: "Finish UI Design for Dashboard",
      description:
        "Create the high-fidelity mockups for the main dashboard including the navigation and task components.",
    },
    {
      id: 2,
      title: "Set up Database Schema",
      description:
        "Design the relational database structure for users, tasks, and project categories.",
    },
    {
      id: 3,
      title: "Write API Documentation",
      description:
        "Document all the endpoints for the task management system including request and response formats.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        {/* Page Title */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Tasks</h1>
            <p className="text-gray-500 text-sm">
              Manage your student project activities
            </p>
          </div>

          {/* New Task Button */}
          <a
            href="/add-task"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            + New Task
          </a>
        </div>

        {/* Task Cards */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-start"
            >
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  {task.description}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="border px-3 py-1 rounded-lg text-sm">
                  Update
                </button>
                <button className="border border-red-400 text-red-500 px-3 py-1 rounded-lg text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Displaying {tasks.length} total tasks
        </p>
      </div>
    </div>
  );
};

export default TasksPage;
