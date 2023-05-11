import React, { useEffect } from 'react';
import { DeleteOutlined, SearchOutlined, PlusOutlined, AppstoreOutlined } from '@ant-design/icons';
import './sidebar.scss';
import ModalBox from '../Modal';
import ButtonCustom from '../Button/ButtonCustom';
import { SizeType } from '~/shared/model/global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { setDisplayOverlay } from '../Overlay/overlay.reducer';
import ModalCustom from '../ModalCustom/modalCustom';
import { getListlWorkspace } from '~/pages/Workspace/workspace.reducer';
import ItemWorkspace from './itemWorkspace';
const ToggleWorkspace = () => {
   const dispatch = useAppDispatch();
   const listlWorkspace = useAppSelector((state) => state.workspaceSlice.infoListWorkSpace.data);
   useEffect(() => {
      dispatch(getListlWorkspace());
   }, []);
   return (
      <div
         onClick={(e) => {
            e.stopPropagation();
         }}
         className="workspace__modal-hover"
      >
         <div className="workspace__modal-search">
            <input
               type="text"
               className="workspace__modal-input"
               placeholder="Search for a workspace"
            />
            <div className="workspace__modal-search-btn">
               <SearchOutlined />
            </div>
         </div>
         <div className="workspace__modal-list">
            <h3>My workspaces</h3>
            {/* <div className="workspace__modal-item">
               <div className="workspace__modal-item-avt">
                  <span>F</span>
               </div>
               <span className="workspace__modal-item-name">Full Product Developer</span>
            </div> */}
            {listlWorkspace &&
               listlWorkspace.map((data, index) => {
                  return <ItemWorkspace key={index} name={data.name} />;
               })}
         </div>
         <div className="workspace__modal-feature">
            <ButtonCustom
               onClick={() => {
                  dispatch(
                     setDisplayOverlay({
                        isDisplay: true,
                        children: (
                           <ModalCustom
                              title="Add new workspace"
                              type="Workspace"
                              valueCreate="New Workspace"
                           />
                        ),
                     }),
                  );
               }}
               leftIcon={<FontAwesomeIcon icon={faPlus} />}
               sizeType={SizeType.Medium}
               className="modal__feature--add"
               title="Add workspace"
            />
            <ButtonCustom
               leftIcon={<FontAwesomeIcon icon={faPlus} />}
               sizeType={SizeType.Medium}
               className="modal__feature--browse"
               title="Browse all"
            />
         </div>
      </div>
   );
};

export default ToggleWorkspace;
