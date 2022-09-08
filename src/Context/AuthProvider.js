import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

import React, { useEffect, createContext, useState } from "react";
import Spin from "../components/Spin";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        const { email } = user;
        setUser({
          email,
        });
        setloading(false);
        navigate("/");
      }else{
        setloading(false)
        navigate('/login')
      }
    });
    return () => {
      unsub();
    };
  }, [navigate]);
  return (
    <AuthContext.Provider value={user}>
      {loading ? (
        <Spin/>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
