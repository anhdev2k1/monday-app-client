import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './workspaceManagement.scss';
import { Input } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { useCallback, useEffect, useState } from 'react';
import {
   editWorkSpace,
   getDetailWorkspace,
   resetCurrWorkspace,
   setDescriptionWorkspace,
   setNameWorkspace,
} from '../Workspace/workspace.reducer';
import { getListBoards } from '../Board/board.reducer';
import BoardSidebar from '~/components/BoardSidebar';
import { IWorkspace } from '~/shared/model/workSpace';
import Notification from '~/components/NotificationProvider/Notification/notification';
import LoadingLogo from '~/components/LoadingLogo/loadingLogo';
const { TextArea } = Input;

const WorkspaceManagement = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   // const nameWorkspace = useAppSelector((state) => state.workspaceSlice.currWorkspace.data?.name);
   // const descriptionWorkspace = useAppSelector(
   //    (state) => state.workspaceSlice.currWorkspace.data?.description,
   // );
   const currentWorkspace = useAppSelector((state) => state.workspaceSlice.currWorkspace.data);
   const descriptionWorkspace = useAppSelector(
      (state) => state.workspaceSlice.currWorkspace.data?.description,
   );

   const { idWorkspace } = useParams();
   useEffect(() => {
      if (currentWorkspace && currentWorkspace._id !== idWorkspace) {
         navigate(`/workspace/${currentWorkspace._id}`);
      }
   }, [currentWorkspace]);

   useEffect(() => {
      const getWorkspace = () => {
         if (idWorkspace) {
            dispatch(
               getDetailWorkspace({
                  idWorkspace,
               }),
            );
         }
      };
      getWorkspace();
   }, []);

   useEffect(() => {
      return () => {
         dispatch(resetCurrWorkspace());
      };
   }, []);

   const items: TabsProps['items'] = [
      {
         key: '1',
         label: `Recent boards`,
         children: (
            <>
               <span>Boards and dashboards you visited recently in this workspace</span>
               <div className="workspace__boards">
                  {currentWorkspace?.boards &&
                     currentWorkspace.boards.map((board, index) => {
                        return <BoardSidebar dataBoard={board} key={index} />;
                     })}
               </div>
            </>
         ),
      },
      {
         key: '2',
         label: `Members`,
         children: (
            <>
               <div className="workspace__subscribers-header">
                  <span>Member</span>
                  <span>/1</span>
               </div>
               <div className="workspace__info-user">
                  <div className="info__user-img">
                     <span>{currentWorkspace?.name.substring(0, 1)}</span>
                  </div>
                  <span>{currentWorkspace?.name}</span>
               </div>
            </>
         ),
      },
      {
         key: '3',
         label: `Permissions`,
         children: `Content of Tab Pane 3`,
         disabled: true,
      },
   ];
   const handleBlurInput = (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
      fieldUpdate: 'name' | 'description',
   ) => {
      const payload = dispatch(
         editWorkSpace({
            [fieldUpdate]: e.target.value,
            idWorkspace,
         }),
      );

      dispatch(
         editWorkSpace({
            [fieldUpdate]: e.target.value,
            idWorkspace,
         }),
      );
   };

   const handleChangeInput = useCallback(
      (
         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
         fieldUpdate: 'name' | 'description',
      ) => {
         if (fieldUpdate === 'name') {
            dispatch(setNameWorkspace(e.target.value));
         } else {
            dispatch(setDescriptionWorkspace(e.target.value));
         }
      },
      [],
   );
   const [isLoading, setIsLoading] = useState<boolean>(true);
   useEffect(() => {
      setTimeout(() => {
         setIsLoading(false);
      }, 1500);
   }, []);
   return (
      <>
         {isLoading ? (
            <LoadingLogo height="100%" />
         ) : (
            <div className="workspace__container">
               <div className="workspace__cover">
                  <img
                     src="https://cdn.monday.com/images/workspaces_cover_photos/full/done.png"
                     alt=""
                  />
               </div>
               <div className="workspace__header">
                  <div className="workspace__header-avt">
                     <span>{currentWorkspace?.name.substring(0, 1)}</span>
                  </div>
                  <div className="workspace__header-title">
                     <Input
                        className="header__title-name"
                        value={currentWorkspace?.name}
                        onChange={(e) => {
                           handleChangeInput(e, 'name');
                        }}
                        onBlur={(e) => {
                           handleBlurInput(e, 'name');
                        }}
                     />
                     <TextArea
                        rows={2}
                        value={currentWorkspace?.description}
                        className="header__title-desc"
                        onChange={(e) => {
                           handleChangeInput(e, 'description');
                        }}
                        onBlur={(e) => {
                           handleBlurInput(e, 'description');
                        }}
                     />
                  </div>
               </div>
               <div className="workspace__content">
                  <Tabs defaultActiveKey="1" items={items} />
               </div>
            </div>
         )}
      </>
   );
};

export default WorkspaceManagement;
