import React, { useState } from 'react';
import DefaultValueTask from '../Group/Table/ValueTask/defaultValueTask';
import { ITask, IValueOfTask } from '~/shared/model/task';
import './valueIsText.scss';
import { useAppDispatch } from '~/config/store';
import { handleSetValueTask } from '~/pages/Board/board.reducer';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
interface IPropsValueIsText {
   valueTask: IValueOfTask;
   icon: JSX.Element;
   task: ITask;
}

const ValueIsText = ({ valueTask, icon, task }: IPropsValueIsText) => {
   const [valueBox, setValueBox] = useState<string | null>(valueTask.value);
   const [isEdit, setIsEdit] = useState<boolean>(false);
   const dispatch = useAppDispatch();
   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueBox(e.target.value);
   };
   console.log(valueBox);

   const handleEmptyValue = () => {
      setValueBox(null);
   };
   return (
      <div className="value__text">
         {isEdit ? (
            <input
               autoFocus
               onBlur={async (e) => {
                  if (e.target.value !== valueTask.value) {
                     dispatch(
                        handleSetValueTask({
                           newValue: e.target.value,
                           taskId: task._id,
                           valueId: valueTask._id,
                        }),
                     );
                     await axios.patch(`${SERVER_API_URL}v1/api/tasksColumns/${valueTask._id}`, {
                        value: valueBox,
                        valueId: null,
                     });
                  }
                  setTimeout(() => {
                     setIsEdit(false);
                  }, 500);
               }}
               className="value__text--input"
               type="text"
               value={valueBox || ''}
               onChange={(e) => {
                  handleDateChange(e);
               }}
            />
         ) : (
            <DefaultValueTask
               setIsEdit={setIsEdit}
               icon={icon}
               handleEmptyValue={handleEmptyValue}
               text={valueBox}
            />
         )}
      </div>
   );
};

export default ValueIsText;
