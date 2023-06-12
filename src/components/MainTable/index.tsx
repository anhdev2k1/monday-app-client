import Group from '../Group';
import HeadView from '../HeadView/';
import './mainTable.scss';
import { useEffect } from 'react';
// import ShowNotification from '~/utils/showNotification';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { createGroup, resetCreateGroup } from '../Group/group.reducer';
import { isNotification } from '../Notification/notification.reducer';
import { handleAddGroup } from '~/pages/Board/board.reducer';
import { decideRenderGroup } from '~/utils/decideRender';
import { IGroup } from '~/shared/model/group';
interface MainTableProps {
  idBoard?: string;
}

const MainTable = ({ idBoard }: MainTableProps) => {
  const dataCreateGroup = useAppSelector((state) => state.groupSlice.createGroup);
  const listsGroup = useAppSelector((state) => state.boardSlice.currBoard.data?.groups)!;
  const filterGroup = useAppSelector((state) => state.boardSlice.currBoard.filterGroup);
  const filterTask = useAppSelector((state) => state.boardSlice.currBoard.filterTask);
  const filterValueInColumns = useAppSelector(
    (state) => state.boardSlice.currBoard.filterValueInColumns,
  );

  const isFilter =
    filterGroup.size !== 0 ||
    filterTask.size !== 0 ||
    filterValueInColumns.some((filterValueInColumn) => filterValueInColumn.size !== 0);

  // Khong render khi group k co task nao
  // Them dieu kien la nguoi ta da chon filter hay chua
  const updatedGroups: IGroup[] = isFilter ? [] : listsGroup;
  if (isFilter) {
    for (const group of listsGroup) {
      const { isRender, updatedTasks } = decideRenderGroup({
        filterGroup,
        filterTask,
        filterValueInColumns,
        group,
      });
      if (isRender) {
        const updatedGroup = { ...group, tasks: updatedTasks };
        updatedGroups.push(updatedGroup);
      }
    }
  }

  const getValueSearch = useAppSelector((state) => state.boardSlice.searchValue);
  const dispatch = useAppDispatch();

  const searchFilter = (dataSearch: string) => {
    const result = updatedGroups?.filter((group) => {
      if (group) {
        return (
          group.name.toLocaleLowerCase().includes(dataSearch.toLocaleLowerCase()) ||
          group.tasks.some((task) =>
            task.name.toLocaleLowerCase().includes(dataSearch.toLocaleLowerCase()),
          )
        );
      }
    });
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
  const handleAddNewGroup = async (position?: number) => {
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
          position: position ?? listsGroup.length,
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
      {/* <p className="board__title">
            <span>{currBoard?.name}</span> <FontAwesomeIcon icon={faCircleExclamation} />
         </p> */}
      <HeadView />
      <div className="main__group__wrap">
        {searchFilter(getValueSearch)!?.length > 0 ? (
          searchFilter(getValueSearch)!.map((group, index) => (
            <Group
              // handleDeleteGroup={handleDeleteGroup}
              handleAddNewGroup={handleAddNewGroup}
              // columns={currBoard?.columns}
              numberOfGroup={listsGroup.length}
              key={group._id}
              position={index}
              idBoard={idBoard}
              data={group}
            />
          ))
        ) : (
          <div className="search__empty" style={{ textAlign: 'center', padding: '20px 0' }}>
            <img
              src="https://cdn.monday.com/images/search_empty_state.svg"
              alt=""
              style={{ width: '300px' }}
            />
            <h3>No result found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainTable;
