import config from '~/config';
import LayoutWorkspace from '~/layouts/LayoutWorkspace';
import Board from '~/pages/Board';
import LoginStep2 from '~/pages/Login/loginStep2';
import Register from '~/pages/Register';
import Workspace from '~/pages/Workspace/workspace';
import { IRoutes } from '~/shared/model/global';
import WorkspaceManagement from '~/pages/WorkspaceManagement';
import Trash from '~/pages/Trash/trash';

// Public routes
const publicRoutes: IRoutes[] = [
   { path: config.routes.login, component: LoginStep2 },
   { path: config.routes.register, component: Register },
];
// Public routes
const privateRoutes: IRoutes[] = [
   { path: config.routes.home, component: Workspace },

   { path: config.routes.board, component: Board, layout: LayoutWorkspace },
   { path: config.routes.workspace, component: WorkspaceManagement, layout: LayoutWorkspace },
];

export { publicRoutes, privateRoutes };
