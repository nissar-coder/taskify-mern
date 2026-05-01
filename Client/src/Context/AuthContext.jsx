import { createContext, useContext, useState } from "react";
import { login, register } from "../services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(() => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user in localStorage");
    return null;
  }
});

  const loginUser = async (data) => {
    const response = await login(data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    setUser(response.data.user);
  };

  const registerUser = async (data) => {
    await register(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const userAuth = () => useContext(AuthContext)

