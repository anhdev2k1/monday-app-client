import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import './group.scss';
import { useState } from 'react';
import Tippy from '../Tippy';
import HeaderTable from './headerTable';
import Row from '../Row';
import { IGroup } from '~/shared/model/group';
import { IColumn } from '~/shared/model/column';
import { useAppDispatch } from '~/config/store';
interface IPropsGroup {
   data: IGroup;
   columns: IColumn[];
}
const Group = ({ data, columns }: IPropsGroup) => {
   
   const [valueNameInput, setValueNameInput] = useState<string>(data.name);
   const dispatch = useAppDispatch()
   const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = e.target as HTMLInputElement;
      setValueNameInput(value);
      
   };
   const handleBlur = (e:any) => {
      const {value} = e.target as HTMLInputElement;

   }
   return (
      <div className="group">
         <div className="group__head">
            <button className="head__btn--option">
               <FontAwesomeIcon icon={faEllipsis} />
            </button>
            <div className="head__input--wrap">
               <Tippy position="top" html={<p>Collapse group</p>}>
                  <FontAwesomeIcon className="input--icon" icon={faAngleDown} />
               </Tippy>

               <Tippy position="top" html={<p>Click to edit</p>}>
                  <input
                     onChange={(e) => {
                        handleChangeValue(e);
                     }}
                     onBlur={(e) => handleBlur(e)}
                     className="input__group"
                     type="text"
                     value={valueNameInput}
                  />
               </Tippy>
            </div>
         </div>
         <div className="group__table">
            <HeaderTable columns={columns} />
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
         </div>
      </div>
   );
};

export default Group;
