import {
   EditOutlined,
   PlusCircleOutlined,
   SearchOutlined,
   UserAddOutlined,
} from '@ant-design/icons';
import { faCircleUser, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Input } from 'antd';
import './card.scss';
import AddPeople from '~/components/AddPeple';
import ChangeStatus from '../ChangeStatus';
import { ITaskCard } from '../Cards';
import ItemInCard from './ItemInCard/itemInCard';
import images from '~/assets/svg';
import Tippy from '../Tippy';
import { useAppDispatch } from '~/config/store';
import { setDisplayOverlay } from '../Overlay/overlay.reducer';
import ModalCardDetail from './ModalCardDetail/modalCardDetail';
interface IPropsCard {
   task: ITaskCard;
}
const Card = ({ task }: IPropsCard) => {
   const { iconDesTask } = images;
   const dispatch = useAppDispatch();
   const handleShowModalCartDetail = () => {
      dispatch(
         setDisplayOverlay({
            isDisplay: true,
            children: <ModalCardDetail task={task} />,
         }),
      );
   };
   return (
      <div onClick={handleShowModalCartDetail} className="card__item">
         {/* <div className="card__item-img">
            <FontAwesomeIcon icon={faCircleUser} />
         </div> */}
         <div className="card__item-title">
            <div className="card__title-header">
               <span className="card__title-header--heading">{task.name}</span>
               <Tippy position="top" html={<p>Start Conversation</p>}>
                  <button className="card__icon--plus">
                     <img src={iconDesTask} alt="card__icon--plus" />
                     {/* <IconDesTask /> */}
                  </button>
               </Tippy>
            </div>
            <div className="card__title-features">
               {task.columns.map((column, index) => {
                  if (column.belongType.name === 'status') {
                     return (
                        <ItemInCard
                           task={task}
                           key={column._id}
                           column={column}
                           value={task.values[index]}
                        />
                     );
                  }
               })}
            </div>
         </div>
      </div>
   );
};

export default Card;
