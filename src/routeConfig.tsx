import { House, LogOut, Settings } from 'lucide-react';
import Auth from './screen/Auth';
import Authenticated from './screen/Authenticated';
import Error from './screen/Error';
import SplashPage from './screen/SplashPage';
import UserSetting from './screen/UserSetting';

export enum ROUTES {
  SPLASH_PAGE = 'SPLASH_PAGE',
  LOGIN_PAGE = 'LOGIN_PAGE',
  SIGNUP_PAGE = 'SIGNUP_PAGE',
  LOGOUT = 'LOGOUT',
  ERROR_PAGE = 'ERROR_PAGE',
  AUTHENTICATED = 'AUTHENTICATED',
  USER_SETTING = 'USER_SETTING',
}

export type Routes = keyof typeof ROUTES;

interface RouteDefinition {
  label: string;
  path: string;
  element: React.ReactNode;
  icon?: React.ReactNode;
  isSubRoute?: boolean;
  basePath?: string;
}

export const ROUTE_DEFINITIONS: Record<ROUTES, RouteDefinition> = {
  [ROUTES.SPLASH_PAGE]: {
    label: 'Splash Page',
    path: '/',
    element: <SplashPage />,
    icon: <House />,
  },
  [ROUTES.LOGIN_PAGE]: {
    label: 'Login',
    path: '/login',
    element: <Auth />,
  },
  [ROUTES.SIGNUP_PAGE]: {
    label: 'Signup',
    path: '/signup',
    element: <Auth />,
  },
  [ROUTES.LOGOUT]: {
    label: 'Logout',
    path: '/',
    element: <SplashPage />,
    icon: <LogOut />,
  },
  [ROUTES.ERROR_PAGE]: {
    label: 'Error',
    path: '/error',
    element: <Error />,
  },
  [ROUTES.AUTHENTICATED]: {
    label: 'Dashboard',
    path: '/:username/*',
    basePath: '/',
    element: <Authenticated />,
    icon: <House />,
    isSubRoute: true,
  },
  [ROUTES.USER_SETTING]: {
    label: 'User Setting',
    path: '/:username/user-setting',
    basePath: '/user-setting',
    element: <UserSetting />,
    icon: <Settings />,
    isSubRoute: true,
  },
}

export const ROOT_ROUTES = [ ROUTES.SPLASH_PAGE, ROUTES.LOGIN_PAGE, ROUTES.SIGNUP_PAGE, ROUTES.ERROR_PAGE, ROUTES.AUTHENTICATED ];
