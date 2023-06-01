import React, { forwardRef, Ref } from 'react';
import { useAppSelector } from '~/config/store';
import { getListTypes } from './listTypes.reducer';
import './listTypes.scss';
import ButtonCustom from '../Button/ButtonCustom';

interface IListTypesProps {
   handleAddColumn: (id: string) => void;
}

const ListTypes: React.ForwardRefRenderFunction<HTMLDivElement, IListTypesProps> = (
   { handleAddColumn },
   ref: Ref<HTMLDivElement>,
) => {
   const listTypes = useAppSelector((state) => state.listTypesSlice.listTypes.datas);

   return (
      <div className="list__types--custom" onClick={(e) => {}} ref={ref}>
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

const ListType = forwardRef(ListTypes);

export default ListType;
