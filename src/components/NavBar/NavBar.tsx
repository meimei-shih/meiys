import React from "react";
import { NavLink } from 'react-router-dom';
import { useNavBar } from "src/context/NavBarProvider";
import { useAuth } from "src/context/AuthProvider";
import { ROUTE_DEFINITIONS, Routes, ROUTES } from "src/routeConfig";
import "./NavBar.css";

const NAV_ITEMS: Routes[] = ['HOME_PAGE', 'USER_SETTING', 'LOGOUT'];

interface NavItemProps {
  route: Routes;
}

const NavItem: React.FC<NavItemProps> = ({ route }) => {
  const { isExpanded } = useNavBar();
  const { path, label, icon } = ROUTE_DEFINITIONS[route];
  return (
    <NavLink to={path} className="nav-item">
      {icon && icon}
      {isExpanded && <span>{label}</span>}
    </NavLink>
  )
}

const NavBar: React.FC = () => {
  const { isExpanded, toggleNavBar } = useNavBar();
  const { handleLogout } = useAuth();
  const myProjectsArray = [];

  return (
    <div className={`dashboard-navbar ${isExpanded ? '' : 'hidden-state'}`}>
      <div className='nav-btn-group'>
          {NAV_ITEMS.map((route) => <NavItem key={route} route={route} />)}
      </div>
      <div className='nav-projects-button-group'>
        {isExpanded && (
          <>
            <span className="nav-projects-button-group-title">My Projects</span>
            <span className="no-project-message">You have no project yet.</span>
          </>
        )}
      </div>
      <button type="button" className="navbar-toggle-btn" onClick={toggleNavBar}>
        {isExpanded ? <i className="fa-solid fa-angle-left"></i> : <i className="fa-solid fa-angle-right"></i>}
      </button>
    </div>
  );
};

export default NavBar;