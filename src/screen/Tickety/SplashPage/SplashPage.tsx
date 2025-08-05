import { NavLink } from 'react-router-dom';
import TicketyFlowImage from 'src/assets/images/tickety-flow.png';
import TicketyTeamImage from 'src/assets/images/tickety-team.png';
import { getTicketyPath } from '../routeConfig';
import Footer from './Footer';
import './SplashPage.css';

const SplashPage: React.FC = () => {
  return (
    <>
      <div className='splash-page'>
        <div className='banner'>
            <div className='banner-text'>
            <h1>Tickety made project managment <span>easy</span></h1>
            <p>With tickety, you can manage your work flow by stages, keep track of your tasks, and assign tasks to your teammates.</p>
            <NavLink className='banner-sign-up-btn' to={getTicketyPath('TICKETY_SIGNUP_PAGE')}>Sign Up for free</NavLink>
            </div>
            <div className='banner-img'>
            <img src={TicketyFlowImage} alt='Kanban board illustration'></img>
            </div>
        </div>
        <div className='section-one'>
            <div className='section-one-text'>
            <h2>Tickety improve <span>productivity</span></h2>
            <p>Organize your tasks all in one place. Customize task cards for easy analysis and improve productivity.</p>
            </div>
            <div className='section-one-img'>
            <img src={TicketyTeamImage} alt='Team work illustration'></img>
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SplashPage;