import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabase-client";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use Supabase client directly for registration
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role }
        }
      });

      if (error) {
        alert(error.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please check your email for confirmation.");
      
      // If session is available (email confirmation disabled), set it
      if (data.session) {
        setSession(data.session);
        navigate("/");
      } else {
        // Otherwise, redirect to login
        navigate("/login");
      }
    } catch (error) {
      alert("Cannot connect to server");
      console.error(error);
    } finally {
      setLoading(false);
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
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full py-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button 
            type="submit" 
            className="w-full py-3 bg-sky-600 text-white rounded-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-sky-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}