import React, { useEffect } from 'react';
import './board.scss';
import { faCircleExclamation, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabCustom from '~/components/TabCustom';
import Tippy from '~/components/Tippy';
import MainTable from '~/components/MainTable';
import Cards from '~/components/Cards';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getBoardDetail, getListBoards } from './board.reducer';
import { getDetailWorkspace } from '../Workspace/workspace.reducer';
import Trash from '../Trash/trash';
const Board = () => {
   const { idBoard } = useParams();
   const dispatch = useAppDispatch();
   const currBoard = useAppSelector((state) => state.boardSlice.currBoard.data);
   const cuurWorkspace = useAppSelector((state) => state.workspaceSlice.currWorkspace.data);
   const { idWorkspace } = useParams();
   const navigate = useNavigate();
   console.log(idWorkspace);
   useEffect(() => {
      if (!cuurWorkspace && idWorkspace) {
         dispatch(
            getDetailWorkspace({
               idWorkspace,
            }),
         );
      }
   }, [cuurWorkspace]);
   console.log(idBoard);
   useEffect(() => {
      if (idBoard) {
         dispatch(
            getBoardDetail({
               id: idBoard,
            }),
         );
      }
   }, [idBoard]);
   return (
      <div className="board__wrapper">
         {!currBoard ? (
            <Trash />
         ) : (
            <TabCustom
               arr={[
                  {
                     label: (
                        <Tippy position="top" html={<p>Main table</p>}>
                           <span>
                              <FontAwesomeIcon className="icon__table" icon={faHouse} />
                              Main table
                           </span>
                        </Tippy>
                     ),
                     info: <MainTable />,
                  },
                  {
                     label: (
                        <Tippy position="top" html={<p>Cards</p>}>
                           <span>
                              <FontAwesomeIcon className="icon__table" icon={faCircleExclamation} />
                              Cards
                           </span>
                        </Tippy>
                     ),
                     info: <Cards />,
                  },
               ]}
            />
         )}
      </div>
   );
};

export default Board;
