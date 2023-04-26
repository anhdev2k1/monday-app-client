import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './Button.scss';

interface PropsTypeButton {
   to?: string;
   // css
   primary?: boolean;
   active?: boolean;
   disabled?: boolean;
   small?: boolean;
   large?: boolean;
   warning?: boolean;
   transparent?: boolean;
   // variable
   type?: 'button' | 'submit' | 'reset';
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
   primary = false,
   active = false,
   disabled = false,
   transparent = false,
   small = false,
   large = false,
   warning = false,
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
   if (disabled) {
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
   const classes = `wrapperBtn ${primary ? 'primary' : ''} 
   ${active ? 'active' : ''} ${transparent ? 'transparent' : ''}
    ${disabled ? 'disabled' : ''} ${warning ? 'warning' : ''}
       ${small ? 'small' : ''} ${large ? 'large' : ''} ${className ? className : ''}`;

   return (
      <Comp className={classes.trim()} {...props}>
         {leftIcon && <span className="icon">{leftIcon}</span>}
         <span className="title">{title}</span>
         {rightIcon && <span className="icon">{rightIcon}</span>}
      </Comp>
   );
};

export default ButtonCustom;
