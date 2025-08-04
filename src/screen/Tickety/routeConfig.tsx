import SplashPage from './SplashPage';
import ComingSoon from '../ComingSoon';

export enum TICKETY_ROUTES {
  TICKETY_SPLASH_PAGE = 'TICKETY_SPLASH_PAGE',
  TICKETY_SIGNUP_PAGE = 'TICKETY_SIGNUP_PAGE',
}

export type TicketyRoute = keyof typeof TICKETY_ROUTES;

interface RouteDefinition {
  path: string;
  element: React.ReactNode;
}

export const ROUTE_DEFINITIONS: Record<TICKETY_ROUTES, RouteDefinition> = {
  [TICKETY_ROUTES.TICKETY_SPLASH_PAGE]: {
    path: '/',
    element: <SplashPage />,
  },
  [TICKETY_ROUTES.TICKETY_SIGNUP_PAGE]: {
    path: '/signup',
    element: <ComingSoon />,
  },
}

export const PARENT_ROUTE = '/tickety';

export const getTicketyPath = (ticketyRoute: TicketyRoute) => `${PARENT_ROUTE}${ROUTE_DEFINITIONS[ticketyRoute].path}`;


