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
import { useAppSelector } from '~/config/store';
import TaskEdit from './TaskEdit/taskEdit';
import { ITask } from '~/shared/model/task';
import { IResponseData } from '~/shared/model/global';
import ValueTask from './ValueTask/valueTask';
import { SERVER_API_URL } from '~/config/constants';
interface IPropsTable {
   columns: IColumn[];
   data: IGroup;
}
const Table = ({ columns, data }: IPropsTable) => {
   const [listTask, setListTask] = useState<ITask[]>(data.tasks);
   // const [isRenameTask, setIsRenameTask] = useState(false);
   // const [valueTask, setValueTask] = useState('');
   const [valueAddTask, setValueAddTask] = useState('');
   const [messageApi, contextHolder] = message.useMessage();
   const handleValueAdd = useRef<any>();
   // const handleEditInput = useRef<HTMLInputElement>(null);
   const { idBoard } = useParams();
   const [idTask, setIdTask] = useState('');
   const [isChecked, setIsChecked] = useState<ITaskChecked[]>([]);
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
   console.log(listTask);
   console.log('column',columns);
   
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
                  {columns.map((col) => {
                     return (
                        <th className="column__group" key={col._id}>
                           {col.name}
                        </th>
                     );
                  })}
                  <th className="column__group">
                     <input className="col__group--check" type="checkbox" id="plus--col" />
                     <label className="plus__lable" htmlFor="plus--col">
                        <div className="input--icon">
                           <FontAwesomeIcon icon={faPlus} />
                        </div>
                     </label>
                  </th>
               </tr>
            </thead>
            <tbody className="table__data">
               {listTask.map((task) => {
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
                        {task.values.map((itemValue, index) => {
                           return <ValueTask value={itemValue} key={index} columnID={itemValue.belongColumn} />;
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
