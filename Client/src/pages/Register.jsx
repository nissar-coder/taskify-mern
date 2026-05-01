import { useState } from "react";
import { userAuth } from "../Context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { registerUser } = userAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-3xl font-semibold mb-2 text-center text-gray-900 tracking-tight">
          Create account
        </h2>
     

        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium shadow-sm transition hover:bg-green-700 active:scale-[0.98]"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;

