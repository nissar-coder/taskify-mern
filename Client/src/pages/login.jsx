import { useState } from "react";
import { userAuth } from "../Context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { loginUser } = userAuth();  
  const navigate = useNavigate();    

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await loginUser({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-3xl font-semibold mb-2 text-center text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
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
              className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={(e)=> setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium shadow-sm transition
            ${loading 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-blue-700 active:scale-[0.98]'}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};  

export default Login;

