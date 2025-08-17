import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ROUTE_DEFINITIONS, ROOT_ROUTES } from './routeConfig';
import AppSetting from './AppSetting';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <AppSetting>
        <Routes>
          {/* Public routes */}
          {ROOT_ROUTES.map((route) => {
            const { path, element } = ROUTE_DEFINITIONS[route];
            return <Route key={path} path={path} element={element} />
          })}
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppSetting>
    </BrowserRouter>
  );
};
  
export default Router;