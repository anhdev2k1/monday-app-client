import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonCustom from '../Button/ButtonCustom';
import { faAngleDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const MainTable = () => {
   return (
      <div>
         <div className="table__head">
            <ButtonCustom
               primary
               title="New item"
               // transparent
               rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
            />
            <ButtonCustom
               title="New item"
               // transparent
               leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            />
            <ButtonCustom
               title="New item"
               // transparent
               rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
            />
            <ButtonCustom
               title="New item"
               // transparent
               rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
            />
            <ButtonCustom
               title="New item"
               // transparent
               rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
            />
         </div>
      </div>
   );
};

export default MainTable;
