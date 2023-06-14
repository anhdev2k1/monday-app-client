/* eslint-disable array-callback-return */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IGroup } from '~/shared/model/group';
import { useState, useRef, useEffect } from 'react';
import './table.scss';
import { message } from 'antd';
import axios from 'axios';
import MenuTask from '~/components/MenuTask/menuTask';
import { useAppDispatch, useAppSelector } from '~/config/store';
import TaskEdit from './TaskEdit/taskEdit';
import Column from '~/components/Column/column';
import ListType from '~/components/ListTypes/listTypes';
import { createColumn } from '~/components/MainTable/mainTable.reducer';
import { ITask } from '~/shared/model/task';
import { IResponseData } from '~/shared/model/global';
import ValueTask from './ValueTask/valueTask';
import { handleAddTaskToGroup, handleDeleteTasksFromGroup, handleUpdateAllTasks } from '~/pages/Board/board.reducer';
import { SERVER_API_URL } from '~/config/constants';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { updateAllGroups, updateAllTasks } from '../group.reducer';
interface IPropsTable {
  data: IGroup;
  idBoard?: string;
}

const Table = ({ data, idBoard }: IPropsTable) => {
  const columns = useAppSelector((state) => state.boardSlice.currBoard.data?.columns)!;

  const [valueAddTask, setValueAddTask] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const handleValueAdd = useRef<any>();

  const [checkedTasks, setCheckedTasks] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const toggleCheckedTask = (e: any, taskId: string) => {
    if (e.target.checked) {
      setCheckedTasks((pre) => [...pre, taskId]);
    } else {
      setCheckedTasks((pre) => pre.filter((item) => item !== taskId));
    }
  };

  const handleDeleteTask = async (taskIds: string[]) => {
    messageApi.loading('Đợi xý nhé !...');
    await axios.delete(`${SERVER_API_URL}v1/api/group/${data._id}/tasks?ids=${taskIds.join(',')}`);
    messageApi.success('Xoá task thành công!');
    dispatch(
      handleDeleteTasksFromGroup({
        groupId: data._id,
        taskIds,
      }),
    );
    setCheckedTasks([]);
  };
  const handleAddColumn = async (id: string, position?: number) => {
    try {
      messageApi.loading('Đợi xý nhé...!');
      if (idBoard && columns) {
        await dispatch(
          createColumn({
            idBoard,
            belongType: id,
            position: position ?? columns.length,
          }),
        );
      }
      messageApi.success(`Thêm mới column thành công!`);
    } catch (error) {
      messageApi.error(`${error}`);
    }
  };
  const handleAddTask = async () => {
    if (valueAddTask === '') return;
    messageApi.loading('Đợi xý nhé !...');
    const res = await axios.post<
      IResponseData<{
        task: ITask;
      }>
    >(`http://localhost:3001/v1/api/board/${idBoard}/group/${data._id}/task`, {
      name: valueAddTask,
      position: data.tasks.length,
    });
    if (res.data.metadata) {
      messageApi.success('Tạo task thành công!');
      dispatch(
        handleAddTaskToGroup({
          groupId: data._id,
          newTask: res.data.metadata?.task,
        }),
      );
      setValueAddTask('');
    }
  };
  const [isOpenAddColumn, setIsOpenAddColumn] = useState<boolean>(false);
  const dropdownColumn = useRef<any>(null);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
  const handleClickOutside = (event: any) => {
    if (!dropdownColumn.current.contains(event.target)) {
      setIsOpenAddColumn(false);
    }
  };
  // const [tasks, updateTasks] = useState<ITask[]>(data.tasks);
 
  const handleOnDragEnd = async (result: DropResult) => {
    console.log("result",result);
    
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const newTasks = [...data.tasks];
    const [reorderedItem] = newTasks.splice(startIndex, 1);
    newTasks.splice(endIndex, 0, reorderedItem);
  
    dispatch(handleUpdateAllTasks({
      idGroup : data._id,
      tasksDidDrop: newTasks
    }))
    await dispatch(
      updateAllTasks({
        idGroup: data._id,
        tasks: newTasks,
      }),
    );
    
  };
  return (
    <>
      <table className="table__group">
        {contextHolder}
        <thead className="table__group-header">
          <tr>
            <th className="column__group-check"></th>
            <th className="column__group-task">Task</th>
            {columns?.map((col, index) => (
              <Column key={col._id} col={col} position={index} handleAddColumn={handleAddColumn} />
            ))}
            <th className="column__group" ref={dropdownColumn}>
              <input
                defaultChecked={false}
                className="col__group--check"
                type="checkbox"
                id={`plus--col--${data._id}`}
              />
              <label
                className="plus__lable add__column"
                htmlFor={`plus--col--${data._id}`}
                onClick={() => setIsOpenAddColumn(!isOpenAddColumn)}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="icon__add-column"
                  style={{ transform: isOpenAddColumn ? 'rotate(45deg)' : 'rotate(0)' }}
                />
                <ListType
                  handleAddColumn={handleAddColumn}
                  isOpenAddColumn={isOpenAddColumn}
                  setIsOpenAddColumn={setIsOpenAddColumn}
                />
              </label>
            </th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks-droppable">
            {(provided) => (
              <tbody
                className="table__data tasks-droppable"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.tasks.map((task, index) => {
                  return (
                    <Draggable key={index} draggableId={task._id} index={index}>
                      {(provided) => (
                        <tr
                          className="table__data-task"
                          key={task._id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <td className="table__data-task-value">
                            <label htmlFor="checked"></label>
                            <input
                              type="checkbox"
                              id="checked"
                              onChange={(e) => toggleCheckedTask(e, task._id)}
                              data-id={task._id}
                              checked={checkedTasks.includes(task._id)}
                              style={{ transform: 'scale(1.4)' }}
                            />
                          </td>
                          <TaskEdit task={task} groupId={data._id} />
                          {task.values.map((value, index) => (
                            <ValueTask
                              key={index}
                              index={index}
                              idBoard={idBoard}
                              valueOfTask={value}
                              task={task}
                              column={columns[index]}
                            />
                          ))}
                        </tr>
                      )}
                    </Draggable>
                  );
                })}

                <tr className="table__data-task">
                  <td className="table__data-task-value"></td>
                  <td className="table__data-add-task">
                    <input
                      type="text"
                      value={valueAddTask}
                      placeholder="Add Task"
                      ref={handleValueAdd}
                      onChange={() => setValueAddTask(handleValueAdd.current?.value)}
                      onBlur={handleAddTask}
                    />
                  </td>
                </tr>
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
      <MenuTask
        setCheckedTasks={setCheckedTasks}
        tasks={checkedTasks}
        handleDeleteTask={handleDeleteTask}
      />
    </>
  );
};

export default Table;
