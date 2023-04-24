import React from 'react';
import { IChildrenComponentProps } from '~/shared/model/global';
const DefaultLayout: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <>
      {children}
      </>
   );
};

export default DefaultLayout;
