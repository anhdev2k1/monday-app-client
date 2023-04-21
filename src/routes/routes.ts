import config from '~/config';
import LoginStep1 from '~/pages/Login/loginStep1';
import LoginStep2 from '~/pages/Login/loginStep2';
import Register from '~/pages/Register';
import RegisterStep2 from '~/pages/RegisterStep2';
import Workspace from '~/pages/Workspace';
import { IRoutes } from '~/shared/model/global';

// Public routes
const publicRoutes: IRoutes[] = [
   { path: config.routes.home, component: Workspace },
   { path: config.routes.login, component: LoginStep1 },
   { path: config.routes.loginStep2, component: LoginStep2 },
   { path: config.routes.register, component: Register },
   { path: config.routes.registerStep2, component: RegisterStep2 },
];

export { publicRoutes };
