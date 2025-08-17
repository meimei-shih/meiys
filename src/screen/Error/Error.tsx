import React, { useCallback } from "react";
import { Navigate } from "react-router-dom";
import { AlertTriangle, Github, LogOut } from "lucide-react";
import { useAuth } from "src/context/AuthProvider";
import { ROUTE_DEFINITIONS } from "src/routeConfig";
import { GITHUB_ISSUES_URL } from "src/constant";
import './Error.css';

const Error: React.FC = () => {
  const { handleLogout, errors } = useAuth();

  const handleReportIssue = useCallback(() => {
    window.open(GITHUB_ISSUES_URL, '_blank');
  }, []);

  if (!errors.length) return <Navigate to={ROUTE_DEFINITIONS.AUTHENTICATED.path} />
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