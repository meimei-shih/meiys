import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_DEFINITIONS } from '../../routeConfig';
import { LINKEDIN_URL, GITHUB_URL, MY_WEB_URL } from '../../constant';
import './Footer.css';

const Footer: React.FC = () => {
  const location = useLocation();
  const isSplashPage = location.pathname === ROUTE_DEFINITIONS.HOME_PAGE.path;

  const openLink = useCallback((variant: 'linkedin' | 'github' | 'my-web') => {
    switch (variant) {
      case 'linkedin':
        window.open(LINKEDIN_URL);
        break;
      case 'github':
        window.open(GITHUB_URL);
        break;
      case 'my-web':
        window.open(MY_WEB_URL);
        break;
      default:
        break;
    }
  }, []);

  return (
    <footer className={`footer ${isSplashPage ? 'footer-secondary' : ''}`}>
      <div className='footer-links'>
        <button type='button' onClick={() => openLink('linkedin')}>
          <i className="fab fa-linkedin-in"></i>
        </button>
        <button type='button' onClick={() => openLink('github')}>
          <i className="fab fa-github"></i>
        </button>
        <button type='button' onClick={() => openLink('my-web')}>
          <i className="fa-solid fa-m"></i>
        </button>
      </div>
      <p>© 2025 | Designed & coded by Mei Shih | React Firebase</p>
    </footer>
  );
};

export default Footer;