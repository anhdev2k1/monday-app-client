import React, { useEffect, useState } from 'react';
import './board.scss';
import { faCircleExclamation, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabCustom from '~/components/TabCustom';
import Tippy from '~/components/Tippy';
import MainTable from '~/components/MainTable';
import Cards from '~/components/Cards';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import {
   getBoardDetail,
   handleAddColumn,
   handleAddValueIntoTask,
   handleEditCurrBoard,
   setIndexTab,
} from './board.reducer';
import { getDetailWorkspace } from '../Workspace/workspace.reducer';
import Trash from '../Trash/trash';
import icons from '../../assets/svg/index';
import { Input } from 'antd';
import LoadingLogo from '~/components/LoadingLogo/loadingLogo';
import { getListTypes } from '~/components/ListTypes/listTypes.reducer';
import { resetDataCreateCol } from '~/components/MainTable/mainTable.reducer';
const Board = () => {
   const { idBoard } = useParams();
   const dispatch = useAppDispatch();
   const currBoard = useAppSelector((state) => state.boardSlice.currBoard.data);
   const currWorkspace = useAppSelector((state) => state.workspaceSlice.currWorkspace.data);
   const { idWorkspace } = useParams();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const dataCreateCol = useAppSelector((state) => state.mainTableSlice.createCol.data);

   useEffect(() => {
      if (!currWorkspace && idWorkspace) {
         dispatch(
            getDetailWorkspace({
               idWorkspace,
            }),
         );
      }
   }, [currWorkspace, dispatch, idWorkspace]);
   useEffect(() => {
      setTimeout(() => {
         setIsLoading(false);
      }, 1500);
   }, []);
   useEffect(() => {
      if (idBoard) {
         dispatch(
            getBoardDetail({
               id: idBoard,
            }),
         );
      }
   }, [dispatch, idBoard]);
   const [isEditName, setEditName] = useState(false);

   const handleEditBoard = (value: string) => {
      if (value && value !== currBoard?.name) {
         dispatch(
            handleEditCurrBoard({
               key: 'name',
               value,
            }),
         );
      }
      setEditName(false);
   };

   useEffect(() => {
      dispatch(getListTypes());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (dataCreateCol !== undefined) {
         dispatch(
            handleAddColumn({
               newData: dataCreateCol.column,
            }),
         );
         dispatch(
            handleAddValueIntoTask({
               position: dataCreateCol.column.position,
               newValuesOfTasks: dataCreateCol.tasksColumns,
            }),
         );
      }
      dispatch(resetDataCreateCol());
   }, [dataCreateCol, dispatch]);

   const changeIndexInterface = (index: 0 | 1) => {
      dispatch(setIndexTab({ index }));
   };

   return (
      <>
         {isLoading ? (
            <LoadingLogo height="100%" />
         ) : (
            <div className="board__wrapper">
               <div className="board__wrapper-title">
                  <div className="wrapper__title-heading">
                     {isEditName ? (
                        <Input
                           defaultValue={currBoard?.name}
                           autoFocus
                           onBlur={(e) => {
                              handleEditBoard(e.target.value);
                           }}
                           style={{ width: '60%' }}
                        />
                     ) : (
                        <h2 onClick={() => setEditName(true)}>{currBoard?.name}</h2>
                     )}
                     <Tippy html="Show board description" position="bottom">
                        <div className="boar__wrap-title-item">
                           <img src={icons.info} alt="" />
                        </div>
                     </Tippy>

                     <Tippy html="Add to favorite" position="bottom">
                        <div className="boar__wrap-title-item">
                           <img src={icons.heart} alt="" />
                        </div>
                     </Tippy>
                  </div>
               </div>
               {!currBoard ? (
                  <Trash />
               ) : (
                  <TabCustom
                     arr={[
                        {
                           label: (
                              <Tippy position="top" html={<p>Main table</p>}>
                                 <span
                                    style={{ fontSize: '1.4rem', fontWeight: '500' }}
                                    onClick={() => changeIndexInterface(0)}
                                 >
                                    <FontAwesomeIcon className="icon__table" icon={faHouse} />
                                    Main table
                                 </span>
                              </Tippy>
                           ),
                           info: <MainTable idBoard={idBoard} />,
                        },
                        {
                           label: (
                              <Tippy position="top" html={<p>Cards</p>}>
                                 <span
                                    style={{ fontSize: '1.4rem', fontWeight: '500' }}
                                    onClick={() => changeIndexInterface(1)}
                                 >
                                    <FontAwesomeIcon
                                       className="icon__table"
                                       icon={faCircleExclamation}
                                    />
                                    Cards
                                 </span>
                              </Tippy>
                           ),
                           info: <Cards idBoard={idBoard} />,
                        },
                     ]}
                  />
               )}
            </div>
         )}
      </>
   );
};

export default Board;
