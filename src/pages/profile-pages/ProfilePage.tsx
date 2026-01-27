import { useState } from "react";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [role, setRole] = useState("User");

  const handleCancel = () => {
    setFirstName("Jane");
    setLastName("Doe");
    setRole("User");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-16">
      <div className="w-full max-w-xl px-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>

        {/* Info */}
        <div className="mt-3 text-sm text-gray-600">
          <p>
            Current Email:{" "}
            <span className="font-medium">jane.doe@example.com</span>
          </p>
          <p className="mt-1">
            Current Role: <span className="font-medium">User</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="mt-6 rounded-lg border bg-white p-6">
          {/* First Name */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500">
              FIRST NAME
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-2 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Last Name */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500">
              LAST NAME
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-2 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500">
              YOUR ROLE
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
            >
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between border-t pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => alert("Save clicked (UI only)")}
              className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Info box */}
        <div className="mt-5 flex items-start gap-3 rounded-md border bg-emerald-50 p-4 text-sm text-gray-600">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
            i
          </div>
          <p>
            Updating your name will reflect on all tasks assigned to you across
            the project dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
