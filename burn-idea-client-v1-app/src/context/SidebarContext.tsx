import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';

interface SidebarContextProps {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

interface SidebarContextProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarContextProviderProps> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);

  const toggleSidebar = useCallback(() => {
    setIsSidebarExpanded(prevState => !prevState);
  }, []);

  return (
    <SidebarContext.Provider value={{ isSidebarExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};