import React, { useState } from 'react';
import './group.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ResizableBox from '../Resizable';
import { IColumn } from '~/shared/model/column';
import ListType from '../ListTypes/listTypes';

interface IPropsHeaderTable {
   columns: IColumn[];
}
const HeaderTable = ({ columns }: IPropsHeaderTable) => {
   const [isOpenListTypes, setIsOpenListTypes] = useState<boolean>(false);
   return (
      <ul className="cols__group">
         <li className="col__group__item">
            <label htmlFor="checked"></label>
            <input type="checkbox" id="checked" />
         </li>
         <ResizableBox id={'0'}>
            <span>Item</span>
         </ResizableBox>
         {columns.map((col, index) => {
            return (
               <ResizableBox key={col._id} id={col._id}>
                  <span>{col.name}</span>
               </ResizableBox>
            );
         })}
         <li className="col__group__item">
            <input className="col__group--check" type="checkbox" id="plus--col" />
            <label className="plus__lable" htmlFor="plus--col">
               <div
                  onClick={() => {
                     setIsOpenListTypes((prev) => !prev);
                  }}
                  className="input--icon"
               >
                  <FontAwesomeIcon icon={faPlus} />
                  {isOpenListTypes && <ListType />}
               </div>
            </label>
         </li>
      </ul>
   );
};

export default HeaderTable;
