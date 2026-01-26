import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-0">
        <h1 className="text-4xl font-bold text-center">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-6">Please enter your credentials to login</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 border border-gray-300 rounded-lg "
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 border border-gray-300 rounded-lg "
            required
          />

          <button type="submit" className="w-full py-3 bg-sky-600  text-white py-2 rounded-lg">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-sky-600 ">Register</Link>
        </p>
      </div>
    </div>
  );
}
