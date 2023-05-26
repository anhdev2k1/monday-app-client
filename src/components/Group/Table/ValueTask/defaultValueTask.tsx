import React from 'react';
import './valueTask.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IPropsDefaultValue {
   text: string | null;
   handleEmptyValue: () => void;
   icon: JSX.Element;
   setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}
const DefaultValueTask = ({ text, handleEmptyValue, icon, setIsEdit }: IPropsDefaultValue) => {
   return (
      <div
         onClick={() => {
            setIsEdit && setIsEdit(true);
         }}
         className="default__value--task--wrapper"
      >
         <div className="default__value--task">
            {!text && icon}
            <button className="value__task--btn" onClick={handleEmptyValue}>
               <FontAwesomeIcon icon={faXmark} />
            </button>
         </div>
      </div>
   );
};

export default DefaultValueTask;
