import React from 'react';
import { MenuProps, message } from 'antd';
import { Dropdown, Space } from 'antd';
import './sidebar.scss';
import { useState } from 'react';
import BoardSidebar from '../BoardSidebar';
import ModalBox from '../Modal';
import { DeleteOutlined, SearchOutlined, PlusOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '~/config/store';
import {
   deleteWorkspace,
   editWorkSpace,
   setNameWorkspace,
} from '~/pages/Workspace/workspace.reducer';
import { useParams } from 'react-router-dom';
import ToggleWorkspace from './toggleWorkspace';

const Sidebar: React.FC = () => {
   const currentWorkSpace = useAppSelector((state) => state.workspaceSlice.currWorkspace.data);
   const listWorkspace = useAppSelector((state) => state.workspaceSlice.infoListWorkSpace.data);
   const [isRename, setIsRename] = useState(false);
   // const [dataRename, setDataRename] = useState<any>(currentWorkSpace?.name);
   const dispatch = useAppDispatch();
   const [messageApi, contextHolder] = message.useMessage();
   const { idWorkSpace } = useParams();

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
            idWorkSpace,
         }),
      );
      setIsRename(false);
   };
   const handleDelete = () => {
      const deleteWorkSpace = async () => {
         if (listWorkspace && idWorkSpace !== listWorkspace[0]._id) {
            if (idWorkSpace) dispatch(deleteWorkspace({ idWorkSpace }));
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
         label: <span onClick={handleRenameWorkspace}>Rename workspace</span>,
         icon: (
            <svg
               viewBox="0 0 20 20"
               fill="currentColor"
               width="16"
               height="16"
               aria-hidden="true"
               aria-label="Rename workspace"
               className="icon_component icon_component--no-focus-style"
            >
               <path
                  d="M13.8542 3.59561C13.8541 3.59568 13.8542 3.59555 13.8542 3.59561L4.80915 12.6503L3.81363 16.189L7.35682 15.1957L16.4018 6.14C16.4746 6.06722 16.5161 5.96795 16.5161 5.86503C16.5161 5.76221 16.4753 5.6636 16.4026 5.59083C16.4025 5.59076 16.4026 5.59091 16.4026 5.59083L14.4038 3.59568C14.3309 3.52292 14.232 3.48197 14.1289 3.48197C14.026 3.48197 13.927 3.52297 13.8542 3.59561ZM12.8051 2.54754C13.1562 2.19695 13.6324 2 14.1289 2C14.6254 2 15.1016 2.19693 15.4527 2.54747C15.4527 2.5475 15.4527 2.54745 15.4527 2.54747L17.4515 4.54263C17.8026 4.89333 18 5.36914 18 5.86503C18 6.36091 17.8028 6.8365 17.4518 7.18719L8.26993 16.3799C8.17984 16.4701 8.06798 16.5356 7.94516 16.57L2.94244 17.9724C2.68418 18.0448 2.4069 17.9723 2.21725 17.7829C2.0276 17.5934 1.95512 17.3165 2.02768 17.0586L3.43296 12.0633C3.46728 11.9413 3.53237 11.8301 3.62199 11.7404L12.8051 2.54754Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
               ></path>
            </svg>
         ),
      },
      {
         key: '2',
         label: <span>Change icon</span>,
         icon: (
            <svg
               viewBox="0 0 20 20"
               fill="currentColor"
               width="16"
               height="16"
               aria-hidden="true"
               aria-label="Change icon"
               className="icon_component icon_component--no-focus-style"
            >
               <path
                  d="M5.44542 4.42902C5.73759 4.13541 5.73643 3.66054 5.44282 3.36836C5.1492 3.07619 4.67433 3.07736 4.38216 3.37097L2.17374 5.59026C1.88157 5.88387 1.88273 6.35874 2.17634 6.65091L4.39591 8.85961C4.68952 9.15179 5.16439 9.15062 5.45657 8.85701C5.74874 8.5634 5.74758 8.08853 5.45396 7.79635L4.50297 6.85001H17.1999C17.6141 6.85001 17.9499 6.51422 17.9499 6.10001C17.9499 5.6858 17.6141 5.35001 17.1999 5.35001H4.52894L5.44542 4.42902ZM15.3708 14.5833L14.4543 15.5043C14.1621 15.7979 14.1633 16.2728 14.4569 16.565C14.7505 16.8572 15.2254 16.856 15.5176 16.5624L17.726 14.3431C18.0182 14.0495 18.017 13.5746 17.7234 13.2824L15.5038 11.0737C15.2102 10.7816 14.7353 10.7827 14.4432 11.0763C14.151 11.37 14.1522 11.8448 14.4458 12.137L15.3968 13.0833L2.69995 13.0833C2.28574 13.0833 1.94995 13.4191 1.94995 13.8333C1.94995 14.2476 2.28574 14.5833 2.69995 14.5833L15.3708 14.5833Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
               ></path>
            </svg>
         ),
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
         icon: (
            <svg
               viewBox="0 0 20 20"
               fill="currentColor"
               width="16"
               height="16"
               aria-hidden="true"
               aria-label="Manage workspace"
               className="icon_component icon_component--no-focus-style"
            >
               <path
                  d="M9.85532 3.75C9.77634 3.75 9.6992 3.7738 9.63396 3.8183C9.56871 3.86281 9.5184 3.92594 9.48957 3.99946L8.9889 5.27515C8.92686 5.43321 8.81303 5.56554 8.66603 5.6505L7.00888 6.60821C6.86142 6.69343 6.68935 6.72593 6.52097 6.70035L5.16775 6.4948C5.16763 6.49478 5.16787 6.49482 5.16775 6.4948C5.08965 6.48312 5.00948 6.4952 4.93837 6.52957C4.86716 6.56398 4.80799 6.6191 4.76861 6.68769L4.76695 6.69058L4.303 7.49048C4.30298 7.49051 4.30301 7.49045 4.303 7.49048C4.26333 7.55894 4.2452 7.63787 4.25109 7.71676C4.25698 7.7957 4.28657 7.87101 4.336 7.93284L5.19117 9.00409C5.29725 9.13698 5.35503 9.30196 5.35503 9.472V11.3851C5.35503 11.5549 5.29743 11.7197 5.19165 11.8524L4.3368 12.9256C4.28754 12.9873 4.25775 13.0629 4.25186 13.1417C4.24599 13.2202 4.26389 13.2988 4.30324 13.3671C4.30332 13.3672 4.30315 13.3669 4.30324 13.3671L4.76781 14.1681C4.8073 14.2365 4.86652 14.2915 4.93773 14.3257C5.00893 14.36 5.08882 14.372 5.16696 14.3602L6.52097 14.1545C6.68935 14.1289 6.86142 14.1614 7.00888 14.2466L8.66602 15.2044C8.81303 15.2893 8.92686 15.4217 8.9889 15.5797L9.48947 16.8551C9.5183 16.9287 9.56871 16.9921 9.63396 17.0366C9.6992 17.0811 9.77634 17.1049 9.85532 17.1049H10.7833C10.8623 17.1049 10.9394 17.0811 11.0047 17.0366C11.0699 16.9921 11.1202 16.9289 11.1491 16.8554L11.6497 15.5797C11.7118 15.4217 11.8256 15.2893 11.9726 15.2044L13.6297 14.2466C13.7772 14.1614 13.9493 14.1289 14.1177 14.1545L15.4717 14.3602C15.5498 14.372 15.6297 14.36 15.7009 14.3257C15.7721 14.2915 15.8313 14.2365 15.8708 14.1681L15.8717 14.1666L16.3356 13.3667C16.3753 13.2982 16.3934 13.2193 16.3875 13.1404C16.3816 13.0614 16.3521 12.9861 16.3026 12.9243L15.4475 11.8531C15.3414 11.7202 15.2836 11.5552 15.2836 11.3851V9.472C15.2836 9.3025 15.341 9.138 15.4465 9.00531L16.3021 7.9289C16.3514 7.86715 16.3809 7.79198 16.3868 7.71321C16.3926 7.63461 16.3747 7.55606 16.3354 7.48778C16.3353 7.48763 16.3355 7.48793 16.3354 7.48778L15.8708 6.68679C15.8313 6.61833 15.7721 6.56339 15.7009 6.52911C15.6297 6.49484 15.5498 6.48284 15.4717 6.49468L14.1177 6.70035C13.9493 6.72593 13.7772 6.69343 13.6297 6.60821L11.9726 5.6505C11.8256 5.56554 11.7118 5.43321 11.6497 5.27515L11.1492 3.99972C11.1203 3.92619 11.0699 3.86281 11.0047 3.8183C10.9394 3.7738 10.8623 3.75 10.7833 3.75H9.85532ZM8.78875 2.5791C9.10311 2.36469 9.47479 2.25 9.85531 2.25H10.7833C11.1638 2.25 11.5355 2.36469 11.8499 2.5791C12.1642 2.79347 12.4066 3.09755 12.5455 3.45171C12.5455 3.45179 12.5454 3.45162 12.5455 3.45171L12.9502 4.48301L14.1525 5.17785L15.2467 5.01165C15.6231 4.95461 16.0083 5.01239 16.3514 5.17751C16.6942 5.34248 16.9793 5.60687 17.1695 5.93622C17.1697 5.93655 17.1699 5.93688 17.1701 5.93721L17.6338 6.73667C17.8243 7.06618 17.911 7.44546 17.8826 7.82499C17.8542 8.20443 17.7122 8.56651 17.475 8.86401C17.4749 8.86409 17.475 8.86393 17.475 8.86401L16.7836 9.73377V11.1225L17.4743 11.9877C17.7124 12.2856 17.855 12.6485 17.8834 13.0288C17.9118 13.4091 17.8246 13.7891 17.6333 14.1191L17.1701 14.9176C17.1699 14.9179 17.1698 14.9182 17.1696 14.9185C16.9793 15.2479 16.6942 15.5124 16.3514 15.6773C16.0083 15.8425 15.6234 15.9003 15.247 15.8433L14.1525 15.677L12.9502 16.3718L12.5456 17.4029C12.5455 17.403 12.5456 17.4028 12.5456 17.4029C12.4067 17.757 12.1642 18.0614 11.8499 18.2758C11.5355 18.4902 11.1638 18.6049 10.7833 18.6049H9.85531C9.47479 18.6049 9.10311 18.4902 8.78875 18.2758C8.47446 18.0614 8.23206 17.7573 8.09316 17.4032C8.09313 17.4031 8.09319 17.4032 8.09316 17.4032L7.6884 16.3718L6.48611 15.677L5.39194 15.8432C5.01548 15.9003 4.63029 15.8425 4.2872 15.6773C3.94439 15.5124 3.65926 15.2479 3.46899 14.9185C3.46884 14.9182 3.46915 14.9187 3.46899 14.9185L3.00484 14.1182C2.81438 13.7887 2.72767 13.4094 2.75603 13.0299C2.78438 12.6505 2.9264 12.2885 3.16355 11.991L3.85503 11.1229V9.73465L3.16434 8.86945C2.92621 8.57155 2.78362 8.20867 2.75525 7.82836C2.72687 7.44804 2.81405 7.06802 3.00534 6.73809L3.46867 5.93925C3.65841 5.6095 3.94312 5.34456 4.28569 5.17901C4.62882 5.01319 5.01402 4.9548 5.39088 5.01149L5.39195 5.01165L6.48611 5.17785L7.6884 4.48301L8.09306 3.45196C8.23195 3.0977 8.47439 2.79352 8.78875 2.5791ZM8.17274 8.282C8.74205 7.71269 9.51419 7.39286 10.3193 7.39286C10.9197 7.39286 11.5066 7.5709 12.0059 7.90447C12.5051 8.23804 12.8942 8.71215 13.1239 9.26685C13.3537 9.82156 13.4138 10.4319 13.2967 11.0208C13.1796 11.6097 12.8904 12.1506 12.4659 12.5751C12.0413 12.9997 11.5004 13.2888 10.9116 13.406C10.3227 13.5231 9.7123 13.463 9.1576 13.2332C8.60289 13.0034 8.12878 12.6143 7.79521 12.1151C7.46164 11.6159 7.2836 11.029 7.2836 10.4286C7.2836 9.62345 7.60343 8.8513 8.17274 8.282ZM10.3193 8.89286C9.91202 8.89286 9.5214 9.05466 9.2334 9.34266C8.9454 9.63066 8.7836 10.0213 8.7836 10.4286C8.7836 10.7323 8.87367 11.0292 9.04241 11.2818C9.21116 11.5343 9.45101 11.7312 9.73162 11.8474C10.0122 11.9636 10.321 11.994 10.6189 11.9348C10.9168 11.8755 11.1905 11.7293 11.4052 11.5145C11.62 11.2997 11.7663 11.0261 11.8255 10.7282C11.8848 10.4303 11.8544 10.1215 11.7381 9.84088C11.6219 9.56026 11.4251 9.32042 11.1725 9.15167C10.92 8.98293 10.623 8.89286 10.3193 8.89286Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
               ></path>
            </svg>
         ),
      },
      {
         key: '4',
         label: <span onClick={handleDelete}>Delete</span>,
         icon: <DeleteOutlined />,
      },
      {
         key: '5',
         label: <ModalBox label="Add new workspace" icon="" />,
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
                        d="M10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V9.25H3C2.58579 9.25 2.25 9.58579 2.25 10C2.25 10.4142 2.58579 10.75 3 10.75H9.25V17C9.25 17.4142 9.58579 17.75 10 17.75C10.4142 17.75 10.75 17.4142 10.75 17V10.75H17C17.4142 10.75 17.75 10.4142 17.75 10C17.75 9.58579 17.4142 9.25 17 9.25H10.75V3Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                     ></path>
                  </svg>
                  <span>Add</span>
               </div>
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

            <BoardSidebar />
         </div>
      </>
   );
};

export default Sidebar;
