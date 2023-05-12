import React from 'react';
import { MenuProps, message } from 'antd';
import { Dropdown, Space } from 'antd';
import './sidebar.scss';
import { useState } from 'react';
import BoardSidebar from '../BoardSidebar';
import { DeleteOutlined, SearchOutlined, PlusOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '~/config/store';
import {
   deleteWorkspace,
   editWorkSpace,
   setNameWorkspace,
} from '~/pages/Workspace/workspace.reducer';
import { useParams } from 'react-router-dom';
import ToggleWorkspace from './toggleWorkspace';
import images from '~/assets/svg';
import { setDisplayOverlay } from '../Overlay/overlay.reducer';
import ModalCustom from '../ModalCustom/modalCustom';
import Tippy from '../Tippy';

const Sidebar: React.FC = () => {
   const { edit, change, manage, coppy, deleteIcon, move, iconBoard } = images;
   const currentWorkSpace = useAppSelector((state) => state.workspaceSlice.currWorkspace.data);
   const listWorkspace = useAppSelector((state) => state.workspaceSlice.infoListWorkSpace.data);
   const [isRename, setIsRename] = useState(false);
   // const [dataRename, setDataRename] = useState<any>(currentWorkSpace?.name);
   const dispatch = useAppDispatch();
   const [messageApi, contextHolder] = message.useMessage();
   const { idWorkspace } = useParams();
   console.log(idWorkspace);

   // get current workspace in store
   const handleRenameWorkspace = () => {
      setIsRename((pre) => !pre);
   };
   const handleOnchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      if (target.value) {
         dispatch(setNameWorkspace(e.target.value));
      }
   };
   const blurInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
      const target = e.target as HTMLInputElement;
      dispatch(
         editWorkSpace({
            name: target.value,
            idWorkspace,
         }),
      );
      setIsRename(false);
   };
   const handleDelete = () => {
      const deleteWorkSpace = async () => {
         if (listWorkspace && idWorkspace !== listWorkspace[0]._id) {
            if (idWorkspace) dispatch(deleteWorkspace({ idWorkspace }));
            messageApi.success('Đã xoá thành công');
         } else {
            messageApi.error('Bạn không được xoá Workspace mặc định');
         }
      };
      deleteWorkSpace();
   };
   const [toggleWorkspace, setToggleWorkspace] = useState(false);
   const ToggleWorkspaces = () => {
      setToggleWorkspace((pre) => !pre);
   };
   const items: MenuProps['items'] = [
      {
         key: '1',
         label: <span>Rename workspace</span>,
         icon: <img src={edit} alt="icon-board" />,
         onClick: handleRenameWorkspace,
      },
      {
         key: '2',
         label: <span>Change icon</span>,
         icon: <img src={change} alt="icon-board" />,
         children: [
            {
               key: '2-1',
               label: 'Background color',
            },
            {
               key: '2-2',
               label: 'Icon',
            },
         ],
      },
      {
         key: '3',
         label: <span>Manage workspace</span>,
         icon: <img src={manage} alt="icon-board" />,
      },
      {
         key: '4',
         label: <span>Delete</span>,
         onClick: handleDelete,
         icon: <DeleteOutlined />,
      },
      {
         key: '5',
         label: <span>Add new workspace</span>,
         onClick: () => {
            dispatch(
               setDisplayOverlay({
                  isDisplay: true,
                  children: (
                     <ModalCustom
                        title="Add new workspace"
                        type="Workspace"
                        valueCreate="New Workspace"
                     />
                  ),
               }),
            );
         },
      },
   ];
   return (
      <>
         {contextHolder}
         <div className="sidebar__wrapper">
            <div className="sidebar__header">
               <span className="sidebar__header-heading">Workspace</span>
               <div className="sidebar__header-menu">
                  <Dropdown menu={{ items }}>
                     <div onClick={(e) => e.preventDefault()}>
                        <Space>
                           <svg
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              width="20"
                              height="20"
                              aria-hidden="true"
                              className="icon_component icon-button-padding icon_component--no-focus-style"
                           >
                              <path
                                 d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z"
                                 fill="currentColor"
                              ></path>
                           </svg>
                        </Space>
                     </div>
                  </Dropdown>
               </div>
            </div>

            <div className="sidebar__menu-container" onClick={ToggleWorkspaces}>
               <div className="sidebar__menu-container--icon">
                  <span>{currentWorkSpace?.name.substring(0, 1)}</span>
               </div>
               {isRename ? (
                  <input
                     onFocus={(e) => {
                        e.preventDefault();
                     }}
                     className="menu__container--input focus__input"
                     onChange={(e) => {
                        handleOnchangeInput(e);
                     }}
                     type="text"
                     defaultValue={currentWorkSpace?.name}
                     onBlur={(e) => {
                        blurInput(e);
                     }}
                  />
               ) : (
                  <span className="menu__container--input">{currentWorkSpace?.name}</span>
               )}
               <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="18"
                  height="18"
                  aria-hidden="true"
                  className="icon_component arrow-icon icon_component--no-focus-style"
               >
                  <path
                     d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z"
                     fill="currentColor"
                     fillRule="evenodd"
                     clipRule="evenodd"
                  ></path>
               </svg>

               {toggleWorkspace && <ToggleWorkspace />}
            </div>
            <div className="sidebar__features">
               <Tippy position="top" html={<p>Add new board</p>}>
                  <div
                     onClick={() => {
                        dispatch(
                           setDisplayOverlay({
                              isDisplay: true,
                              children: (
                                 <ModalCustom
                                    title="Add new board"
                                    type="Board"
                                    valueCreate="New Board"
                                    idWorkspace={idWorkspace}
                                 />
                              ),
                           }),
                        );
                     }}
                     className="sidebar__features-item"
                  >
                     <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width="19"
                        height="19"
                        aria-hidden="true"
                        className="icon_component icon_component--no-focus-style"
                     >
                        <path
                           d="M10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V9.25H3C2.58579 9.25 2.25 9.58579 2.25 10C2.25 10.4142 2.58579 10.75 3 10.75H9.25V17C9.25 17.4142 9.58579 17.75 10 17.75C10.4142 17.75 10.75 17.4142 10.75 17V10.75H17C17.4142 10.75 17.75 10.4142 17.75 10C17.75 9.58579 17.4142 9.25 17 9.25H10.75V3Z"
                           fill="currentColor"
                           fillRule="evenodd"
                           clipRule="evenodd"
                        ></path>
                     </svg>
                     <span>Add</span>
                  </div>
               </Tippy>
               <div className="sidebar__features-item">
                  <svg
                     viewBox="0 0 20 20"
                     fill="currentColor"
                     width="19"
                     height="19"
                     aria-hidden="true"
                     className="icon_component icon_component--no-focus-style"
                  >
                     <path
                        d="M17.8571 2.87669C18.107 3.41157 18.0246 4.04275 17.6457 4.49555L12.4892 10.6589V15.3856C12.4892 16.0185 12.097 16.5852 11.5048 16.8082L9.56669 17.5381C9.09976 17.7139 8.57627 17.6494 8.16598 17.3655C7.75569 17.0816 7.51084 16.6144 7.51084 16.1155V10.6589L2.35425 4.49555C1.97542 4.04275 1.89302 3.41157 2.14291 2.87669C2.39279 2.34182 2.92977 2 3.52013 2H16.4799C17.0702 2 17.6072 2.34182 17.8571 2.87669ZM16.4799 3.52012H3.52013L8.91611 9.96964C8.99036 10.0584 9.03096 10.1698 9.03096 10.2848V16.1155L10.969 15.3856V10.2848C10.969 10.1698 11.0096 10.0584 11.0839 9.96964L16.4799 3.52012Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                     ></path>
                  </svg>
                  <span>Filters</span>
               </div>
               <div className="sidebar__features-item">
                  <svg
                     viewBox="0 0 20 20"
                     fill="currentColor"
                     width="20"
                     height="20"
                     aria-hidden="true"
                     className="icon_component search-icon"
                  >
                     <path
                        d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                     ></path>
                  </svg>
                  <span>Search</span>
               </div>
            </div>
            {currentWorkSpace?.boards &&
               currentWorkSpace.boards.map((dataBoard, index) => {
                  return <BoardSidebar dataBoard={dataBoard} key={dataBoard._id} />;
               })}
         </div>
      </>
   );
};

export default Sidebar;
