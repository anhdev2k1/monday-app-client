import ButtonCustom from '../Button/ButtonCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './headView.scss';
import {
   faAngleDown,
   faEyeSlash,
   faMagnifyingGlass,
   faSort,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '../Tippy';
import { StatusType } from '~/shared/model/global';
import icons from '../../assets/svg/index';
import ColumnFilter from './ColumnFilter/columnFilter';
import { useAppSelector } from '~/config/store';
import { useEffect, useRef, useState } from 'react';

const HeadView = () => {
   let countNames: { [key: string]: number } = {};
   const currentBoard = useAppSelector((state) => state.boardSlice.currBoard.data);
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef<any>(null);
   const listGroup = useAppSelector((state) => state.boardSlice.currBoard.data?.groups)?.flatMap(
      (gr) => gr.tasks,
   );
   const duplicateNumberOfTask = () => {
      listGroup?.forEach((item) => {
         if (countNames[item.name]) {
            countNames[item.name]++;
         } else {
            countNames[item.name] = 1;
         }
      });
   };
   duplicateNumberOfTask();

   
   useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
   });
   const handleClickOutside = (event:any) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
   return (
      <div className="table__head">
         <ButtonCustom
            statusType={StatusType.Primary}
            title="New item"
            rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
         />
         <ButtonCustom title="Search" leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />} />
         <Tippy position="top" html={<p>Filter by anything</p>}>
            <div className="filter" onClick={() => setIsOpen(pre => !pre)} ref={dropdownRef}>
               <div className="filter__icon">
                  <img src={icons.filter} alt="" />
               </div>
               <span>Filter</span>
               <div className="filter__icon filter__down">
                  <FontAwesomeIcon icon={faAngleDown} />
               </div>
               {isOpen && (
                  <div className="filter__menu" onClick={() => setIsOpen(false)}>
                     <div className="filter__menu-header">
                        <h3 className="filter__menu-header-heading">Quick filters</h3>
                        <span>Showing all of 4 tasks</span>
                        <div className="filter__menu-clear">
                           <button className="filter__menu-clear-btn">Clear all</button>
                        </div>
                     </div>

                     <div className="filter__menu-content">
                        <div className="filter__menu-column">
                           <h3>All columns</h3>
                           <div className="filter__menu-column-wrapper">
                              <div className="menu__column-wrapper">
                                 <h3 className="menu__column-wrapper-heading">Group</h3>
                                 <div className="menu__column-list">
                                    {currentBoard?.groups &&
                                       currentBoard.groups.map((gr) => {
                                          return (
                                             <div className="menu__column-item">
                                                <span>{gr.name}</span>
                                                <p className="column__item-number">
                                                   {gr.tasks.length}
                                                </p>
                                             </div>
                                          );
                                       })}
                                 </div>
                              </div>

                              <div className="menu__column-wrapper">
                                 <h3 className="menu__column-wrapper-heading">Name</h3>
                                 <div className="menu__column-list">
                                    {listGroup &&
                                       listGroup.map((gr) => {
                                          return (
                                             <div className="menu__column-item">
                                                <span>{gr.name}</span>
                                                <p className="column__item-number">
                                                   {countNames[gr.name]}
                                                </p>
                                             </div>
                                          );
                                       })}
                                 </div>
                              </div>

                              {currentBoard?.columns &&
                                 currentBoard.columns.map((col) => {
                                    return <ColumnFilter columnData={col} />;
                                 })}
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </Tippy>
         <Tippy position="top" html={<p>Sort by any column</p>}>
            <ButtonCustom title="Sort" leftIcon={<FontAwesomeIcon icon={faSort} />} />
         </Tippy>
         <Tippy position="top" html={<p>Hidden columns</p>}>
            <ButtonCustom title="Hide" leftIcon={<FontAwesomeIcon icon={faEyeSlash} />} />
         </Tippy>
      </div>
   );
};

export default HeadView;
