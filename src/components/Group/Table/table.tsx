/* eslint-disable array-callback-return */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseMedicalCircleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IColumn } from '~/shared/model/column';
import { IGroup } from '~/shared/model/group';
import { useState, useRef, useEffect, Fragment } from 'react';
import './table.scss';
import { message } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuTask from '~/components/MenuTask/menuTask';
import { useAppDispatch, useAppSelector } from '~/config/store';
import TaskEdit from './TaskEdit/taskEdit';
import Column from '~/components/Column/column';
import ListType from '~/components/ListTypes/listTypes';
import { createColumn } from '~/components/MainTable/mainTable.reducer';
import { ITask, IValueOfTask } from '~/shared/model/task';
import { IResponseData } from '~/shared/model/global';
import ValueTask from './ValueTask/valueTask';
interface IPropsTable {
   data: IGroup;
}

// const mockDataColumns = [
//    {
//       _id: '6466f21069b91a0aa4b7c008',
//       name: 'date',
//       position: 2,
//       belongType: {
//          _id: '6465ecc9f59e11b0b52a9589',
//          name: 'date',
//          icon: 'http://localhost:3001/v1/api/images/date-column-icon.svg',
//          color: '#11dd80',
//       },
//       defaultValues: [],
//    },
//    {
//       _id: '6466f34669b91a0aa4b7c0d9',
//       name: 'status',
//       position: 2,
//       belongType: {
//          _id: '6465ecc9f59e11b0b52a9586',
//          name: 'status',
//          icon: 'http://localhost:3001/v1/api/images/status-column-icon.svg',
//          color: '#11dd80',
//       },
//       defaultValues: [
//          {
//             _id: '6465eccaf59e11b0b52a959c',
//             value: 'Done',
//             color: 'green',
//          },
//          {
//             _id: '6465eccaf59e11b0b52a959v',
//             value: 'Stuck',
//             color: 'red',
//          },
//          {
//             _id: '6465eccaf59e11b0b52a959k',
//             value: 'Working on it',
//             color: 'orange',
//          },
//       ],
//    },
//    {
//       _id: '64673727d4ee7467ad7ca69a',
//       name: 'priority',
//       position: 3,
//       belongType: {
//          _id: '6465ecc9f59e11b0b52a9587',
//          name: 'priority',
//          icon: 'http://localhost:3001/v1/api/images/priority-column-icon.png',
//          color: '#feca00',
//       },
//       defaultValues: [
//          {
//             _id: '6465eccaf59e11b0b52a9591',
//             value: 'Done',
//             color: 'green',
//          },
//          {
//             _id: '6465eccaf59e11b0b52a9592',
//             value: 'Stuck',
//             color: 'red',
//          },
//          {
//             _id: '6465eccaf59e11b0b52a9593',
//             value: 'Working on it',
//             color: 'orange',
//          },
//       ],
//    },
// ];

const Table = ({ data }: IPropsTable) => {
   const [listTask, setListTask] = useState<ITask[]>(data.tasks);
   const columns = useAppSelector((state) => state.boardSlice.currBoard.data?.columns);
   console.log('columns', columns, data.name);
   // const [isRenameTask, setIsRenameTask] = useState(false);
   // const [valueTask, setValueTask] = useState('');
   const [valueAddTask, setValueAddTask] = useState('');
   const [messageApi, contextHolder] = message.useMessage();
   const handleValueAdd = useRef<any>();
   // const handleEditInput = useRef<HTMLInputElement>(null);
   const { idBoard } = useParams();
   const [idTask, setIdTask] = useState('');
   const [isChecked, setIsChecked] = useState<ITaskChecked[]>([]);
   const [isOpenListTypes, setIsOpenListTypes] = useState<boolean>(false);
   const listColumns = useAppSelector((state) => state.mainTableSlice.listColumns.datas);
   const dispatch = useAppDispatch();
   const filterItem = useAppSelector((state) => state.boardSlice.filter);
   // const currGroup = useAppSelector(state => state.groupSlice.editGroup.data)

   interface ITaskChecked {
      _id: string;
   }
   // const handleRenameTask = (e: any, taskID: any) => {
   //    setIsRenameTask(true);
   // };
   const handleCheckboxChange = (e: any, taskID: any) => {
      setIdTask(e.target.dataset.id);
      if (e.target.checked) {
         setIsChecked((pre) => [...pre, { _id: taskID }]);
      } else {
         setIsChecked((pre) => pre.filter((item) => item._id !== taskID));
      }
   };
   const handleDeleteTask = async (taskID: string) => {
      const deleteTask = async () => {
         messageApi.loading('Đợi xý nhé !...');
         await axios.delete(`http://localhost:3001/v1/api/group/${data._id}/task/${taskID}`);
         setListTask((pre) => pre.filter((item) => item._id !== taskID));
         messageApi.success('Xoá task thành công!');
      };
      deleteTask();
   };
   const handleAddColumn = (id: string) => {
      const addColumn = async () => {
         try {
            messageApi.loading('Đợi xý nhé...!');
            if (idBoard)
               await dispatch(
                  createColumn({
                     idBoard,
                     typeId: id,
                     position: listColumns.length + 1,
                  }),
               );
            // messageApi.success(`Thêm mới column ${res.data.metadata.column.name} thành công!`);
            messageApi.success(`Thêm mới column thành công!`);
         } catch (error) {
            messageApi.error(`${error}`);
         }
      };
      addColumn();
   };
   const handleAddTask = () => {
      if (valueAddTask !== '') {
         const addTask = async () => {
            messageApi.loading('Đợi xý nhé !...');
            const res = await axios.post<
               IResponseData<{
                  task: ITask;
               }>
            >(`http://localhost:3001/v1/api/board/${idBoard}/group/${data._id}/task`, {
               name: valueAddTask,
               position: data.tasks.length + 1,
            });
            if (res.data.metadata)
               setListTask((pre) => {
                  const newTask = res.data.metadata?.task;
                  if (newTask) {
                     return [...pre, newTask];
                  }
                  return pre;
               });
            messageApi.success('Tạo task thành công!');
            setValueAddTask('');
         };
         addTask();
      } else {
         messageApi.error('Vui lòng nhập tên task');
      }
   };
   // const filterValue = (data: IColumn[]) => {
   //    const result = filterItem.map(item => {
   //       data.find(col => col._id === item._id)
   //    })
   //    return result;
   // };
   // console.log(filterValue(columns!));
   console.log("filterItem",filterItem);
   
   return (
      <>
         <table className="table__group">
            {contextHolder}
            <thead className="table__group-header">
               <tr>
                  <th className="column__group-check">
                     <label htmlFor="checked"></label>
                     <input type="checkbox" id="checked" />
                  </th>
                  <th className="column__group">Task</th>
                  {filterItem.length > 0 ? columns?.map((col) => {
                     if (filterItem.includes(col._id)) {
                        return (
                           <th className="column__group" key={col._id}>
                              {col.name}
                           </th>
                        );
                     }
                  }): columns?.map(col => {
                     return (
                        <th className="column__group" key={col._id}>
                              {col.name}
                           </th>
                     )
                  })}
                  <th className="column__group">
                     <input className="col__group--check" type="checkbox" id="plus--col" />
                     <label
                        className="plus__lable"
                        htmlFor="plus--col"
                        onClick={() => {
                           setIsOpenListTypes((prev) => !prev);
                        }}
                     >
                        <div className="input--icon">
                           <FontAwesomeIcon icon={faPlus} />
                           {isOpenListTypes && <ListType handleAddColumn={handleAddColumn} />}
                        </div>
                     </label>
                  </th>
               </tr>
            </thead>
            <tbody className="table__data">
               {listTask.map((task) => {
                  console.log('task', task);

                  return (
                     <tr className="table__data-task" key={task._id}>
                        <td className="table__data-task-value">
                           <label htmlFor="checked"></label>
                           <input
                              type="checkbox"
                              id="checked"
                              onChange={(e) => handleCheckboxChange(e, task._id)}
                              data-id={task._id}
                           />
                        </td>
                        <TaskEdit task={task} />
                        {filterItem.length > 0 ? task.values.map((itemValue, index) => {
                           const colIncludeListValue = columns?.find(col => {
                              return filterItem.includes(col._id) && col._id === itemValue.belongColumn
                           })
                           if (colIncludeListValue) {
                              return (
                                 <ValueTask
                                    valueOfTask={itemValue}
                                    key={index}
                                    colIncludeListValue={colIncludeListValue}
                                 />
                              );
                           }
                        }): task.values.map((itemValue, index) => {
                           const colIncludeListValue = columns?.find(
                              (col) => col._id === itemValue.belongColumn,
                           );

                           if (colIncludeListValue) {
                              return (
                                 <ValueTask
                                    valueOfTask={itemValue}
                                    key={index}
                                    colIncludeListValue={colIncludeListValue}
                                 />
                              );
                           }
                        })}
                     </tr>
                  );
               })}
               <tr className="table__data-task">
                  <td className="table__data-task-value">
                     <label htmlFor="checked"></label>
                     <input type="checkbox" id="checked" />
                  </td>
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
            </tbody>
         </table>
         <MenuTask
            setIsChecked={setIsChecked}
            tasks={isChecked}
            handleDeleteTask={handleDeleteTask}
            task={idTask}
         />
      </>
   );
};

export default Table;
