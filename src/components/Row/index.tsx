import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
import './row.scss';
import ResizableBox from '../Resizable';
const Row = () => {
   return (
      <ul className="cols__row">
         <li className="col__row__item">
            {/* <label htmlFor="checked"></label> */}
            <input type="checkbox" id="checked" />
         </li>
         <ResizableBox right={false} id={0}>
            {/* <span>Items</span> */}
         </ResizableBox>
         <ResizableBox right={false} id={1}>
            {/* <span>Status</span> */}
         </ResizableBox>
         <ResizableBox right={false} id={2}>
            {/* <span>Date</span> */}
         </ResizableBox>
         <ResizableBox right={false} id={3}>
            {/* <span>Numbers</span> */}
         </ResizableBox>
         <ResizableBox right={false} id={4}>
            {/* <span>Numbers</span> */}
         </ResizableBox>
      </ul>
   );
};

export default Row;
