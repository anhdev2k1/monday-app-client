import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './workspaceManagement.scss';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '~/services/redux/store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getDetailWorkspace } from '../Workspace/workspace.reducer';
const { TextArea } = Input;

const WorkspaceManagement = () => {
   const dispatch = useAppDispatch();
   const nameWorkspace = useAppSelector((state) => state.workspaceSlice.currWorkspace.data?.name);
   const getIDWorkspace = useAppSelector((state) => state.workspaceSlice.currWorkspace.data?._id);
   const currentWorkspace = useAppSelector((state) => state.workspaceSlice.currWorkspace.data);
   useEffect(() => {
      const getWorkspace = async () => {
         if (getIDWorkspace) {
            await dispatch(
               getDetailWorkspace({
                  idWorkSpace: getIDWorkspace,
               }),
            );
         }
      };
      getWorkspace();
   }, [nameWorkspace]);

   const items: TabsProps['items'] = [
      {
         key: '1',
         label: `Recent boards`,
         children: (
            <>
               <span>Boards and dashboards you visited recently in this workspace</span>
               <div className="workspace__boards">
                  <Link to="/board/123" className="workspace__boards-item">
                     <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width="19"
                        height="19"
                        aria-hidden="true"
                        aria-label="Public board"
                        className="icon_component"
                     >
                        <path
                           d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
                           fill="currentColor"
                           fill-rule="evenodd"
                           clip-rule="evenodd"
                        ></path>
                     </svg>
                     <span>Test</span>
                  </Link>
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
                     <span>AN</span>
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
   return (
      <>
         <div className="wrapper">
            <div className="workspace__cover">
               <img
                  src="https://cdn.monday.com/images/workspaces_cover_photos/full/done.png"
                  alt=""
               />
            </div>
            <Link to="/workspace/123" className="workspace__header">
               <div className="workspace__header-avt">
                  <span>M</span>
               </div>
               <div className="workspace__header-title">
                  <Input className="header__title-name" value={nameWorkspace} />
                  <TextArea rows={3} defaultValue="Keep coding" className="header__title-desc" />
               </div>
            </Link>
            <div className="workspace__content">
               <Tabs defaultActiveKey="1" items={items} />
            </div>
         </div>
      </>
   );
};

export default WorkspaceManagement;
