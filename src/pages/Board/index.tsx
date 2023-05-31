import React, { useEffect } from 'react';
import './board.scss';
import { faCircleExclamation, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabCustom from '~/components/TabCustom';
import Tippy from '~/components/Tippy';
import MainTable from '~/components/MainTable';
import Cards from '~/components/Cards';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getBoardDetail, setIndexTab } from './board.reducer';
import { getDetailWorkspace } from '../Workspace/workspace.reducer';
import Trash from '../Trash/trash';
import { getListTypes } from '~/components/ListTypes/listTypes.reducer';
const Board = () => {
   const { idBoard } = useParams();
   const dispatch = useAppDispatch();
   const currBoard = useAppSelector((state) => state.boardSlice.currBoard.data);
   const cuurWorkspace = useAppSelector((state) => state.workspaceSlice.currWorkspace.data);
   const { idWorkspace } = useParams();
   useEffect(() => {
      if (!cuurWorkspace && idWorkspace) {
         dispatch(
            getDetailWorkspace({
               idWorkspace,
            }),
         );
      }
   }, [cuurWorkspace, dispatch, idWorkspace]);
   useEffect(() => {
      if (idBoard) {
         dispatch(
            getBoardDetail({
               id: idBoard,
            }),
         );
      }
   }, [dispatch, idBoard]);

   useEffect(() => {
      dispatch(getListTypes());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   console.log('board render');

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
                           <span
                              style={{
                                 display: 'block',
                              }}
                              onClick={() => {
                                 dispatch(
                                    setIndexTab({
                                       index: 0,
                                    }),
                                 );
                              }}
                           >
                              <FontAwesomeIcon className="icon__table" icon={faHouse} />
                              Main table
                           </span>
                        </Tippy>
                     ),
                     info: <MainTable currBoard={currBoard} />,
                  },
                  {
                     label: (
                        <Tippy position="top" html={<p>Cards</p>}>
                           <span
                              style={{
                                 display: 'block',
                              }}
                              onClick={() => {
                                 dispatch(
                                    setIndexTab({
                                       index: 1,
                                    }),
                                 );
                              }}
                           >
                              <FontAwesomeIcon className="icon__table" icon={faCircleExclamation} />
                              Cards
                           </span>
                        </Tippy>
                     ),
                     info: <Cards currBoard={currBoard} />,
                  },
               ]}
            />
         )}
      </div>
   );
};

export default Board;
