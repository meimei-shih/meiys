import React from "react";
import { useAuth } from "src/context/AuthProvider";
import Loading from "./Loading";
import Dashboard from "./Dashboard";
import SplashPage from "./SplashPage";

const HomePage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loading />;
  else if (isAuthenticated) return <Dashboard />;
  else return <SplashPage />;
}

export default HomePage;
