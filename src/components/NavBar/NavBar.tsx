import React from "react";
import { NavLink } from 'react-router-dom';
import { useNavBar } from "src/context/NavBarProvider";
import { useAuth } from "src/context/AuthProvider";
import { ROUTE_DEFINITIONS, Routes } from "src/routeConfig";
import "./NavBar.css";

const NAV_ITEMS: Routes[] = ['AUTHENTICATED', 'USER_SETTING', 'LOGOUT'];

interface NavItemProps {
  route: Routes;
}

const NavItem: React.FC<NavItemProps> = ({ route }) => {
  const { handleLogout } = useAuth();
  const { isExpanded, getSubRoutePath } = useNavBar();
  const { path, label, icon, isSubRoute } = ROUTE_DEFINITIONS[route];
  const routePath = isSubRoute ? getSubRoutePath(route) : path;

  if (route === 'LOGOUT') {
    return (
      <button className="nav-item" onClick={handleLogout}>
        {icon && icon}
        {isExpanded && <span>{label}</span>}
      </button>
    );
  }

  return (
    <NavLink to={routePath} className="nav-item">
      {icon && icon}
      {isExpanded && <span>{label}</span>}
    </NavLink>
  )
}

const NavBar: React.FC = () => {
  const { isExpanded, toggleNavBar, openLink } = useNavBar();

  return (
    <div className={`navbar ${isExpanded ? '' : 'hidden-state'}`}>
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
      <div className="footer-links">
        <button type="button" onClick={() => openLink('linkedin')}>
          <i className="fab fa-linkedin-in"></i>
        </button>
        <button type="button" onClick={() => openLink('github')}>
          <i className="fab fa-github"></i>
        </button>
        <button type="button" onClick={() => openLink('my-web')}>
          <i className="fa-solid fa-m"></i>
        </button>
      </div>
    </div>
  );
};

export default NavBar;