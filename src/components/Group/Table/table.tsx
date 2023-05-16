import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseMedicalCircleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IColumn } from '~/shared/model/column';
import { IGroup } from '~/shared/model/group';
import { useState, useRef, useEffect } from 'react';
import './table.scss';
import { message } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuTask from '~/components/MenuTask/menuTask';
import { useAppSelector } from '~/config/store';
import TaskEdit from './TaskEdit/taskEdit';
interface IPropsTable {
   columns: IColumn[];
   data: IGroup;
}
const Table = ({ columns, data }: IPropsTable) => {
   const [listTask, setListTask] = useState<any[]>(data.tasks);
   const [isRenameTask, setIsRenameTask] = useState(false);
   const [valueTask, setValueTask] = useState('');
   const [valueAddTask, setValueAddTask] = useState('');
   const [messageApi, contextHolder] = message.useMessage();
   const handleValueAdd = useRef<any>();
   const handleEditInput = useRef<HTMLInputElement>(null);
   const { idBoard } = useParams();
   const [idTask, setIdTask] = useState('');
   const [isChecked, setIsChecked] = useState<ITaskChecked[]>([]);
   // const currGroup = useAppSelector(state => state.groupSlice.editGroup.data)

   interface ITaskChecked {
      _id: string;
   }
   const handleRenameTask = (e: any, taskID: any) => {
      setIsRenameTask(true);
   };
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
            const res = await axios.post(
               `http://localhost:3001/v1/api/board/${idBoard}/group/${data._id}/task`,
               {
                  name: valueAddTask,
                  position: data.tasks.length + 1,
               },
            );
            const { position, name, _id } = res.data.metadata.task;
            const newItem = {
               position,
               name,
               _id,
            };
            setListTask((pre) => [...pre, newItem]);
            messageApi.success('Tạo task thành công!');
            setValueAddTask('');
         };
         addTask();
      } else {
         messageApi.error('Vui lòng nhập tên task');
      }
   };
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
                     <>
                        <tr className="table__data-task">
                           <td className="table__data-task-value" key={task._id}>
                              <label htmlFor="checked"></label>
                              <input
                                 type="checkbox"
                                 id="checked"
                                 onChange={(e) => handleCheckboxChange(e, task._id)}
                                 data-id={task._id}
                              />
                           </td>
                           <td className="table__data-task-value" key={task._id}>
                              {isRenameTask ? (
                                 <input
                                    className="input__rename-task"
                                    value={valueTask === '' ? task.name : valueTask}
                                    type="text"
                                    style={{ width: '90%' }}
                                    onBlur={() => setIsRenameTask(false)}
                                    onChange={(e) => setValueTask(e.target.value)}
                                    ref={handleEditInput}
                                 />
                              ) : (
                                 <span
                                    ref={handleEditInput}
                                    onClick={(e) => handleRenameTask(e, task._id)}
                                    data-id={task._id}
                                 >
                                    {valueTask ? valueTask : task.name}
                                 </span>
                              )}
                           </td>
                           {/* <TaskEdit
                              handleEditInput={handleEditInput}
                              handleRenameTask={handleRenameTask}
                              isRenameTask={isRenameTask}
                              setIsRenameTask={setIsRenameTask}
                              setValueTask={setValueTask}
                              task={task}
                              valueTask={valueTask}
                           /> */}
                           {columns.map((item) => {
                              return (
                                 <>
                                    <td className="table__data-task-value" key={task._id}>
                                       Default value
                                    </td>
                                 </>
                              );
                           })}
                        </tr>
                     </>
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
         <MenuTask tasks={isChecked} handleDeleteTask={handleDeleteTask} task={idTask} />
      </>
   );
};

export default Table;
