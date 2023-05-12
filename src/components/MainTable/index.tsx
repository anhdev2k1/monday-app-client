import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonCustom from '../Button/ButtonCustom';
import Group from '../Group';
import HeadView from '../HeadView';
import './mainTable.scss';
import { faCircleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IResponseData, StatusType } from '~/shared/model/global';
import { IBoard } from '~/shared/model/board';
import { IGroup } from '~/shared/model/group';
import { useEffect, useState } from 'react';
import { SERVER_API_URL } from '~/config/constants';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ShowNotification from '~/utils/showNotification';
interface IPropMainTable {
   currBoard: IBoard;
}

const MainTable = ({ currBoard }: IPropMainTable) => {
   const [listsGroup, setListsGroup] = useState<IGroup[]>(currBoard.groups);
   console.log(currBoard);
   const { idBoard } = useParams();

   useEffect(() => {
      setListsGroup(currBoard.groups);
   }, [currBoard]);
   const handleAddNewGroup = async () => {
      const baseUrl = SERVER_API_URL;
      ShowNotification('info', 'Đang xử lý ', 2000);
      const { data } = await axios.post<
         IResponseData<{
            group: IGroup;
         }>
      >(`${baseUrl}v1/api/board/${idBoard}/group`, {
         name: 'New Group',
         position: listsGroup.length + 1,
      });
      if (data.metadata) {
         setListsGroup((prev) => {
            return [...prev, data.metadata!.group];
         });
      }
      ShowNotification('success', data.message, 2000);
   };

   return (
      <div className="main-table">
         <p className="board__title">
            <span>{currBoard?.name}</span> <FontAwesomeIcon icon={faCircleExclamation} />
         </p>
         <HeadView />
         <div className="main__group__wrap">
            {listsGroup &&
               currBoard &&
               listsGroup.map((item: IGroup, index) => {
                  return (
                     <Group
                        handleAddNewGroup={handleAddNewGroup}
                        columns={currBoard?.columns}
                        key={item._id}
                        data={item}
                     />
                  );
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
