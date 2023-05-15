import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getListTypes } from './listTypes.reducer';
import './listTypes.scss';
import ButtonCustom from '../Button/ButtonCustom';
const ListType = () => {
   const listTypes = useAppSelector((state) => state.listTypesSlice.listTypes.datas);

   return (
      <div className="list__types--custom">
         <ul className="list__types">
            {listTypes &&
               listTypes.map((typeItem, index) => {
                  return (
                     <li className="type__item" key={typeItem._id}>
                        <ButtonCustom
                           leftIcon={
                              <img
                                 className="list__types-icon"
                                 src="https://cdn.monday.com/images/column-store/columns/numeric-column-icon.svg"
                                 alt="icon"
                              />
                           }
                           title={typeItem.name}
                        />
                     </li>
                  );
               })}
         </ul>
      </div>
   );
};

export default ListType;
