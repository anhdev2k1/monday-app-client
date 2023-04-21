import React from 'react';
import { IChildrenComponentProps } from '~/shared/model/global';
const DefaultLayout: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <div>
         <nav>Navbar</nav>
         <div className="container">{children}</div>
      </div>
   );
};

export default DefaultLayout;
