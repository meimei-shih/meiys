import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTE_DEFINITIONS } from './routeConfig';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(ROUTE_DEFINITIONS).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
  
export default Router;