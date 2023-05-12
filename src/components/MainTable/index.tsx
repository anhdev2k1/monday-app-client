import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonCustom from '../Button/ButtonCustom';
import Group from '../Group';
import HeadView from '../HeadView';
import './mainTable.scss';
import { faCircleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { StatusType } from '~/shared/model/global';
import { IBoard } from '~/shared/model/board';
interface IPropMainTable {
   currBoard?: IBoard;
}

const MainTable = ({ currBoard }: IPropMainTable) => {
   console.log(currBoard);

   return (
      <div className="main-table">
         <p className="board__title">
            <span>Monday</span> <FontAwesomeIcon icon={faCircleExclamation} />
         </p>
         <HeadView />
         <div className="main__group__wrap">
            <Group />

            <Group />
            <Group />
            <Group />
         </div>

         <ButtonCustom
            statusType={StatusType.Boder}
            title="Add new group"
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
         />
      </div>
   );
};

export default MainTable;
