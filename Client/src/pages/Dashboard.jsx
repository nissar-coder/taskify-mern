import { useState, useEffect } from "react";
import { userAuth } from "../Context/AuthContext";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, logout } = userAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchTasks();
  }, [user, navigate]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTask({ title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch {
      setError("Failed to create task");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      fetchTasks();
    } catch {
      setError("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(id);
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
        <p className="text-lg sm:text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">

   
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 mb-6 sticky top-0 z-10">
        <div className="max-w-5xl xl:max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Taskify
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-gray-500 text-sm sm:text-base">
              {user?.email}
            </span>

            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg transition shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

    
      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

    
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

       
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Add New Task
          </h2>

          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Task title..."
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-3 mb-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Description (optional)"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-3 mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />

            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm"
            >
              Add Task
            </button>
          </form>
        </div>

  
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            My Tasks
          </h2>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 text-center text-gray-500">
              No tasks yet. Start organizing your work 🚀
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                    className="mt-1 w-4 h-4 accent-blue-600"
                  />

                  <div className="flex-1">
                    <h3
                      className={`break-words ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "font-medium"
                      }`}
                    >
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="text-sm text-gray-500 mt-1 break-words">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;