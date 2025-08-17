import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ROUTE_DEFINITIONS, Routes } from "src/routeConfig";
import { LINKEDIN_URL, GITHUB_URL, MY_WEB_URL, REPO_URL } from '../constant';
import { useAuth } from "./AuthProvider";

interface NavBarContextType {
  isExpanded: boolean;
  toggleNavBar: () => void;
  openLink: (variant: 'linkedin' | 'github' | 'my-web' | 'repo') => void;
  getSubRoutePath: (route: Routes) => string;
}

// Create context
const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

// Provider component
interface NavBarProviderProps {
  children: ReactNode;
}

export const NavBarProvider: React.FC<NavBarProviderProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const { userProfile } = useAuth();

  const toggleNavBar = useCallback(() => {
    setIsExpanded(preState => !preState);
  }, [setIsExpanded]);

  const openLink = useCallback((variant: 'linkedin' | 'github' | 'my-web' | 'repo') => {
    switch (variant) {
      case 'linkedin':
        window.open(LINKEDIN_URL);
        break;
      case 'github':
        window.open(GITHUB_URL);
        break;
      case 'my-web':
        window.open(MY_WEB_URL);
        break;
      case 'repo':
        window.open(REPO_URL);
        break;
      default:
        break;
    }
  }, []);

  const getSubRoutePath = useCallback((route: Routes) => {
    if (!userProfile) return '/';
    const routeDef = ROUTE_DEFINITIONS[route];
    if (routeDef.isSubRoute && routeDef.basePath) {
      // For sub-routes, construct path using basePath
      return `/${userProfile.username}${routeDef.basePath}`;
    }
    // For non-sub-routes, return the original path
    return routeDef.path;
  }, [userProfile?.username]);

  const contextValue: NavBarContextType = {
    isExpanded,
    toggleNavBar,
    openLink,
    getSubRoutePath,
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

