import { IColumn } from '~/shared/model/column';
import ColumnFilterItem from './ColumnFilterItem/columnFilterItem';

interface IcolumnDataProps {
   columnData: IColumn;
}
const ColumnFilter = ({ columnData }: IcolumnDataProps) => {
   return (
      <>
         <div className="menu__column-wrapper">
            <h3 className="menu__column-wrapper-heading">{columnData.name}</h3>
            <div className="menu__column-list">
               {columnData.defaultValues
                  ? columnData.defaultValues.map((value) => {
                       return (
                          <ColumnFilterItem columnValue={value}/>
                       );
                    })
                  : null}
            </div>
         </div>
      </>
   );
};

export default ColumnFilter;
