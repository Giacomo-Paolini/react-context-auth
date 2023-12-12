import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(null);

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
