import React, { useCallback } from 'react';
import './Footer.css';

const Footer: React.FC = () => {

  const goToLinkedIn = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open('https://www.linkedin.com/in/meiyinshih/');
  }, []);

  const goToGithub = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open('https://github.com/MeiMeiYS');
  }, []);

  const goToMyWeb = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open('https://meiys.me/');
  }, []);

  return (
    <footer className='splash-page-footer'>
      <div className='splash-page-footer-links'>
        <button type='button' onClick={goToLinkedIn}>
          <i className="fab fa-linkedin-in"></i>
        </button>
        <button type='button' onClick={goToGithub}>
          <i className="fab fa-github"></i>
        </button>
        <button type='button' onClick={goToMyWeb}>
          <i className="fa-solid fa-m"></i>
        </button>
      </div>
      <p>© 2025 | Designed & coded by Mei Shih | React Firebase</p>
    </footer>
  );
};

export default Footer;