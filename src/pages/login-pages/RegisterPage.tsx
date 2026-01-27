import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("Registration successful!");
    console.log(data);

  } catch (error) {
    alert("Cannot connect to server");
    console.error(error);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8">
        <h2 className="text-4xl font-bold text-center">Create Account</h2>
        <p className="text-center text-gray-600 mb-6">Join our student developer community</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 border border-gray-300 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 border border-gray-300 rounded-lg"
            required
          />

          <select
            //value={role}
            //onChange={(e) => setRole(e.target.value)}
            className="w-full py-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="w-full py-3 bg-sky-600  text-white rounded-lg">
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-sky-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}