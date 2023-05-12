import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonCustom from '../Button/ButtonCustom';
import Group from '../Group';
import HeadView from '../HeadView';
import './mainTable.scss';
import { faCircleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { StatusType } from '~/shared/model/global';
import { IBoard } from '~/shared/model/board';
import { IGroup } from '~/shared/model/group';
interface IPropMainTable {
   currBoard?: IBoard;
}

const MainTable = ({ currBoard }: IPropMainTable) => {
   if (currBoard) console.log(currBoard.groups);
   console.log(currBoard);

   return (
      <div className="main-table">
         <p className="board__title">
            <span>Monday</span> <FontAwesomeIcon icon={faCircleExclamation} />
         </p>
         <HeadView />
         <div className="main__group__wrap">
            {currBoard &&
               currBoard.groups?.map((item: IGroup, index) => {
                  return <Group columns={currBoard.columns} key={item._id} data={item} />;
               })}
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
