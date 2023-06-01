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
   const dispatch = useAppDispatch();
   const handleRenameTask = async (
      e: React.FocusEvent<HTMLInputElement, Element>,
      taskID: string,
   ) => {
      setIsRenameTask(true);
      dispatch(
         handleEditTaskFromGroup({
            groupId,
            taskId: task._id,
            key: 'name',
            value: e.target.value,
         }),
      );
      await axios.patch(`${SERVER_API_URL}v1/api/task/${taskID}`, {
         name: e.target.value,
      });
   };
   return (
      <td className="table__data-task-value table-data-name" key={task._id}>
         {isRenameTask ? (
            <input
               autoFocus
               className="input__rename-task"
               defaultValue={task.name}
               type="text"
               style={{ width: '90%' }}
               onBlur={(e) => {
                  handleRenameTask(e, task._id);
                  setIsRenameTask(false);
               }}
               onChange={(e) => {}}
               ref={elementInput}
            />
         ) : (
            <span
               className="task__value--custom"
               onClick={(e) => setIsRenameTask(true)}
               data-id={task._id}
            >
               {task.name}
            </span>
         )}
      </td>
   );
};

export default TaskEdit;
