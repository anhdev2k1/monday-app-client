import DropdownStatus from '~/components/DropdownStatus/dropdownStatus';
import { useState, useRef, useEffect } from 'react';
import { IItemInListValueSelect, IValueOfTask } from '~/shared/model/task';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { useParams } from 'react-router-dom';
import { IColumn } from '~/shared/model/column';
import { useAppSelector } from '~/config/store';
interface IValueTaskProps {
   valueOfTask: IValueOfTask;
   // columnID: string;
   colIncludeListValue: IColumn;
}

interface ISelectedOfValueTask extends IItemInListValueSelect {
   idSelected: string | null;
}
export interface ISetInfoValueTask {
   setChangeStatus: React.Dispatch<React.SetStateAction<ISelectedOfValueTask>>;
}
const ValueTask = ({ valueOfTask, colIncludeListValue }: IValueTaskProps) => {
   const valuesSelect = useAppSelector((state) =>
      state.boardSlice.currBoard.data?.columns.flatMap((item) => item.defaultValues),
   );
   // console.log('valuesSelect',valuesSelect[0]!);

   const [openStatusBox, setOpenStatusBox] = useState(false);
   const [changeStatus, setChangeStatus] = useState<{
      _id: string;
      idSelected: string | null;
      value: string | null;
      color: string | null;
   }>({
      _id: valueOfTask._id,
      idSelected: valueOfTask.valueId?._id || null,
      value:
         valueOfTask.typeOfValue === 'multiple' ? valueOfTask.valueId?.value : valueOfTask.value,
      color: valueOfTask.valueId?.color || null,
   });

   useEffect(() => {
      if (valueOfTask.valueId?.color || valueOfTask.valueId?.value)
         setChangeStatus((prev) => {
            return {
               ...prev,
               idSelected: valueOfTask.valueId?._id,
               value: valueOfTask.valueId?.value,
               color: valueOfTask.valueId?.color,
            };
         });
   }, [valueOfTask.valueId?._id, valueOfTask.valueId?.color, valueOfTask.valueId?.value]);

   // const { idBoard } = useParams();
   // const [listStatus, setListStatus] = useState([]);
   const handleOpenStatus = () => {
      setOpenStatusBox((pre) => !pre);
   };

   console.log('valuesSelect', valuesSelect);

   const changeValueSelected = () => {
      if (valuesSelect) {
         const temp = valuesSelect.find((value) => value._id === changeStatus.idSelected);
         return temp;
      }
   };

   return (
      <td
         key={valueOfTask._id}
         style={{
            backgroundColor: `${
               changeValueSelected()?.color ? changeValueSelected()?.color : changeStatus.color
               // changeStatus.color || (value.typeOfValue === 'multiple' ? value.valueId.color : null)
            }`,
         }}
         className="table__data-task-value data-status"
         onClick={handleOpenStatus}
      >
         {
            changeValueSelected()?.value ? changeValueSelected()?.value : changeStatus.value
            // ||(value.typeOfValue === 'multiple' ? value.valueId?.value : value.value)
         }
         {valueOfTask.typeOfValue === 'multiple' ? (
            <DropdownStatus
               isOpen={openStatusBox}
               setOpenStatusBox={setOpenStatusBox}
               setChangeStatus={setChangeStatus}
               listStatus={colIncludeListValue.defaultValues}
               columnId={colIncludeListValue._id}
               valueID={valueOfTask._id}
            />
         ) : null}
      </td>
   );
};

export default ValueTask;
