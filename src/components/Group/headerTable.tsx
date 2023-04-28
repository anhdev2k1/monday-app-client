import React from 'react';
import './group.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ResizableBox from '../Resizable';
const HeaderTable = () => {
   return (
      <ul className="cols__group">
         <li className="col__group__item">
            <label htmlFor="checked"></label>
            <input type="checkbox" id="checked" />
         </li>
         <ResizableBox id={0}>
            <span>Items</span>
         </ResizableBox>
         <ResizableBox id={1}>
            <span>Status</span>
         </ResizableBox>
         <ResizableBox id={2}>
            <span>Date</span>
         </ResizableBox>
         <ResizableBox id={3}>
            <span>Numbers</span>
         </ResizableBox>
         <li className="col__group__item">
            <input className="col__group--check" type="checkbox" id="plus--col" />
            <label className="plus__lable" htmlFor="plus--col">
               <div className="input--icon">
                  <FontAwesomeIcon icon={faPlus} />
               </div>
            </label>
         </li>
      </ul>
   );
};

export default HeaderTable;
