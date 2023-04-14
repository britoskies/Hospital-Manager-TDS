// Router 
import { useRoutes } from 'react-router-dom';

// Router
import routerConfig from './routerConfig'

// Guards
import { routeGuard } from '../guards'

type Props = {};

function Routes({ }: Props) {
    const routes = useRoutes(routerConfig(routeGuard))
    return routes;
}

export default Routes;
