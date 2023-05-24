import Navbar from '~/components/Navbar/navbar';
import './workspace.scss';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getListlWorkspace } from './workspace.reducer';
import { useEffect } from 'react';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { StatusType } from '~/shared/model/global';
import icons from '../../assets/svg/index';
import Tippy from '~/components/Tippy';
import NavbarTop from '~/components/NavbarTop/navbarTop';
const Workspace = () => {
   const [messageApi, contextHolder] = message.useMessage();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   // const currentUser = useAppSelector((state) => state.userSlice.login.data?.user);
   const listWorkspaces = useAppSelector((state) => state.workspaceSlice.infoListWorkSpace.data);

   const handleRedirect = (e: any, workspaceID: string) => {
      e.preventDefault();
      const pathName = e.currentTarget.getAttribute('data-path');
      messageApi.loading('Đợi xý nhé...');
      setTimeout(() => {
         navigate(`/${pathName}/${workspaceID}`);
      }, 500);
   };
   const getWorkspaces = () => {
      dispatch(getListlWorkspace());
   };
   useEffect(() => {
      getWorkspaces();
   }, []);
   return (
      <>
         {contextHolder}

         <NavbarTop />
         <div className="workspace__wrapper">
            <div className="circle"></div>
            <div className="circle_two"></div>
            <div className="container">
               <div className="workspace__main">
                  <Navbar />
                  {typeof listWorkspaces !== 'undefined' &&
                     (listWorkspaces.length > 0 ? (
                        <div className="workspace__main-left">
                           <section className="workspace__content">
                              <h2 className="workspace__content-heading">My workspaces</h2>
                              <div className="workspace__content-list">
                                 {listWorkspaces.map((item, index) => {
                                    return (
                                       <div
                                          className="workspace__content-item"
                                          onClick={(e) => handleRedirect(e, item._id!)}
                                          data-path="workspace"
                                          key={index}
                                       >
                                          <div className="content__item-box workspace__item-flex">
                                             <div className="content__item-icon">
                                                <span>{item.name.substring(0, 1)}</span>
                                             </div>
                                             <div className="workspace__item-title">
                                                <span className="workspace__item-title--heading">
                                                   {item.name}
                                                </span>
                                                <span className="workspace__item-title--desc">
                                                   work management
                                                </span>
                                             </div>
                                          </div>
                                       </div>
                                    );
                                 })}
                              </div>
                           </section>
                        </div>
                     ) : (
                        <div className="workspace__content">
                           <ButtonCustom
                              statusType={StatusType.Primary}
                              title="Add new workspace"
                           />
                        </div>
                     ))}
               </div>
            </div>
         </div>
      </>
   );
};

export default Workspace;
