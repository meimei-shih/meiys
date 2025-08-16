import React from 'react';
// import './UserSetting.css';

const UserSetting: React.FC = () => {
  return (
    <div className='user-setting-container'>
      <div className='main-content-card'>
        <h2>User Settings</h2>
        <div className='content'>
          <p>This is where users can manage their account settings, preferences, and profile information.</p>
          <p>Features coming soon:</p>
          <ul className='settings-features'>
            <li>Profile information editing</li>
            <li>Password change</li>
            <li>Notification preferences</li>
            <li>Account privacy settings</li>
            <li>Theme customization</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
