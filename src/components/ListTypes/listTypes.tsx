import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getListTypes } from './listTypes.reducer';
import './listTypes.scss';
import ButtonCustom from '../Button/ButtonCustom';
interface ILisTTypesProps {
   handleAddColumn: (id: string) => void;
}
const ListType = ({ handleAddColumn }: ILisTTypesProps) => {
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
                                 src={typeItem.icon}
                                 style={{
                                    backgroundColor: `${typeItem.color}`,
                                 }}
                                 alt="icon"
                              />
                           }
                           title={typeItem.name}
                           onClick={() => handleAddColumn(typeItem._id)}
                        />
                     </li>
                  );
               })}
         </ul>
      </div>
   );
};

export default ListType;
