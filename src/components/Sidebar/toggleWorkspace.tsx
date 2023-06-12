import { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './sidebar.scss';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getListlWorkspace } from '~/pages/Workspace/workspace.reducer';
import ItemWorkspace from './itemWorkspace';
import icons from '../../assets/svg/index';
import ModalCustom from '../ModalCustom/modalCustom';
import { setDisplayOverlay } from '../Overlay/overlay.reducer';
const ToggleWorkspace = () => {
   const dispatch = useAppDispatch();
   const listlWorkspace = useAppSelector((state) => state.workspaceSlice.infoListWorkSpace.data);
   useEffect(() => {
      dispatch(getListlWorkspace());
   }, []);
   const handleAddWorkspace = () => {
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
   }
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

            {listlWorkspace &&
               listlWorkspace.map((data, index) => {
                  return <ItemWorkspace key={index} dataWorkspace={data} />;
               })}
         </div>
         <div className="workspace__modal-feature" onClick={handleAddWorkspace}>
            <div className="workspace__modal-feature--item">
               <img src={icons.add} alt="" />
               <span>Add workspace</span>
            </div>
         </div>
      </div>
   );
};

export default ToggleWorkspace;
