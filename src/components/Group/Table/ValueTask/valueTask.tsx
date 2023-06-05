import DropdownStatus from '~/components/DropdownStatus/dropdownStatus';
import { useState, useEffect, useRef } from 'react';
import { IItemInListValueSelect, ITask, IValueOfTask } from '~/shared/model/task';
import { IColumn, IDefaultValue } from '~/shared/model/column';
import ValueCustomizedByColumnType from './valueCustomizedByColumnType';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { handleEditValueSelected } from '~/pages/Board/board.reducer';
interface IValueTaskProps {
   valueOfTask: IValueOfTask;
   // columnID: string;
   task: ITask;
}

interface ISelectedOfValueTask extends IItemInListValueSelect {
   idSelected: string | null;
}
export interface ISetInfoValueTask {
   setChangeStatus: React.Dispatch<React.SetStateAction<ISelectedOfValueTask>>;
}
const ValueTask = ({ valueOfTask, task }: IValueTaskProps) => {
   const valuesSelect = useAppSelector((state) =>
      state.boardSlice.currBoard.data?.columns.flatMap((item) => item.defaultValues),
   );
   const dispatch = useAppDispatch();
   const itemColumn = useAppSelector((state) =>
      state.boardSlice.currBoard.data?.columns.find((col) => col._id === valueOfTask.belongColumn),
   );
   const [openStatusBox, setOpenStatusBox] = useState(false);
   const [changeStatus, setChangeStatus] = useState<{
      _id: string;
      idSelected: string | null;
      value: string | null;
      color: string;
   }>({
      _id: valueOfTask._id,
      idSelected: valueOfTask.valueId?._id || null,
      value: valueOfTask.typeOfValue === 'multiple' ? valueOfTask.valueId?.value : null,
      color: valueOfTask.valueId?.color,
   });

   // useEffect(() => {
   //    if (valueOfTask.valueId?.color || valueOfTask.valueId?.value) {
   //       setChangeStatus((prev) => {
   //          return {
   //             ...prev,
   //             idSelected: valueOfTask.valueId?._id,
   //             value: valueOfTask.valueId?.value,
   //             color: valueOfTask.valueId?.color,
   //          };
   //       });
   //    }
   // }, [valueOfTask.valueId?._id, valueOfTask.valueId?.color, valueOfTask.valueId?.value]);

   useEffect(() => {
      if (changeStatus.idSelected && valueOfTask.typeOfValue === 'multiple') {
         dispatch(
            handleEditValueSelected({
               idValue: changeStatus._id,
               data: {
                  _id: changeStatus.idSelected,
                  color: changeStatus.color,
                  value: changeStatus.value,
               },
            }),
         );
      }
   }, [changeStatus.idSelected]);

   // const { idBoard } = useParams();
   // const [listStatus, setListStatus] = useState([]);
   const handleOpenStatus = () => {
      setOpenStatusBox((pre) => !pre);
   };

   const changeValueSelected = () => {
      if (valuesSelect) {
         const temp = valuesSelect.find((value) => value._id === changeStatus.idSelected);
         return temp;
      }
   };

   const refValueElement = useRef<HTMLTableCellElement>(null);
   useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   });
   const handleClickOutside = (event: any) => {
      if (refValueElement.current && !refValueElement.current.contains(event.target)) {
         console.log('asdsa');
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
            backgroundColor: `${
               changeValueSelected()?.color ? changeValueSelected()?.color : changeStatus.color
               // changeStatus.color || (value.typeOfValue === 'multiple' ? value.valueId.color : null)
            }`,
         }}
         className="table__data-task-value data-status"
         onClick={(e) => {
            handleOpenStatus();
         }}
      >
         <span className='data__value'>
            {changeValueSelected()?.value
               ? changeValueSelected()?.value
               : changeStatus.value ||
                 (valueOfTask.typeOfValue === 'multiple' ? valueOfTask.valueId?.value : null)}
         </span>
         {valueOfTask.typeOfValue === 'multiple' ? (
            <DropdownStatus
               isOpen={openStatusBox}
               setOpenStatusBox={setOpenStatusBox}
               setChangeStatus={setChangeStatus}
               columnId={valueOfTask.belongColumn}
               valueID={valueOfTask._id}
            />
         ) : (
            <ValueCustomizedByColumnType
               task={task}
               valueTask={valueOfTask}
               nameOfType={itemColumn?.belongType.name}
            />
         )}
      </td>
   );
};

export default ValueTask;
