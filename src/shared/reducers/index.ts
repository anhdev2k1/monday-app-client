import boardSlice from '~/pages/Board/board.reducer';
import userSlice from './user.reducer';
import workspaceSlice from '~/pages/Workspace/workspace.reducer';
import overlaySlice from '~/components/Overlay/overlay.reducer';

const rootReducer = {
   boardSlice,
   userSlice,
   workspaceSlice,
   overlaySlice,
};

export default rootReducer;
