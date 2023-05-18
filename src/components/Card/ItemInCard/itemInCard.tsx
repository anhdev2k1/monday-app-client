import React from 'react';
import './itemInCard.scss';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { SizeType, StatusType } from '~/shared/model/global';
import { IColumn } from '~/shared/model/column';
import { IValueOfTask } from '~/shared/model/task';
interface IPropsCard {
   column: IColumn;
   value: IValueOfTask;
}
const ItemInCard = ({ column, value }: IPropsCard) => {
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
         <div
            onClick={(e) => {
               e.preventDefault();
            }}
            className="item__value"
         >
            {value.typeOfValue}
         </div>
      </div>
   );
};

export default ItemInCard;
