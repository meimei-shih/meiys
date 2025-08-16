import React from 'react';
import { useNavBar } from 'src/context/NavBarProvider';
import Mei from '../../assets/images/Mei.jpg';
import { ABOUT_THIS_APP, ABOUT_ME } from 'src/constant';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { isExpanded, openLink } = useNavBar();
  
  return (
    <div className={isExpanded ? 'dashboard-main' : 'dashboard-main-extended'}>
      <div className="main-content-card">
        <h2>About this app</h2>
        <div className="content">
          <p>
            {ABOUT_THIS_APP} Check out the Tickety GitHub repo{" "}
            <span className="repo-link" onClick={() => openLink('repo')}>
              here
            </span>
            .
          </p>
        </div>
      </div>
      <div className="main-content-card">
        <h2>About the Developer - Mei Shih</h2>
        <div className="content">
          <div className="avatar">
            <img src={Mei}></img>
          </div>
          {ABOUT_ME.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="my-links">
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
      <div className="main-content-card">
        <h2>Future updates</h2>
        <div className="content">
          <p>Here are some up coming features in the near future:</p>
          <ul className='future-updates'>
            <li>
              You will be able to invite teammates via email or username to edit
              your projects.
            </li>
            <li>
              You can assign task to any teammate and their avatar will show on
              the task card.
            </li>
            <li>You can set color of every single task card.</li>
            <li>You can see who is the last user to update a task card.</li>
            <li>
              You will get notification when teammates create/edit/delete your
              project.
            </li>
            <li>
              You can archive a project or kanban. The Archived project or
              kanban will be in the archived section.
            </li>
            <li>Teammates can comment on task card.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;