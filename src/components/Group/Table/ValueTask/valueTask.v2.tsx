import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { ITask, IValueOfTask } from '~/shared/model/task';
import { IColumn, IDefaultValue } from '~/shared/model/column';
import DropdownStatus from '~/components/DropdownStatus/dropDownStatus.v2';
import ValueCustomizedByColumnType from './valueCustomizedByColumnType';
import { handleEditValueSelected } from '~/pages/Board/board.reducer';
import { useParams } from 'react-router-dom';
interface IValueTaskProps {
   valueOfTask: IValueOfTask;
   // columnID: string;
   idBoard?: string;
   task: ITask;
   colIncludeListValue: IColumn;
}

export interface ISetInfoValueTask {
   selectValueHandler: (values: IDefaultValue) => void;
}
const ValueTask = ({ valueOfTask, colIncludeListValue, task, idBoard }: IValueTaskProps) => {
   const [openStatusBox, setOpenStatusBox] = useState<boolean>(false);
   const dispatch = useAppDispatch();
   const indexTab = useAppSelector((state) => state.boardSlice.indexTab);

   const selectValueHandler = (values: IDefaultValue) => {
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

   useEffect(() => {
      setOpenStatusBox(false);
   }, [indexTab]);

   const refValueElement = useRef<HTMLTableCellElement>(null);
   useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   });
   const handleClickOutside = (event: any) => {
      if (refValueElement.current && !refValueElement.current.contains(event.target)) {
         setOpenStatusBox(false);
      }
   };

   return (
      <td
         ref={valueOfTask.typeOfValue === 'multiple' ? refValueElement : undefined}
         key={valueOfTask._id}
         style={{
            color: `${valueOfTask.typeOfValue === 'multiple' ? '#FFF' : 'var(--text-btn-color)'}`,
            // color: `#111`,
            backgroundColor: valueOfTask.valueId ? valueOfTask.valueId.color : undefined,
         }}
         className="table__data-task-value data-status"
         onClick={(e) => {
            toggleStatusBoxHandler();
         }}
      >
         {valueOfTask.typeOfValue === 'multiple' && valueOfTask.valueId.value}
         {valueOfTask.typeOfValue === 'multiple' ? (
            <DropdownStatus
               isOpen={openStatusBox}
               idBoard={idBoard}
               setOpenStatusBox={setOpenStatusBox}
               selectValueHandler={selectValueHandler}
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
