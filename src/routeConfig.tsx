import ComingSoon from './screen/ComingSoon';
import Tickety from './screen/Tickety';

enum ROUTES {
  HOME = 'HOME',
  TICKETY = 'TICKETY',
}

interface RouteDefinition {
  path: string;
  element: React.ReactNode;
}

export const ROUTE_DEFINITIONS: Record<ROUTES, RouteDefinition> = {
  [ROUTES.HOME]: {
    path: '/',
    element: <ComingSoon />,
  },
  [ROUTES.TICKETY]: {
    path: '/tickety/*',
    element: <Tickety />,
  },
}
