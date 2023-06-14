import { Dropdown, MenuProps } from 'antd';
import './boardSidebar.scss';
import Tippy from '../Tippy';
import { MouseEvent, useEffect, useState } from 'react';

import images from '~/assets/svg';
import { useAppDispatch, useAppSelector } from '~/config/store';
import {
   deleteBoard,
   editBoard,
   handleEditCurrBoard,
   resetCurrBoard,
} from '~/pages/Board/board.reducer';
import { IBoard } from '~/shared/model/board';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteItemBoard } from '~/pages/Workspace/workspace.reducer';

const { edit, coppy, deleteIcon, move, iconBoard } = images;

interface IPropsBoardSidebar {
   dataBoard: IBoard;
   height?:string
}

const BoardSidebar = ({ dataBoard,height }: IPropsBoardSidebar) => {
   const [valueInput, setValueInput] = useState<string>(dataBoard.name);
   useEffect(() => {
      setValueInput(dataBoard.name);
   }, [dataBoard.name]);
   const [isEditInput, setIsEditInput] = useState<boolean>(false);
   const [visible, setVisible] = useState(false);

   const handleOpenChange = (open: boolean) => {
      setVisible((prev) => !prev);
   };
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { idBoard } = useParams();
   const { idWorkspace } = useParams();

   const handleEditBoard = (
      e: React.FocusEvent<HTMLInputElement, Element> | React.KeyboardEvent<HTMLInputElement>,
   ) => {
      e.preventDefault();
      const target = e.target as HTMLInputElement;

      if (target.value && target.value !== dataBoard.name) {
         dispatch(
            handleEditCurrBoard({
               key: 'name',
               value: target.value,
            }),
         );
         dispatch(
            editBoard({
               idBoard: dataBoard._id,
               name: target.value,
            }),
         );
      }
      setIsEditInput(!isEditInput);
      // call api change name workpace
   };
   const handleDeleteBoard = () => {
      setVisible(false);
      if (idWorkspace) dispatch(deleteBoard({ id: dataBoard._id, idWorkspace }));
      dispatch(deleteItemBoard(dataBoard._id));
      if (dataBoard._id === idBoard) {
         dispatch(resetCurrBoard());
      }
   };
   const items: MenuProps['items'] = [
      {
         key: '1',
         label: <span>Rename Board</span>,
         icon: <img src={edit} alt="icon-board" />,
         onClick: () => {
            setVisible(false);
            setIsEditInput(true);
         },
      },
      {
         key: '4',
         label: <span>Delete Board</span>,
         icon: <img src={deleteIcon} alt="icon-board" />,
         onClick: handleDeleteBoard,
      },
   ];

   return (
      <div
         onClick={(e) => {
            if (!visible) {
               navigate(`/board/${dataBoard._id}/workspace/${dataBoard.belongWorkspace}`);
               setVisible(false);
            }
         }}
         className={`item__board ${dataBoard._id === idBoard ? 'board__info--active' : ''}`}
         style={{height: height}}
      >
         <div className={`board__info`}>
            <svg
               viewBox="0 0 20 20"
               fill="currentColor"
               width="19"
               height="19"
               aria-hidden="true"
               aria-label="Public board"
               className="board__icon"
            >
               <path
                  d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
               ></path>
            </svg>
            {isEditInput ? (
               <input
                  autoFocus
                  value={valueInput}
                  onChange={(e) => {
                     setValueInput(e.target.value);
                  }}
                  onBlur={handleEditBoard}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                        handleEditBoard(e);
                     }
                  }}
                  className="board__title--input"
               />
            ) : (
               <span className="board__title">{valueInput}</span>
            )}
         </div>
         <Dropdown onOpenChange={handleOpenChange} menu={{ items }} trigger={['click']}>
            <button
               onClick={(e) => {
                  e.stopPropagation();
               }}
               className="board__btn--dot"
            >
               ...
            </button>
         </Dropdown>
      </div>
   );
};

export default BoardSidebar;
