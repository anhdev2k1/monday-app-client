import React, { useEffect, useState } from 'react';
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
   useEffect(() => {
      setValueBox(valueTask.value);
   }, [valueTask.value]);
   const [isEdit, setIsEdit] = useState<boolean>(false);
   const dispatch = useAppDispatch();
   const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueBox(e.target.value);
   };
   console.log(valueBox);

   const handleEmptyValue = async () => {
      setValueBox(null);
      await axios.patch(`${SERVER_API_URL}v1/api/tasksColumns/${valueTask._id}`, {
         value: '',
         valueId: null,
      });
   };
   return (
      <div className="value__text">
         {isEdit ? (
            <input
               autoFocus
               onBlur={(e) => {
                  if (e.target.value !== valueTask.value || e.target.value === '') {
                     dispatch(
                        handleSetValueTask({
                           newValue: e.target.value,
                           taskId: task._id,
                           valueId: valueTask._id,
                        }),
                     );
                     (async () => {
                        await axios.patch(`${SERVER_API_URL}v1/api/tasksColumns/${valueTask._id}`, {
                           value: valueBox,
                           valueId: null,
                        });
                     })();
                  }
                  setIsEdit(false);
               }}
               className="value__text--input"
               type="text"
               value={valueBox || ''}
               onChange={(e) => {
                  handleValueChange(e);
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
