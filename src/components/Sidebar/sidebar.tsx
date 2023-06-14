import React, { useEffect, useRef } from 'react';
import { Input, MenuProps, message } from 'antd';
import { Dropdown, Space } from 'antd';
import './sidebar.scss';
import { useState } from 'react';
import BoardSidebar from '../BoardSidebar';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '~/config/store';
import {
  deleteWorkspace,
  editWorkSpace,
  setNameWorkspace,
} from '~/pages/Workspace/workspace.reducer';
import { Link, useParams } from 'react-router-dom';
import ToggleWorkspace from './toggleWorkspace';
import images from '~/assets/svg';
import { setDisplayOverlay } from '../Overlay/overlay.reducer';
import ModalCustom from '../ModalCustom/modalCustom';
import Tippy from '../Tippy';
import icons from '../../assets/svg/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Loading from './SidebarLoading/loading';
import ReleaseSoon from '../ReleaseSoon/release';
const Sidebar: React.FC = () => {
  const { edit, change, manage, add } = images;
  const currentWorkSpace = useAppSelector((state) => state.workspaceSlice.currWorkspace.data);
  const listWorkspace = useAppSelector((state) => state.workspaceSlice.infoListWorkSpace.data);
  const [isRename, setIsRename] = useState(false);
  // const [dataRename, setDataRename] = useState<any>(currentWorkSpace?.name);
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { idWorkspace } = useParams();

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
  const [valueSearch, setValueSearch] = useState('');
  const [isActive, setIsActive] = useState('');
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>Rename workspace</span>,
      icon: <img src={edit} alt="icon-board" />,
      onClick: handleRenameWorkspace,
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
      icon: <img src={add} alt="" style={{width: "10px"}}/>,
      onClick: () => {
        dispatch(
          setDisplayOverlay({
            isDisplay: true,
            children: (
              <ModalCustom title="Add new workspace" type="Workspace" valueCreate="New Workspace" />
            ),
          }),
        );
      },
    },
  ];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  const handleValueSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
    //Dispatch action search
  };
  const menuWorkspaceElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
  const handleClickOutside = (e: any) => {
    if (menuWorkspaceElement.current && !menuWorkspaceElement.current.contains(e.target)) {
      setToggleWorkspace(false);
    }
  };
  const searchBoards = () => {
    const foundBoard = currentWorkSpace?.boards.filter((board) =>
      board.name.toLocaleLowerCase().includes(valueSearch),
    );
    return foundBoard;
  };
  const handleMyWork = (e:any) => {
    setIsActive(e.target.dataset.path)
    dispatch(
      setDisplayOverlay({
        isDisplay: true,
        children: <ReleaseSoon />,
      }),
    );
  }
  return (
    <>
      {contextHolder}
      <div className="sidebar__wrapper">
        <div className="sidebar__header">
          {isLoading ? (
            <Loading height="40px" />
          ) : (
            <Link
              to="/"
              className={`sidebar__header-home sidebar__header-item ${
                isActive === 'home' && 'active'
              }`}
              onClick={(e: any) => setIsActive(e.target.dataset.path)}
              data-path="home"
            >
              <img src={icons.home} alt="" />
              <span>Home</span>
            </Link>
          )}

          {/* {isLoading ? (
            <Loading height="20px" />
          ) : (
            <div
              className={`sidebar__header-mywork sidebar__header-item ${
                isActive === 'mywork' && 'active'
              }`}
              onClick={handleMyWork}
              data-path="mywork"
            >
              <img src={icons.work} alt="" />
              <span>My work</span>
            </div>
          )} */}
        </div>

        {isLoading ? (
          <Loading height="30px" />
        ) : (
          <div className="sidebar__menu-flex">
            <div
              className={`sidebar__menu-container ${toggleWorkspace && 'active'}`}
              onClick={ToggleWorkspaces}
              ref={menuWorkspaceElement}
            >
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
            <div className="sidebar__header-menu">
              <Dropdown menu={{ items }} trigger={['click']}>
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
        )}

        {isLoading ? (
          <Loading height="50px" />
        ) : (
          <div className="sidebar__features">
            <div className="sidebar__features-item search__input">
              <div className="search__btn">
                <img src={icons.search} alt="" />
              </div>
              <input
                type="text"
                value={valueSearch}
                className="search__input-sidebar"
                placeholder="Search"
                onChange={handleValueSearch}
              />
            </div>
            <Tippy html={<span>Add new board</span>} position="top">
              <div
                className="sidebar__features-item add__board"
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
              >
                <FontAwesomeIcon icon={faPlus} color="white" />
              </div>
            </Tippy>
          </div>
        )}
        {isLoading ? (
          <Loading height="30px" />
        ) : currentWorkSpace?.boards && (
          searchBoards()!.map((dataBoard) => {
            return <BoardSidebar dataBoard={dataBoard} key={dataBoard._id} height='35px' />;
          })
        )}
      </div>
    </>
  );
};

export default Sidebar;
