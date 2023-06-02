import React from 'react';
import './itemInCard.scss';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { SizeType, StatusType } from '~/shared/model/global';
import { IColumn } from '~/shared/model/column';
import { ITask, IValueOfTask } from '~/shared/model/task';
import ValueTask from '~/components/Group/Table/ValueTask/valueTask';
interface IPropsCard {
   column: IColumn;
   value: IValueOfTask;
   task: ITask;
}
const ItemInCard = ({ column, value, task }: IPropsCard) => {
   return (
      <div className="item__in__card">
         <ButtonCustom
            sizeType={SizeType.Medium}
            className="item__card--btn"
            statusType={StatusType.Nonbehavior}
            leftIcon={
               <img
                  style={{
                     backgroundColor: `${column.belongType.color}`,
                  }}
                  className="item__card__btn--icon"
                  src={column.belongType.icon}
                  alt="icon-clumn"
               />
            }
            title={column.name}
         />
         <table className="item__value">
            <tbody>
               <tr
                  onClick={(e) => {
                     e.preventDefault();
                  }}
               >
                  <ValueTask task={task} valueOfTask={value} />
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export default ItemInCard;
