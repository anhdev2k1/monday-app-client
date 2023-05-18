import DropdownStatus from '~/components/DropdownStatus/dropdownStatus';
import { useState, useRef, useEffect } from 'react';
import { IValueOfTask } from '~/shared/model/task';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { useParams } from 'react-router-dom';
interface IValueTaskProps {
   value: IValueOfTask;
   columnID: string;
}
const ValueTask = ({ value, columnID }: IValueTaskProps) => {
   const [openStatusBox, setOpenStatusBox] = useState(false);
   const [changeStatus, setChangeStatus] = useState<any>({ value: '', color: '' });
   const { idBoard } = useParams();
   const [listStatus, setListStatus] = useState([]);
   const handleOpenStatus = () => {
      setOpenStatusBox((pre) => !pre);
   };

   useEffect(() => {
      const getValueStatus = async () => {
         const res = await axios.get(
            `${SERVER_API_URL}v1/api/board/${idBoard}/column/${columnID}/values`,
         );
         setListStatus(res.data.metadata.values);
      };
      getValueStatus();
   }, []);
   
   return (
      <td
         key={value._id}
         style={{
            backgroundColor: `${
               changeStatus.color === ''
                  ? value.typeOfValue === 'multiple'
                     ? value.valueId.color
                     : null
                  : changeStatus.color
            }`,
         }}
         className="table__data-task-value"
         onClick={handleOpenStatus}
      >
         {changeStatus.value === ''
            ? value.typeOfValue === 'multiple'
               ? value.valueId.value
               : value.value
            : changeStatus.value}
         <DropdownStatus
            isOpen={openStatusBox}
            setOpenStatusBox={setOpenStatusBox}
            setChangeStatus={setChangeStatus}
            listStatus={listStatus}
            columnID={columnID}
         />
      </td>
   );
};

export default ValueTask;
