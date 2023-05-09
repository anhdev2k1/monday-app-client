import boardSlice from '~/pages/Board/board.reducer';
import userSlice from './user.reducer';
import workspaceSlice from '~/pages/Workspace/workspace.reducer';

const rootReducer = {
   boardSlice,
   userSlice,
   workspaceSlice,
};

export default rootReducer;
