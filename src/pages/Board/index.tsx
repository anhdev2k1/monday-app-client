import React, { useEffect } from 'react';
import './board.scss';
import { faCircleExclamation, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabCustom from '~/components/TabCustom';
import Tippy from '~/components/Tippy';
import MainTable from '~/components/MainTable';
import Cards from '~/components/Cards';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '~/config/store';
import { getBoardDetail } from './board.reducer';
const Board = () => {
   const { idBoard } = useParams();
   const dispatch = useAppDispatch();
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
         <p className="board__title">
            <span>Monday</span> <FontAwesomeIcon icon={faCircleExclamation} />
         </p>

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
      </div>
   );
};

export default Board;
