import React from 'react';
import NavbarTop from '~/components/NavbarTop/navbarTop';
import Sidebar from '~/components/Sidebar/sidebar';
import { IChildrenComponentProps } from '~/shared/model/global';
const LayoutWorkspace: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <div>
         {/* <NavbarTop/> */}
         <div className="wrapper" style={{ display: 'flex', backgroundColor: "#eceff8", gap: "20px", padding: "20px 0"}}>
            <Sidebar />
            <div className="content" style={{flex : 1, backgroundColor: "white", borderRadius: "12px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "15px"}}>{children}</div>
         </div>
      </div>
   );
};

export default LayoutWorkspace;
