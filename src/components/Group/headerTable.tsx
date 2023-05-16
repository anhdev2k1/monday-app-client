import React from 'react';
import './group.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ResizableBox from '../Resizable';
import { IColumn } from '~/shared/model/column';
import { IGroup } from '~/shared/model/group';
interface IPropsHeaderTable {
   columns: IColumn[];
   data: IGroup;
}
const HeaderTable = ({ columns, data }: IPropsHeaderTable) => {
   console.log('data', data);

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
               <>
                  <ResizableBox key={col._id} id={col._id}>
                     <span>{col.name}</span>
                  </ResizableBox>
               </>
            );
         })}
         <li className="col__group__item">
            <input className="col__group--check" type="checkbox" id="plus--col" />
            <label className="plus__lable" htmlFor="plus--col">
               <div className="input--icon">
                  <FontAwesomeIcon icon={faPlus} />
               </div>
            </label>
         </li>
      </ul>
   )
};

export default HeaderTable;
