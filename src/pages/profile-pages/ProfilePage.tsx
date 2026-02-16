import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ session }: any) {

  
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("Doe");
  const [role, setRole] = useState("User");
  const [email, setEmail] = useState("jane.doe@example.com");

  // Check Session User Details
  console.log("Current session in ProfilePage:", session?.user || "No session found");


  // keep a copy so Cancel can restore the last loaded state
  const [initial, setInitial] = useState({
    firstName: "Jane",
    lastName: "Doe",
    role: "User",
    email: "jane.doe@example.com",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ======================== CANCEL BUTTON HANDLER ========================
  const handleCancel = () => {

    console.log("Canceling changes, reverting to last loaded state:", initial);

    setFirstName(initial.firstName);
    setLastName(initial.lastName);
    setRole(initial.role);
    setEmail(initial.email);
    setError(null);
  };

  // ======================== LOAD PROFILE ON MOUNT ========================
  useEffect(() => {

    const loadProfile = async () => {
      setError(null);
      
      if (!session?.user) {
        setError("Please login first.");
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/profile/${session.user.id}`);
        const data = await res.json().catch(() => ({}));
        console.log("Profile data fetched from backend:", data);
        // Output example: { first_name: "Ryan", last_name: "Wick", role: "User" }

        if (!res.ok) {
          setError(data?.message || "Failed to load profile.");
          return;
        }

        // Update state with fetched profile data
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setRole(data.role || "User");
        setEmail(session.user.email || "");

        setInitial({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          role: data.role || "User",
          email: session.user.email || "",
        });
        
      } catch (e: any) {
        setError(e?.message || "Server error. Is backend running?");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [session, navigate]);


  // ======================== SAVE BUTTON HANDLER ========================
  const handleSave = async () => {
    setError(null);
    
    if (!session?.user) {
      setError("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(`http://localhost:3000/profile/${session.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          role: role,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.message || "Failed to update profile.");
        return;
      }

      // update initial snapshot so Cancel goes back to latest saved version
      setInitial({
        firstName,
        lastName,
        role,
        email,
      });

      alert("Profile updated!");
    } catch (e: any) {
      setError(e?.message || "Server error. Is backend running?");
    } finally {
      setSaving(false);
    }
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
            <span className="font-medium">{email || "-"}</span>
          </p>
          <p className="mt-1">
            Current Role: <span className="font-medium">{role}</span>
          </p>

          {loading && <p className="mt-2 text-gray-500">Loading...</p>}
          {error && <p className="mt-2 text-red-600">{error}</p>}
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
              disabled={loading || saving}
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
              disabled={loading || saving}
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
              disabled={loading || saving}
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
              className="text-sm hover:text-gray-700 disabled:opacity-60 bg-red-400 text-white px-5 py-2 rounded-md"
              disabled={loading || saving}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
              disabled={loading || saving}
            >
              {saving ? "Saving..." : "Save Changes"}
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
