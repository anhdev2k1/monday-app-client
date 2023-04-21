import config from '~/config';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Workspace from '~/pages/Workspace';
import { IRoutes } from '~/shared/model/global';

// Public routes
const publicRoutes: IRoutes[] = [
   { path: config.routes.home, component: Workspace },
   { path: config.routes.login, component: Login },
   { path: config.routes.register, component: Register },
];

export { publicRoutes };
