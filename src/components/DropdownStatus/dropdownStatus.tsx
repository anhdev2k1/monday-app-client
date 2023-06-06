import './dropdownStatus.scss';
import { useEffect, useRef, useState } from 'react';
import icons from '~/assets/svg/index';
import InputEdit from './InputEdit/inputEdit';
import { colorsData } from './ColorEdit/colorsData';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { IDefaultValue } from '~/shared/model/column';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { handleAddValueListStatus } from '~/pages/Board/board.reducer';
import { ISetInfoValueTask } from '../Group/Table/ValueTask/valueTask';
interface IDropdownStatusProps extends ISetInfoValueTask {
   isOpen: boolean;
   idBoard?: string;
   setOpenStatusBox: React.Dispatch<React.SetStateAction<boolean>>;
   columnId: string;
   valueID: string;
}
const DropdownStatus = ({
   isOpen,
   idBoard,
   setOpenStatusBox,
   selectValueHandler,
   columnId,
   valueID,
}: IDropdownStatusProps) => {
   const indexTab = useAppSelector((state) => state.boardSlice.indexTab);
   useEffect(() => {
      setOpenStatusBox(false);
   }, [indexTab]);

   const [isEdit, setIsEdit] = useState(false);
   const [isApply, setIsApply] = useState(false);
   useEffect(() => {
      if (isApply) {
         setOpenStatusBox(false);
      }
   }, [isApply]);
   const dispatch = useAppDispatch();
   // const dropdownElement = useRef<HTMLDivElement>(null);
   const applyElement = useRef<HTMLDivElement>(null);

   const itemColumn = useAppSelector((state) =>
      state.boardSlice.currBoard.data?.columns.find((col) => col._id === columnId),
   );

   // const [listStatusState, setListStatusState] = useState(listStatus);
   const [colorsIsSamp, setColorsIsSamp] = useState(
      itemColumn?.defaultValues?.map((value) => value.color),
   );
   // useEffect(() => {
   //    setListStatusState(listStatus);
   //    setColorsIsSamp(listStatus);
   // }, [listStatus]);
   const handleEditStatus = () => {
      setIsEdit(true);
   };
   useEffect(() => {
      if (!isOpen) setIsEdit(false);
   }, [isOpen]);
   useEffect(() => {
      return () => {
         setIsApply(false);
      };
   }, []);
   const handleValueSelection = async (values: IDefaultValue) => {
      // setChangeStatus((prev) => {
      //    return {
      //       ...prev,
      //       idSelected: values._id,
      //       value: values.value,
      //       color: values.color,
      //    };
      // });
      selectValueHandler(values);
      await axios.patch(`${SERVER_API_URL}v1/api/tasksColumns/${valueID}`, {
         value: values.value,
         valueId: values._id,
      });
      setOpenStatusBox(false);
   };
   const handleAddValueStatus = async () => {
      if (Array.isArray(colorsIsSamp)) {
         const ColorsNoSame = colorsData.filter((data) => !colorsIsSamp.includes(data.color));
         const randomColor = ColorsNoSame[Math.floor(Math.random() * ColorsNoSame.length)];
         setColorsIsSamp((pre) => {
            if (Array.isArray(pre)) return [...pre, randomColor.color];
         });
         const { color } = randomColor;

         //Add value request
         const res = await axios.post(
            `${SERVER_API_URL}v1/api/board/${idBoard}/column/${columnId}/values`,
            { value: '', color },
         );
         dispatch(
            handleAddValueListStatus({
               columnId,
               newValueStatus: {
                  _id: res.data.metadata.value._id,
                  color: res.data.metadata.value.color,
                  value: '',
               },
            }),
         );
      }
   };
   return (
      <>
         {isOpen && (
            <div
               // ref={dropdownElement}
               className="status__wrapper"
               onClick={(e) => {
                  // e.stopPropagation();
                  setOpenStatusBox(false);
               }}
            >
               <div className="status__wrapper-flex">
                  {!isEdit ? (
                     <div className="list__status">
                        {itemColumn?.defaultValues.map((item) => {
                           return (
                              <div
                                 key={item._id}
                                 className="status__item"
                                 style={{ backgroundColor: item.color }}
                                 data-color={item.color}
                                 onClick={(e) => handleValueSelection(item)}
                              >
                                 <span className="status__item-title">{item.value}</span>
                              </div>
                           );
                        })}
                     </div>
                  ) : (
                     <div
                        onClick={(e) => {
                           e.stopPropagation();
                           // setOpenStatusBox(false);
                        }}
                        className="list__status-input"
                     >
                        {itemColumn?.defaultValues.map((item) => {
                           return <InputEdit data={item} key={item._id} columnId={columnId} />;
                        })}
                        {isEdit && (
                           <div className="item__add-status" onClick={handleAddValueStatus}>
                              <span>+ Add new label</span>
                           </div>
                        )}
                     </div>
                  )}
               </div>
               <div ref={applyElement} className="status__edit-wrapper">
                  {!isEdit ? (
                     <div onClick={handleEditStatus} className="status__edit-btn">
                        <img src={icons.edit} alt="" />
                        <span className="status__item-title">Edit labels</span>
                     </div>
                  ) : (
                     <div
                        onClick={() => {
                           setIsApply(true);
                        }}
                        className="status__edit-btn"
                     >
                        <span className="status__item-title">Apply</span>
                     </div>
                  )}
               </div>
            </div>
         )}
      </>
   );
};

export default DropdownStatus;
