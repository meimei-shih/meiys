import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useAuth } from "src/context/AuthProvider";
import { NavBarProvider, useNavBar } from "src/context/NavBarProvider";
import { ROUTE_DEFINITIONS } from "src/routeConfig";
import Navbar from 'src/components/NavBar';
import Loading from "./Loading";
import Dashboard from "./Dashboard";
import UserSetting from "./UserSetting";

const Authenticated: React.FC = () => {
  const { isExpanded } = useNavBar();
  
  return (
    <div className='authenticated-screen'>
      <div className={isExpanded ? 'authenticated-screen-content' : 'authenticated-screen-content-extended'}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-setting" element={<UserSetting />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Navbar/>
    </div>
  )
}

const AuthenticatedWrapper: React.FC = () => {
  const { isAuthenticated, isLoading, userProfile, errors } = useAuth();
  const { username } = useParams<{ username: string }>();

  if (errors.length > 0) return <Navigate to={ROUTE_DEFINITIONS.ERROR_PAGE.path} />
  else if (isAuthenticated && userProfile && userProfile.username !== username) return <Navigate to={`/${userProfile.username}`}/>;
  else if (isAuthenticated) return (
    <NavBarProvider>
      <Authenticated />
    </NavBarProvider>
  )
  else if (isLoading) return <Loading />
  else return <Navigate to={ROUTE_DEFINITIONS.SPLASH_PAGE.path} />;
}

export default AuthenticatedWrapper;
