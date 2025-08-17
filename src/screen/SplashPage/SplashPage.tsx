import { Navigate, NavLink } from 'react-router-dom';
import TicketyFlowImage from 'src/assets/images/tickety-flow.png';
import TicketyTeamImage from 'src/assets/images/tickety-team.png';
import { ROUTE_DEFINITIONS } from 'src/routeConfig';
import { useAuth } from 'src/context/AuthProvider';
import Footer from 'src/components/Footer';
import Loading from '../Loading';
import './SplashPage.css';

const SplashPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isAuthenticated) return <Navigate to={ROUTE_DEFINITIONS.AUTHENTICATED.path} />
  else if (isLoading) return <Loading />
  return (
    <>
      <div className='splash-page'>
        <div className='banner'>
            <div className='banner-text'>
            <h1>Tickety made project managment <span>easy</span></h1>
            <p>With tickety, you can manage your work flow by stages, keep track of your tasks, and assign tasks to your teammates.</p>
            <NavLink className='banner-login-btn' to={ROUTE_DEFINITIONS.LOGIN_PAGE.path}>Login</NavLink>
            <NavLink className='banner-sign-up-btn' to={ROUTE_DEFINITIONS.SIGNUP_PAGE.path}>Sign up for free</NavLink>
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
