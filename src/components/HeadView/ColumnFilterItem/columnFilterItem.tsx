import { useDispatch } from 'react-redux';
import { useAppSelector } from '~/config/store';
import { setActiveFilterItem, setFilterColumn } from '~/pages/Board/board.reducer';
import { IColumn } from '~/shared/model/column';

interface IColumnFilterItemProps {
   columnValue: IColumn;
}
const ColumnFilterItem = ({ columnValue }: IColumnFilterItemProps) => {
   const activeFilterItem = useAppSelector((state) => state.boardSlice.activeFilterItem);

   const dispatch = useDispatch();
   const handleFilter = (id: string) => {
      dispatch(setActiveFilterItem(id));
      dispatch(setFilterColumn(id));
   };
   return (
      <>
         <div
            className={`menu__column-item ${
               activeFilterItem.includes(columnValue._id) ? 'active' : ''
            }`}
            key={columnValue._id}
            onClick={() => handleFilter(columnValue._id)}
         >
            <div
               className="menu__column-item-icon"
               style={{ backgroundColor: columnValue.belongType.color }}
            >
               <img src={columnValue.belongType.icon} alt="" />
            </div>
            <span className="menu__column-item-title">{columnValue.name}</span>
         </div>
      </>
   );
};

export default ColumnFilterItem;
