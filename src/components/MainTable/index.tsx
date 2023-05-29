import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonCustom from '../Button/ButtonCustom';
import Group from '../Group';
import HeadView from '../HeadView';
import './mainTable.scss';
import { faCircleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { StatusType } from '~/shared/model/global';
import { IBoard } from '~/shared/model/board';
import { IGroup } from '~/shared/model/group';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import ShowNotification from '~/utils/showNotification';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { createGroup, resetCreateGroup } from '../Group/group.reducer';
import { isNotification } from '../Notification/notification.reducer';
import { handleAddGroup } from '~/pages/Board/board.reducer';
export interface IPropMainTable {
   currBoard: IBoard;
}

const MainTable = ({ currBoard }: IPropMainTable) => {
   const dataCreateGroup = useAppSelector((state) => state.groupSlice.createGroup);
   const listsGroup = useAppSelector((state) => state.boardSlice.currBoard.data?.groups);
   const getValueSearch = useAppSelector((state) => state.boardSlice.searchValue);
   const dispatch = useAppDispatch();
   const { idBoard } = useParams();

   const searchFilter = (dataSearch: string) => {
      const result = listsGroup?.filter((group) =>
         group.name.toLocaleLowerCase().includes(dataSearch.toLocaleLowerCase()),
      );
      return result;
   };

   useEffect(() => {
      const newGroup = dataCreateGroup.data;
      if (newGroup) {
         // setListsGroup((prev) => {
         //    return [...prev, newGroup];
         // });
         dispatch(handleAddGroup(newGroup));
         dispatch(resetCreateGroup());
      }
   }, [dataCreateGroup]);
   const handleAddNewGroup = async () => {
      if (idBoard && listsGroup) {
         dispatch(
            isNotification({
               type: 'loading',
               message: 'Đang xử lý...',
               autoClose: 1000,
               isOpen: true,
            }),
         );
         await dispatch(
            createGroup({
               idBoard,
               name: 'New Group',
               position: listsGroup.length + 1,
            }),
         );
         dispatch(
            isNotification({
               type: 'success',
               message: 'Đã thêm group thành công!',
               autoClose: 1000,
               isOpen: true,
            }),
         );
         dispatch(resetCreateGroup());
      }
   };
   return (
      <div className="main-table">
         <div className="main__group__wrap">
            {searchFilter(getValueSearch) ? (
               searchFilter(getValueSearch)!.map((item: IGroup, index) => {
                  return (
                     <Group
                        // handleDeleteGroup={handleDeleteGroup}
                        handleAddNewGroup={handleAddNewGroup}
                        // columns={currBoard?.columns}
                        key={item._id}
                        data={item}
                     />
                  );
               })
            ) : (
               <img src="https://cdn.monday.com/images/search_empty_state.svg" alt="" />
            )}
         </div>

         <ButtonCustom
            onClick={handleAddNewGroup}
            statusType={StatusType.Boder}
            title="Add new group"
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
         />
      </div>
   );
};

export default MainTable;
