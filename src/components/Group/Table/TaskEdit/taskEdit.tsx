import { useRef, useState } from 'react';
import './taskEdit.scss';
interface ITaskEditProps {
   task: any;
}
const TaskEdit = ({ task }: ITaskEditProps) => {
   const [isRenameTask, setIsRenameTask] = useState(false);
   const elementInput = useRef<HTMLInputElement>(null);
   const [valueTask, setValueTask] = useState<string>(task.name);
   const handleRenameTask = (e: any, taskID: any) => {
      setIsRenameTask(true);
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
               onBlur={() => setIsRenameTask(false)}
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
               onClick={(e) => handleRenameTask(e, task._id)}
               data-id={task._id}
            >
               {valueTask ? valueTask : task.name}
            </span>
         )}
      </td>
   );
};

export default TaskEdit;