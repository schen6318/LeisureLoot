import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const RefreshDataContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const storedUserJSON = localStorage.getItem("user");
    if (storedUserJSON) {
      const storedUser = JSON.parse(storedUserJSON);
      setUser(storedUser);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      <RefreshDataContext.Provider value={{ refreshData, setRefreshData }}>
          {children}
      </RefreshDataContext.Provider>
    </UserContext.Provider>
  );
};
