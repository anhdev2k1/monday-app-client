import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './Button.scss';
import { SizeType, StatusType } from '~/shared/model/global';

interface PropsTypeButton {
   to?: string;
   // css
   statusType?: StatusType;
   sizeType?: SizeType;
   // variable
   type?: 'button' | 'submit' | 'reset';
   hideHover?: boolean;
   title?: string;
   className?: string;
   leftIcon?: React.ReactNode;
   rightIcon?: React.ReactNode;
   onClick?: () => void;
   passProps?: any;
}
interface PropsTypeLink {
   onClick?: () => void;
   to?: string;
   [key: string]: any;
}
const ButtonCustom: React.FC<PropsTypeButton> = ({
   to,
   title,
   statusType = StatusType.Transparent,
   sizeType = SizeType.Medium,
   className,
   leftIcon,
   rightIcon,
   onClick,
   ...passProps
}) => {
   let Comp = Button;
   const props: PropsTypeLink = {
      onClick,
      ...passProps,
   };

   // Remove event listener when btn is disabled
   if (statusType === StatusType.Disabled || statusType === StatusType.Nonbehavior) {
      Object.keys(props).forEach((key) => {
         if (key.startsWith('on') && typeof props[key] === 'function') {
            delete props[key];
         }
      });
   }

   if (to) {
      props.to = to;
      Comp = Link;
   }
   const classes = `wrapperBtn ${statusType} ${sizeType}  ${className ? className : ''}`;

   return (
      <Comp className={classes.trim()} {...props}>
         {leftIcon && <span className="icon">{leftIcon}</span>}
         <span className="title">{title}</span>
         {rightIcon && <span className="icon">{rightIcon}</span>}
      </Comp>
   );
};

export default ButtonCustom;
