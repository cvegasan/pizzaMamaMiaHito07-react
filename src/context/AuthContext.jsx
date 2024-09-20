import React, { createContext,useState } from 'react';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(true);   // Inicializacion para token

  // Método logout para cambiar el estado de token a false
  const logout = () => {
    setToken(false);
    console.log(token);
  };

  return (
    <AuthContext.Provider value={{ token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
