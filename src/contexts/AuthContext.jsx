import { createContext, useState, useEffect } from "react";
import { login as loginUser } from "../services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);     

  const login = async (formData) => {
    try {
      setLoading(true);

      const data = await loginUser(formData);

      const token = data.usuario.token;
      const userData = data.usuario.usuario;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(token);
      setUser(userData);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};