import React from 'react';
import NavbarTop from '~/components/NavbarTop/navbarTop';
import Sidebar from '~/components/Sidebar/sidebar';
import { IChildrenComponentProps } from '~/shared/model/global';
import './layout.scss';
const LayoutWorkspace: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <div>
         <NavbarTop />
         <div className="wrapper">
            <Sidebar/>
            <div className="content">{children}</div>
         </div>
      </div>
   );
};

export default LayoutWorkspace;
