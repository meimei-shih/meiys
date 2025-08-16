import React, { useCallback } from "react";
import { useAuth } from "src/context/AuthProvider";
import { AlertTriangle, Github, LogOut } from "lucide-react";
import './Error.css';

const Error: React.FC = () => {
  const { handleLogout } = useAuth();

  const handleReportIssue = useCallback(() => {
    window.open('https://github.com/meimei-shih/meiys/issues', '_blank');
  }, []);

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">
          <AlertTriangle size={80} />
        </div>
        <h1 className="error-title">Oops! Something Went Wrong</h1>
        <p className="error-message">
          We encountered an unexpected error while processing your request. 
          This might be due to a temporary issue or a problem with your account.
        </p>
        <div className="error-actions">
          <button  className="error-btn report-btn" onClick={handleReportIssue}>
            <Github size={20} />
            <span>Report Issue</span>
          </button>
          <button className="error-btn logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
        <p className="error-help">
          If this problem persists, please report the issue or try logging out and back in.
        </p>
      </div>
    </div>
  );
};

export default Error;