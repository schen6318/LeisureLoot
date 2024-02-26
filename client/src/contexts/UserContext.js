import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const RefreshDataContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      <RefreshDataContext.Provider value={{ refreshData, setRefreshData }}>
          {children}
      </RefreshDataContext.Provider>
    </UserContext.Provider>
  );
};
