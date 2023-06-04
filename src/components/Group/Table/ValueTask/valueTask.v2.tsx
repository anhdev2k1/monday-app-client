import { useState } from 'react';
import { useAppDispatch } from '~/config/store';
import { ITask, IValueOfTask } from '~/shared/model/task';
import { IColumn, IDefaultValue } from '~/shared/model/column';
import DropdownStatus from '~/components/DropdownStatus/dropDownStatus.v2';
import ValueCustomizedByColumnType from './valueCustomizedByColumnType';
import { handleEditValueSelected } from '~/pages/Board/board.reducer';
interface IValueTaskProps {
   valueOfTask: IValueOfTask;
   // columnID: string;
   task: ITask;
   colIncludeListValue: IColumn;
   defaultValueInColumn: IDefaultValue[];
}

export interface ISetInfoValueTask {
   setChangeStatus: (values: IDefaultValue) => void;
}
const ValueTask = ({
   valueOfTask,
   colIncludeListValue,
   task,
   defaultValueInColumn,
}: IValueTaskProps) => {
   const [openStatusBox, setOpenStatusBox] = useState<boolean>(false);
   const dispatch = useAppDispatch();

   const setChangeStatus = (values: IDefaultValue) => {
      dispatch(
         handleEditValueSelected({
            idValue: valueOfTask._id,
            data: values,
         }),
      );
   };

   const toggleStatusBoxHandler = () => {
      setOpenStatusBox((prev) => !prev);
   };

   return (
      <td
         key={valueOfTask._id}
         style={{
            color: `${valueOfTask.typeOfValue === 'multiple' ? '#FFF' : 'var(--text-btn-color)'}`,
            // color: `#111`,
            backgroundColor: valueOfTask.valueId ? valueOfTask.valueId.color : undefined,
         }}
         className="table__data-task-value data-status"
         onClick={(e) => {
            e.stopPropagation();

            toggleStatusBoxHandler();
         }}
      >
         {valueOfTask.typeOfValue === 'multiple' ? valueOfTask.valueId.value : valueOfTask.value}
         {valueOfTask.typeOfValue === 'multiple' ? (
            <DropdownStatus
               isOpen={openStatusBox}
               setOpenStatusBox={setOpenStatusBox}
               setChangeStatus={setChangeStatus}
               listStatus={defaultValueInColumn}
               columnId={colIncludeListValue._id}
               valueID={valueOfTask._id}
            />
         ) : (
            <ValueCustomizedByColumnType
               task={task}
               valueTask={valueOfTask}
               nameOfType={colIncludeListValue.belongType.name}
            />
         )}
      </td>
   );
};

export default ValueTask;
