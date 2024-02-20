import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState(1);

  const value = {
    selectedRoute,
    setSelectedRoute,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  return useContext(NavigationContext);
};
