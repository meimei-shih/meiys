import { House, Settings, LogOut } from 'lucide-react';
import Auth from './screen/Auth';
import HomePage from './screen/HomePage';

export enum ROUTES {
  HOME_PAGE = 'HOME_PAGE',
  LOGIN_PAGE = 'LOGIN_PAGE',
  SIGNUP_PAGE = 'SIGNUP_PAGE',
  LOGOUT = 'LOGOUT',
  USER_SETTING = 'USER_SETTING',
  ERROR_PAGE = 'ERROR_PAGE',
}

export type Routes = keyof typeof ROUTES;

interface RouteDefinition {
  label: string;
  path: string;
  element: React.ReactNode;
  icon?: React.ReactNode;
}

export const ROUTE_DEFINITIONS: Record<ROUTES, RouteDefinition> = {
  [ROUTES.HOME_PAGE]: {
    label: 'Dashboard',
    path: '/',
    element: <HomePage />,
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
  [ROUTES.USER_SETTING]: {
    label: 'User Setting',
    path: '/user-setting',
    element: <HomePage />,
    icon: <Settings />,
  },
  [ROUTES.LOGOUT]: {
    label: 'Logout',
    path: '/',
    element: <HomePage />,
    icon: <LogOut />,
  },
  [ROUTES.ERROR_PAGE]: {
    label: 'Error',
    path: '/error',
    element: <div>Error Page - Something went wrong</div>,
  },
}

export const ROOT_ROUTES = [ ROUTES.HOME_PAGE, ROUTES.LOGIN_PAGE, ROUTES.SIGNUP_PAGE, ROUTES.USER_SETTING ];
