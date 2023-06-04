import './dropdownStatus.scss';
import { useEffect, useRef, useState } from 'react';
import icons from '~/assets/svg/index';
import InputEdit from './InputEdit/inputEdit.v2';
import { IColors, colorsData } from './ColorEdit/colorsData';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { useParams } from 'react-router-dom';
import { IValueOfTask } from '~/shared/model/task';
import { IDefaultValue } from '~/shared/model/column';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { handleAddValueListStatus } from '~/pages/Board/board.reducer';
import { ISetInfoValueTask } from '../Group/Table/ValueTask/valueTask.v2';
interface IDropdownStatusProps extends ISetInfoValueTask {
   isOpen: boolean;
   setOpenStatusBox: React.Dispatch<React.SetStateAction<boolean>>;
   listStatus: IDefaultValue[];
   columnId: string;
   valueID: string;
}
const DropdownStatus = ({
   isOpen,
   setOpenStatusBox,
   setChangeStatus,
   listStatus,
   columnId,
   valueID,
}: IDropdownStatusProps) => {
   const { idBoard } = useParams();
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
   const dropdownElement = useRef<HTMLDivElement>(null);
   const applyElement = useRef<HTMLDivElement>(null);

   // const [listStatusState, setListStatusState] = useState(listStatus);
   const [colorsIsSamp, setColorsIsSamp] = useState(listStatus?.map((value) => value.color));
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
   const handleChangeStatus = async (values: IDefaultValue) => {
      // setChangeStatus((prev) => {
      //    return {
      //       ...prev,
      //       idSelected: values._id,
      //       value: values.value,
      //       color: values.color,
      //    };
      // });
      setChangeStatus(values);
      await axios.patch(`${SERVER_API_URL}v1/api/tasksColumns/${valueID}`, {
         value: values.value,
         valueId: values._id,
      });
      setOpenStatusBox(false);
   };
   const handleAddValueStatus = async () => {
      const ColorsNoSame = colorsData.filter((data) => !colorsIsSamp.includes(data.color));
      const randomColor = ColorsNoSame[Math.floor(Math.random() * ColorsNoSame.length)];
      setColorsIsSamp((pre) => [...pre, randomColor.color]);
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
   };
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         const targetElement = event.target as HTMLElement;
         const parentElement = dropdownElement.current?.closest('.table__data-task-value');
         // const childrenElemt = targetElement.closest('.status__wrapper-flex');

         if (
            dropdownElement.current &&
            !dropdownElement.current.contains(event.target as Node) &&
            targetElement !== parentElement
            // &&
            // childrenElemt === parentElement
         ) {
            setOpenStatusBox(false);
         }
      };

      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         {isOpen && (
            <div
               ref={dropdownElement}
               className="status__wrapper"
               onClick={(e) => {
                  // e.stopPropagation();
                  setOpenStatusBox(false);
               }}
            >
               <div className="status__wrapper-flex">
                  {!isEdit ? (
                     <div className="list__status">
                        {listStatus.map((item) => {
                           return (
                              <div
                                 key={item._id}
                                 className="status__item"
                                 style={{ backgroundColor: item.color }}
                                 data-color={item.color}
                                 onClick={(e) => handleChangeStatus(item)}
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
                        {listStatus.map((item) => {
                           return (
                              <InputEdit
                                 data={item}
                                 key={item._id}
                                 columnId={columnId}
                                 setChangeStatus={setChangeStatus}
                              />
                           );
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
