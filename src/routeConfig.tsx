import Auth from './screen/Auth';
import HomePage from './screen/HomePage';

enum ROUTES {
  HOME_PAGE = 'HOME_PAGE',
  LOGIN_PAGE = 'LOGIN_PAGE',
  SIGNUP_PAGE = 'SIGNUP_PAGE',
}

interface RouteDefinition {
  path: string;
  element: React.ReactNode;
}

export const ROUTE_DEFINITIONS: Record<ROUTES, RouteDefinition> = {
  [ROUTES.HOME_PAGE]: {
    path: '/',
    element: <HomePage />,
  },
  [ROUTES.LOGIN_PAGE]: {
    path: '/login',
    element: <Auth />,
  },
  [ROUTES.SIGNUP_PAGE]: {
    path: '/signup',
    element: <Auth />,
  },
}
