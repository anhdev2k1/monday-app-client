import React, { useEffect, useRef, useState } from 'react';
import ButtonCustom from '../Button/ButtonCustom';
import './modalCustom.scss';
import { StatusType } from '~/shared/model/global';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { createBoard, createWorkSpace } from '~/pages/Workspace/workspace.reducer';
import { setDisplayOverlay } from '../Overlay/overlay.reducer';
interface IInfoModal {
   type: string;
   valueCreate: string;
   title: string;
   idWorkspace?: string;
}
const ModalCustom = ({ type, valueCreate, title, idWorkspace }: IInfoModal) => {
   const [valueCreateInput, setValueCreateInput] = useState<string>(valueCreate);
   const dispatch = useAppDispatch();
   const handleSubmitModal = async () => {
      if (type === 'Workspace' && valueCreate) {
         const response = await dispatch(
            createWorkSpace({
               name: valueCreateInput,
            }),
         );
         console.log(response);

         if (response.payload) {
            dispatch(
               setDisplayOverlay({
                  isOpenModal: false,
                  children: <></>,
               }),
            );
         }
      } else if (type === 'Board' && valueCreate && idWorkspace) {
         console.log(idWorkspace);

         // const currentUrl = window.location.href;
         const response = await dispatch(
            createBoard({
               // idWorkspace: currentUrl.substring(currentUrl.lastIndexOf('/') + 1),
               idWorkspace,
               name: valueCreateInput,
            }),
         );
         if (response.payload) {
            dispatch(
               setDisplayOverlay({
                  isOpenModal: false,
                  children: <></>,
               }),
            );
         }
      }
   };

   return (
      <div
         onClick={(e) => {
            e.stopPropagation();
         }}
         className="modal__custom"
      >
         <h3 className="modal__title">{title}</h3>
         {type === 'Workspace' && (
            <div className="workspace__color">
               <span>W</span>
            </div>
         )}
         <p className="modal__type">{type} name</p>
         <input
            onChange={(e) => {
               setValueCreateInput(e.target.value);
            }}
            className="modal__input"
            type="text"
            value={valueCreateInput}
         />

         <div className="modal__option">
            <ButtonCustom
               onClick={() => {
                  dispatch(
                     setDisplayOverlay({
                        isOpenModal: false,
                        children: <></>,
                     }),
                  );
               }}
               className="option__cancel"
               title="Cancel"
            />
            <ButtonCustom
               onClick={handleSubmitModal}
               statusType={StatusType.Primary}
               className="option__create"
               title={`Create ${type}`}
            />
         </div>
      </div>
   );
};

export default ModalCustom;
