import { ReactNode } from 'react';
import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

interface IPropsTooltip {
   children: ReactNode;
   html: ReactNode;
   position: TooltipPlacement;
}
const Tippy = ({ children, html, position }: IPropsTooltip) => (
   <div>
      <div>
         <Tooltip autoAdjustOverflow placement={position} title={html}>
            {children}
         </Tooltip>
      </div>
   </div>
);

export default Tippy;
