import icons from '~/assets/svg/index';
import { useCallback, useRef, useState } from 'react';
import ColorEdit from '../ColorEdit/colorEdit';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { useAppDispatch } from '~/config/store';
import {
   handleDeleteValueListStatus,
   handleEditValueListStatus,
   updateValueAfterEditing,
} from '~/pages/Board/board.reducer';

interface IValueStatus {
   _id: string;
   color: string;
   value: string;
}
interface IInputEditProps {
   data: IValueStatus;
   columnId: string;
}
const InputEdit = ({ data, columnId }: IInputEditProps) => {
   const dispatch = useAppDispatch();
   // const handleEditValueOfTask = (key : "color" | 'value', value : string)=>{

   // }
   const [valueInput, setValueInput] = useState(data.value);
   // const [color, setColor] = useState('');
   const inputValue: React.MutableRefObject<any> = useRef();
   const handleChangeValue = () => {
      setValueInput(inputValue.current.value);
   };
   const [openColorBox, setOpenColorBox] = useState(false);
   const handleOpenColorBox = () => {
      inputValue.current.focus();
      setOpenColorBox((pre) => !pre);
   };
   const handleUpdateValue = async (key: 'value' | 'color', value: string) => {
      if ((key === 'value' && data.value !== value) || (key === 'color' && data.color !== value)) {
         dispatch(
            handleEditValueListStatus({
               columnId,
               key,
               valueSelectId: data._id,
               value,
            }),
         );
         console.log({ data, key, value });
         dispatch(
            updateValueAfterEditing({
               valueId: data._id,
               key,
               value,
            }),
         );
         // dispatch(
         //    handleUpdateAllSelectedValue({
         //       valueId: data._id,
         //       key,
         //       value,
         //    }),
         // );
         // setChangeStatus({
         //    ...data,
         //    [key]: value,
         // });
      }
      await axios.patch(`${SERVER_API_URL}v1/api/values/${data._id}`, {
         [key]: value,
      });
   };
   const handleDeleteValue = async (valueID: string) => {
      dispatch(
         handleDeleteValueListStatus({
            columnId,
            valueSelectId: data._id,
         }),
      );
      // setListStatusState((pre) => pre.filter((value) => value._id !== valueID));
      await axios.delete(`${SERVER_API_URL}v1/api/column/${columnId}/values/${valueID}`);
   };
   return (
      <>
         <div className="list__input-wrapper">
            <div className="item-input-wrapper">
               <div
                  className="status__input-icon"
                  style={{ backgroundColor: data.color }}
                  onClick={handleOpenColorBox}
               >
                  <img src={icons.color} alt="" />
                  <ColorEdit
                     handleUpdateValue={handleUpdateValue}
                     columnId={columnId}
                     setOpenColorBox={setOpenColorBox}
                     isOpen={openColorBox}
                     // setColor={setColor}
                     // setListStatusState={setListStatusState}
                     valueTask={data}
                  />
               </div>
               <input
                  type="text"
                  className="status__item-input"
                  value={valueInput || ''}
                  ref={inputValue}
                  onChange={handleChangeValue}
                  onBlur={() => {
                     handleUpdateValue('value', valueInput);
                  }}
               />
            </div>
            <div className="status__input-delete" onClick={() => handleDeleteValue(data._id)}>
               <img src={icons.close} alt="" />
            </div>
         </div>
      </>
   );
};

export default InputEdit;
