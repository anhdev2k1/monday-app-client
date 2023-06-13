import Group from '../Group';
import HeadView from '../HeadView/';
import './mainTable.scss';
import { useEffect, useState } from 'react';
// import ShowNotification from '~/utils/showNotification';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { createGroup, resetCreateGroup, updateAllGroups } from '../Group/group.reducer';
import { isNotification } from '../Notification/notification.reducer';
import { handleAddGroup, handleUpdateAllGroup } from '~/pages/Board/board.reducer';
import { decideRenderGroup } from '~/utils/decideRender';
import { IGroup } from '~/shared/model/group';
import { ITask } from '~/shared/model/task';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

interface MainTableProps {
  idBoard?: string;
}

const MainTable = ({ idBoard }: MainTableProps) => {
  const dataCreateGroup = useAppSelector((state) => state.groupSlice.createGroup);
  const listsGroup = useAppSelector((state) => state.boardSlice.currBoard.data?.groups)!;
  console.log({ listsGroup });

  const filterGroup = useAppSelector((state) => state.boardSlice.currBoard.filterGroup);
  const filterTask = useAppSelector((state) => state.boardSlice.currBoard.filterTask);
  const filterValueInColumns = useAppSelector(
    (state) => state.boardSlice.currBoard.filterValueInColumns,
  );
  const getValueSearch = useAppSelector((state) => state.boardSlice.searchValue);
  const dispatch = useAppDispatch();

  const [updatedGroups, setupdatedGroups] = useState<IGroup[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  // Rest of the code

  useEffect(() => {
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

    const result: IGroup[] = [];
    for (const group of updatedGroups) {
      const isChoose = group.name.toLowerCase().includes(getValueSearch.toLowerCase());
      const updatedTasks: ITask[] = [];
      for (const task of group.tasks) {
        if (task.name.toLowerCase().includes(getValueSearch.toLowerCase())) {
          updatedTasks.push(task);
        }
      }
      if (isChoose || updatedTasks.length !== 0) {
        result.push({ ...group, tasks: updatedTasks });
      }
    }

    setupdatedGroups(result);
  }, [filterGroup, filterTask, filterValueInColumns, getValueSearch, listsGroup]);

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

  const onDragEnd = async (result: DropResult) => {
    // Check if the group was dropped outside of a droppable area
    if (!result.destination) {
      return;
    }

    const updatedGroupsCopy = [...updatedGroups];
    const [removed] = updatedGroupsCopy.splice(result.source.index, 1);
    updatedGroupsCopy.splice(result.destination.index, 0, removed);

    await dispatch(
      updateAllGroups({
        idBoard: idBoard!,
        groups: updatedGroupsCopy,
      }),
    );

    dispatch(
      handleUpdateAllGroup({
        startPosition: result.source.index,
        endPosition: result.destination.index,
      }),
    );
  };

  return (
    <div className="main-table">
      {/* <p className="board__title">
            <span>{currBoard?.name}</span> <FontAwesomeIcon icon={faCircleExclamation} />
         </p> */}
      <HeadView />
      <div className="main__group__wrap">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="group-droppable">
            {(provided, snapshot) => {
              setIsDragging(snapshot.isDraggingOver);
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {updatedGroups.length > 0 ? (
                    updatedGroups.map((group, index) => (
                      <Draggable key={group._id} draggableId={group._id} index={index}>
                        {(provided) => {
                          return (
                            <div ref={provided.innerRef} {...provided.draggableProps}>
                              <Group
                                numberOfGroup={listsGroup.length}
                                position={index}
                                idBoard={idBoard}
                                data={group}
                                dragHandle={provided.dragHandleProps}
                                isDragging={isDragging}
                              />
                            </div>
                          );
                        }}
                      </Draggable>
                    ))
                  ) : (
                    <div
                      className="search__empty"
                      style={{ textAlign: 'center', padding: '20px 0' }}
                    >
                      <img
                        src="https://cdn.monday.com/images/search_empty_state.svg"
                        alt=""
                        style={{ width: '300px' }}
                      />
                      <h3>No result found</h3>
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default MainTable;
