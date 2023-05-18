import icons from '~/assets/svg/index';
import { useRef, useState } from 'react';
import ColorEdit from '../ColorEdit/colorEdit';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';

interface IValueStatus {
   _id: string;
   color: string;
   value: string;
}
interface IInputEditProps {
   data: IValueStatus;
   setListStatusState: React.Dispatch<React.SetStateAction<any[]>>;
}
const InputEdit = ({ data, setListStatusState }: IInputEditProps) => {
   const [valueInput, setValueInput] = useState(data.value);
   const [color, setColor] = useState('');
   const inputValue = useRef<any>();
   const handleChangeValue = () => {
      console.log(inputValue.current.value);
      setValueInput(inputValue.current.value);
   };
   const [openColorBox, setOpenColorBox] = useState(false);
   const handleOpenColorBox = () => {
      inputValue.current.focus()
      setOpenColorBox((pre) => !pre);
   };
   const handleUpdateValue = async () => {
      
      setListStatusState((pre) => {
         pre.forEach((itemValue) => {
            if (itemValue._id === data._id && itemValue.value !== valueInput) {
               itemValue.value = valueInput;
            }
         });
         return pre;
      });
      await axios.patch(`${SERVER_API_URL}v1/api/values/${data._id}`, {
         value: valueInput,
         color: color === '' ? data.color : color,
      });
      
   };
   const handleDeleteValue = async (valueID: string) => {
      setListStatusState((pre) => pre.filter((value) => value._id !== valueID));
      await axios.delete(`${SERVER_API_URL}v1/api/values/${valueID}`);
   };
   return (
      <>
         <div className="list__input-wrapper" >
            <div className="item-input-wrapper" onBlur={handleUpdateValue}>
               <div
                  className="status__input-icon"
                  style={{ backgroundColor: color ? color : data.color }}
                  onClick={handleOpenColorBox}
               >
                  <img src={icons.color} alt="" />
                  <ColorEdit
                     setOpenColorBox={setOpenColorBox}
                     isOpen={openColorBox}
                     setColor={setColor}
                  />
               </div>
               <input
                  type="text"
                  className="status__item-input"
                  value={valueInput}
                  ref={inputValue}
                  onChange={handleChangeValue}
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
