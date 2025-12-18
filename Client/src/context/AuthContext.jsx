import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://api-surotaste.infinitelearningstudent.id/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
        else localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  const register = async (name, email, password) => {
    const res = await fetch("https://api-surotaste.infinitelearningstudent.id/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    return res.json();
  };

  const login = async (email, password) => {
    const res = await fetch("https://api-surotaste.infinitelearningstudent.id/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    return res.json();
  };

  // ➜ NEW FUNCTION to update global user state
  const updateUserProfile = (updatedFields) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
