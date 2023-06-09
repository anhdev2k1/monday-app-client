import Group from '../Group';
import HeadView from '../HeadView/';
import './mainTable.scss';
import { useEffect } from 'react';
// import ShowNotification from '~/utils/showNotification';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { createGroup, resetCreateGroup } from '../Group/group.reducer';
import { isNotification } from '../Notification/notification.reducer';
import { handleAddGroup } from '~/pages/Board/board.reducer';
import { decideRenderTask } from '~/utils/decideRenderTask';
import { ITask } from '~/shared/model/task';

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

  const transformedGroups = listsGroup.map((group) => {
    let isChoose = true;
    if (filterGroup.size === 0) isChoose &&= true;
    else if (!filterGroup.has(group._id)) isChoose &&= false;
    else isChoose &&= true;
    const newTasks: ITask[] = [];
    group.tasks.forEach((task) => {
      const isRender = decideRenderTask({
        filterTask,
        filterValueInColumns,
        taskName: task.name,
        valuesInTask: task.values,
      });
      if (isRender) newTasks.push(task);
    });
    const updatedGroup = { ...group, tasks: newTasks };
    if (newTasks.length !== 0 && isChoose) return updatedGroup;
  });

  const getValueSearch = useAppSelector((state) => state.boardSlice.searchValue);
  const dispatch = useAppDispatch();

  const searchFilter = (dataSearch: string) => {
    const result = transformedGroups?.filter((group) => {
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
          searchFilter(getValueSearch)!.map(
            (group, index) =>
              group && (
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
              ),
          )
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
