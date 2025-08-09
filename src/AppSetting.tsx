import React from 'react';
import { AuthProvider } from './context/AuthProvider';

interface AppSettingProps {
  children: React.ReactNode;
}

const AppSetting: React.FC<AppSettingProps> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default AppSetting;