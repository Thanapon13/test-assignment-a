// src/contexts/AuthContext.js
"use client";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  getCookie,
  removeAccessToken,
  setAccessToken,
} from "../utils/cookie-utils";
import { redirect } from "next/navigation";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authenticateUser, setAuthenticateUser] = useState(null);

  useEffect(() => {
    const token = getCookie("ACCESS_TOKEN");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuthenticateUser(decoded);
      } catch {
        removeAccessToken();
      }
    }
  }, []);

  const login = token => {
    setAccessToken(token);
    setAuthenticateUser(jwtDecode(token));
  };

  const logout = () => {
    removeAccessToken();
    setAuthenticateUser(null);
    redirect("/admin");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
