// import React, { createContext, useContext, useState } from "react";

// // Create Context
// const AuthContext = createContext(undefined);

// // Provider Component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Manage user state

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to use AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context


// import React, { createContext, useContext, useState, useEffect } from "react";

// // Create Context
// const AuthContext = createContext(undefined);

// // Provider Component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Load user from local storage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("taxUser");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Login Function
//   const login = (userData, token) => {
//     localStorage.setItem("taxToken", token);
//     localStorage.setItem("taxUser", JSON.stringify(userData));
//     setUser(userData);
//   };

//   // Logout Function
//   const logout = () => {
//     localStorage.removeItem("taxToken");
//     localStorage.removeItem("taxUser");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to use AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// // };
// import React, { createContext, useContext, useState, useEffect } from "react";

// // Create Auth Context
// const AuthContext = createContext(null);

// // Auth Provider Component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     // Load user from local storage initially
//     const storedUser = localStorage.getItem("taxUser");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Save user to local storage when state changes
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("taxUser", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("taxUser");
//     }
//   }, [user]);

//   // Login Function
//   const login = (userData, token) => {
//     localStorage.setItem("taxToken", token);
//     setUser(userData);
//   };

//   // Logout Function
//   const logout = () => {
//     localStorage.removeItem("taxToken");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to use AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === null) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };



import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("taxUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login Function
  const login = (userData, token) => {
    localStorage.setItem("taxToken", token);
    localStorage.setItem("taxUser", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("taxToken");
    localStorage.removeItem("taxUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
