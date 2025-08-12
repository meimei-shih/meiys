import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface NavBarContextType {
  isExpanded: boolean;
  toggleNavBar: () => void;
}

// Create context
const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

// Provider component
interface NavBarProviderProps {
  children: ReactNode;
}

export const NavBarProvider: React.FC<NavBarProviderProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const toggleNavBar = useCallback(() => {
    setIsExpanded(preState => !preState);
  }, [setIsExpanded]);

  const contextValue: NavBarContextType = {
    isExpanded,
    toggleNavBar,
  };

  return (
    <NavBarContext.Provider value={contextValue}>
      {children}
    </NavBarContext.Provider>
  );
};

// Custom hook to use the context
export const useNavBar = (): NavBarContextType => {
  const context = useContext(NavBarContext);
  if (!context) throw new Error('useNavBar must be used within a NavBarProvider');
  return context;
};

