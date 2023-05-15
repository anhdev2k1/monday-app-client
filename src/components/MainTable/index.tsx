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
import { useAppDispatch, useAppSelector } from '~/config/store';
import { createGroup, deleteGroup, resetCreateGroup } from '../Group/group.reducer';
import { getListTypes } from '../ListTypes/listTypes.reducer';
interface IPropMainTable {
   currBoard: IBoard;
}

const MainTable = ({ currBoard }: IPropMainTable) => {
   const dataCreateGroup = useAppSelector((state) => state.groupSlice.createGroup);
   const [listsGroup, setListsGroup] = useState<IGroup[]>(currBoard.groups);
   const dispatch = useAppDispatch();
   const { idBoard } = useParams();

   useEffect(() => {
      dispatch(getListTypes());
   }, []);
   useEffect(() => {
      setListsGroup(currBoard.groups);
   }, [currBoard]);

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
            createGroup({
               idBoard,
               name: 'New Group',
               position: listsGroup.length + 1,
            }),
         );
      }
   };
   const handleDeleteGroup = (id: string) => {
      setListsGroup((prev) => {
         const newListsGroup = [...prev].filter((group) => group._id !== id);
         return newListsGroup;
      });
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
                        handleDeleteGroup={handleDeleteGroup}
                        handleAddNewGroup={handleAddNewGroup}
                        columns={currBoard?.columns}
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
