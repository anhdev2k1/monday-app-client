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
const Card = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isOpenStatus, setIsOpenStatus] = useState(false);
   return (
      <>
         <div className="card__item" style={{ width: 'calc(calc(100% / 3) - 20px)' }}>
            <div className="card__item-img">
               <FontAwesomeIcon icon={faCircleUser} />
            </div>
            <div className="card__item-title">
               <div className="card__title-header">
                  <span className="card__title-header--heading">Project 2</span>
                  <div className="card__icon">
                     <FontAwesomeIcon icon={faPlus} />
                  </div>
               </div>
               <div className="card__title-features">
                  <div className="card__title-features-item">
                     <div className="title__feature-name">
                        <FontAwesomeIcon icon={faCircleUser} />
                        <span>Person</span>
                     </div>
                     <div
                        className="title__feature-btn title__feature-add"
                        onClick={() => setIsOpen((pre) => !pre)}
                     >
                        <FontAwesomeIcon icon={faCircleUser} />
                        <div className="title__feature-btn--hover">
                           <FontAwesomeIcon icon={faPlus} />
                        </div>
                        {isOpen && <AddPeople />}
                     </div>
                  </div>
                  <div className="card__title-features-item">
                     <div className="title__feature-name">
                        <FontAwesomeIcon icon={faList} />
                        <span>Status</span>
                     </div>
                     <div
                        className="title__feature-btn title__feature-status"
                        onClick={() => setIsOpenStatus((pre) => !pre)}
                     >
                        <span>Done</span>
                        {isOpenStatus && <ChangeStatus />}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Card;
