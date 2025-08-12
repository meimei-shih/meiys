import React from 'react';
import { NavBarProvider, useNavBar } from 'src/context/NavBarProvider';
import Navbar from 'src/components/NavBar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { isExpanded } = useNavBar();
  
  return (
    <div className='dashboard-content'>
      <div className={isExpanded ? 'dashboard-main' : 'dashboard-main-extended'}>Main Content</div>
      <Navbar/>
    </div>
  )
}

const DashboardWrapper: React.FC = () => {
  return (
    <NavBarProvider>
      <Dashboard />
    </NavBarProvider>
  )
}

export default DashboardWrapper;