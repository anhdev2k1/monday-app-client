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
// import ShowNotification from '~/utils/showNotification';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { createGroup, deleteGroup, resetCreateGroup } from '../Group/group.reducer';
import { isNotification } from '../Notification/notification.reducer';
import { getListTypes } from '../ListTypes/listTypes.reducer';
import { setListColumnsMainTable } from './mainTable.reducer';
export interface IPropDisplayyBoard {
   currBoard: IBoard;
}

const MainTable = ({ currBoard }: IPropDisplayyBoard) => {
   const dataCreateGroup = useAppSelector((state) => state.groupSlice.createGroup);
   const listColumns = useAppSelector((state) => state.mainTableSlice.listColumns.datas);

   const [listsGroup, setListsGroup] = useState<IGroup[]>(currBoard.groups);
   const dispatch = useAppDispatch();
   const { idBoard } = useParams();
   const notifi = useAppSelector((state) => state.groupSlice.createGroup);

   useEffect(() => {
      dispatch(getListTypes());
   }, []);
   useEffect(() => {
      setListsGroup(currBoard.groups);
   }, [currBoard]);

   useEffect(() => {
      dispatch(setListColumnsMainTable(currBoard.columns));
   }, [currBoard.columns]);

   useEffect(() => {
      const newGroup = dataCreateGroup.data;
      if (newGroup) {
         setListsGroup((prev) => {
            return [...prev, newGroup];
         });
         dispatch(resetCreateGroup());
      }
   }, [dataCreateGroup]);
   const handleAddNewGroup = async () => {
      if (idBoard) {
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
   const handleDeleteGroup = (id: string) => {
      setListsGroup((prev) => {
         const newListsGroup = [...prev].filter((group) => group._id !== id);
         return newListsGroup;
      });
      dispatch(
         isNotification({
            type: 'success',
            message: 'Đã xoá group thành công!',
            autoClose: 1000,
            isOpen: true,
         }),
      );
      if (idBoard)
         dispatch(
            deleteGroup({
               idGroup: id,
               idBoard,
            }),
         );
   };
   return (
      <div className="main-table">
         <div className="main__group__wrap">
            {listsGroup &&
               listsGroup.map((item: IGroup, index) => {
                  return (
                     <Group
                        handleDeleteGroup={handleDeleteGroup}
                        handleAddNewGroup={handleAddNewGroup}
                        columns={listColumns}
                        key={item._id}
                        data={item}
                     />
                  );
               })}
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
