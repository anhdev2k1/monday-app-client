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

   const listBoards = useAppSelector((state) => state.boardSlice.listBoard.datas);
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
   // const updateWorkspace = (field:string,value:string) => {
   //    const data = {
   //       idWorkspace,
   //       [`${field}`]: value
   //    }
   //    dispatch(editWorkSpace(data))
   // }
   // const handleRename = (e:any) => {
   //    const {value} = e.target
   //    updateWorkspace('name',value)
   // }
   // const handleReDescription = (e:any) => {
   //    const {value} = e.target
   //    updateWorkspace('description',value)
   // }
   const items: TabsProps['items'] = [
      {
         key: '1',
         label: `Recent boards`,
         children: (
            <>
               <span>Boards and dashboards you visited recently in this workspace</span>
               <div className="workspace__boards">
                  {/* <Link to="/board/123" className="workspace__boards-item">
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
                           fillRule="evenodd"
                           clipRule="evenodd"
                        ></path>
                     </svg>
                     <span>Test</span>
                  </Link> */}
                  {listBoards &&
                     listBoards.map((board, index) => {
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

   return (
      <>
         <div className="wrapper">
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
                     rows={3}
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
      </>
   );
};

export default WorkspaceManagement;
