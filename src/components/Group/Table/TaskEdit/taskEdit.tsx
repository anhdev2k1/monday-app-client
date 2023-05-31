import { useRef, useState } from 'react';
import './taskEdit.scss';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { useAppDispatch } from '~/config/store';
import { handleEditTaskFromGroup } from '~/pages/Board/board.reducer';
import { ITask } from '~/shared/model/task';
interface ITaskEditProps {
   task: ITask;
   groupId: string;
}
const TaskEdit = ({ task, groupId }: ITaskEditProps) => {
   const [isRenameTask, setIsRenameTask] = useState(false);
   const elementInput = useRef<HTMLInputElement>(null);
   const [valueTask, setValueTask] = useState<string>(task.name);
   const dispatch = useAppDispatch();
   const handleRenameTask = async (
      e: React.FocusEvent<HTMLInputElement, Element>,
      taskID: string,
   ) => {
      setIsRenameTask(true);
      await axios.patch(`${SERVER_API_URL}v1/api/task/${taskID}`, {
         name: e.target.value,
      });
      dispatch(
         handleEditTaskFromGroup({
            groupId,
            taskId: task._id,
            key: 'name',
            value: e.target.value,
         }),
      );
   };
   return (
      <td className="table__data-task-value" key={task._id}>
         {isRenameTask ? (
            <input
               autoFocus
               className="input__rename-task"
               value={valueTask}
               type="text"
               style={{ width: '90%' }}
               onBlur={(e) => handleRenameTask(e, task._id)}
               onChange={(e) => {
                  if (e.target.value) {
                     setValueTask(e.target.value);
                  }
               }}
               ref={elementInput}
            />
         ) : (
            <span
               className="task__value--custom"
               onClick={(e) => setIsRenameTask(true)}
               data-id={task._id}
            >
               {valueTask ? valueTask : task.name}
            </span>
         )}
      </td>
   );
};

export default TaskEdit;
