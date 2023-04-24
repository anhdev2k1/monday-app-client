import React from 'react';
import Navbar from '~/components/Navbar/navbar';
import { IChildrenComponentProps } from '~/shared/model/global';
const DefaultLayout: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <>
      {children}
      </>
   );
};

export default DefaultLayout;
