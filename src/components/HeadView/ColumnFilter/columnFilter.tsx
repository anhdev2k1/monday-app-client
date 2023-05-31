import { IColumn } from '~/shared/model/column';

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
                       if (value.value === '') {
                          return (
                             <div className="menu__column-item" key={value._id}>
                                {value.color && (
                                   <div
                                      className="menu__column-item-color"
                                      style={{ backgroundColor: value.color }}
                                   ></div>
                                )}
                                <span>Blank</span>
                                <p className="column__item-number">3</p>
                             </div>
                          );
                       } else {
                          return (
                             <div className="menu__column-item" key={value._id}>
                                {value.color && (
                                   <div
                                      className="menu__column-item-color"
                                      style={{ backgroundColor: value.color }}
                                   ></div>
                                )}
                                <span>{value.value}</span>
                                <p className="column__item-number">3</p>
                             </div>
                          );
                       }
                    })
                  : null}
            </div>
         </div>
      </>
   );
};

export default ColumnFilter;
