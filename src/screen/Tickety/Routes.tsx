import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTE_DEFINITIONS } from './routeConfig';
import './index.css';

const Router: React.FC = () => {
  return (
    <div className="tickety-app-container">
      <Routes>
        {Object.values(ROUTE_DEFINITIONS).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
};
  
export default Router;