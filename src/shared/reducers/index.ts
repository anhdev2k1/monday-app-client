import boardSlice from '~/pages/Board/board.reducer';
import userSlice from './user.reducer';
import workspaceSlice from '~/pages/Workspace/workspace.reducer';
import overlaySlice from '~/components/Overlay/overlay.reducer';
import groupSlice from '~/components/Group/group.reducer';
import listTypesSlice from '~/components/ListTypes/listTypes.reducer';

const rootReducer = {
   boardSlice,
   userSlice,
   workspaceSlice,
   overlaySlice,
   groupSlice,
   listTypesSlice,
};

export default rootReducer;
