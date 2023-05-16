import boardSlice from '~/pages/Board/board.reducer';
import userSlice from './user.reducer';
import workspaceSlice from '~/pages/Workspace/workspace.reducer';
import overlaySlice from '~/components/Overlay/overlay.reducer';
import groupSlice from '~/components/Group/group.reducer';

import notificationSlice from '../../components/Notification/notification.reducer';
import listTypesSlice from '~/components/ListTypes/listTypes.reducer';
import mainTableSlice from '~/components/MainTable/mainTable.reducer';
const rootReducer = {
   boardSlice,
   userSlice,
   workspaceSlice,
   overlaySlice,
   groupSlice,
   notificationSlice,
   listTypesSlice,
   mainTableSlice,
};

export default rootReducer;
