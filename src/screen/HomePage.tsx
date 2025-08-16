import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "src/context/AuthProvider";
import { NavBarProvider } from "src/context/NavBarProvider";
import Navbar from 'src/components/NavBar';
import Loading from "./Loading";
import Dashboard from "./Dashboard";
import SplashPage from "./SplashPage";
import UserSetting from "./UserSetting";
import Error from "./Error"

const AuthenticatedScreen: React.FC = () => {
  return (
    <NavBarProvider>
      <div className='authenticated-screen'>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-setting" element={<UserSetting />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Navbar/>
      </div>
    </NavBarProvider>
  )
}

const HomePage: React.FC = () => {
  const { isAuthenticated, isLoading, errors } = useAuth();

  if (errors.length > 0) return <Error />
  else if (isLoading) return <Loading />
  else if (isAuthenticated) return <AuthenticatedScreen />
  else return <SplashPage />;
}

export default HomePage;
