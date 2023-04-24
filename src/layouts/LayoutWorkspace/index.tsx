import { Col, Row } from 'antd';
import React from 'react';
import { IChildrenComponentProps } from '~/shared/model/global';
const LayoutWorkspace: React.FC<IChildrenComponentProps> = ({ children }) => {
   return (
      <div>
         <nav></nav>
         <Row>
            <Col
               md={{ span: 6, offset: 0 }}
               xs={{ span: 6, offset: 0 }}
               lg={{ span: 6, offset: 0 }}
            >
               sidebar
            </Col>
            <Col
               md={{ span: 18, offset: 0 }}
               xs={{ span: 18, offset: 0 }}
               lg={{ span: 18, offset: 0 }}
            >
               <div>{children}</div>
            </Col>
         </Row>
      </div>
   );
};

export default LayoutWorkspace;
