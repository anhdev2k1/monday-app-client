import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterColumn } from '~/pages/Board/board.reducer';
import { IDefaultValue } from '~/shared/model/column';

interface IColumnFilterItemProps {
   columnValue: IDefaultValue;
}
const ColumnFilterItem = ({ columnValue }: IColumnFilterItemProps) => {
   const [isActive, setIsActive] = useState<boolean>(false);
   const dispatch = useDispatch()
   const handleFilter = (id:string) => {
      setIsActive((pre) => !pre);
      dispatch(setFilterColumn({_id:id}))
   };
   return (
      <>
         <div className={`menu__column-item ${isActive && 'active'}`} key={columnValue._id} onClick={() => handleFilter(columnValue._id)}>
            {columnValue.color && (
               <div
                  className="menu__column-item-color"
                  style={{ backgroundColor: columnValue.color }}
               ></div>
            )}
            <span>{columnValue.value ? columnValue.value : 'Blank'}</span>
            <p className="column__item-number">3</p>
         </div>
      </>
   );
};

export default ColumnFilterItem;
