interface ITaskEditProps{
task: any,
   isRenameTask: any,
   valueTask: any,
   handleEditInput: any,
   setIsRenameTask: any,
   setValueTask: any,
   handleRenameTask: any,
}
const TaskEdit = ({
   task,
   isRenameTask,
   valueTask,
   handleEditInput,
   setIsRenameTask,
   setValueTask,
   handleRenameTask,
}:ITaskEditProps) => {
   return (
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
   );
};

export default TaskEdit;
