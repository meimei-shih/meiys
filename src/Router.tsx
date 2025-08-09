import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTE_DEFINITIONS } from './routeConfig';
import AppSetting from './AppSetting';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <AppSetting>
        <Routes>
          {Object.values(ROUTE_DEFINITIONS).map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </AppSetting>
    </BrowserRouter>
  );
};
  
export default Router;