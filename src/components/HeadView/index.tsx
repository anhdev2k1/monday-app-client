import ButtonCustom from '../Button/ButtonCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './headView.scss';
import {
   faAngleDown,
   faEyeSlash,
   faFilter,
   faMagnifyingGlass,
   faSort,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '../Tippy';
import { StatusType } from '~/shared/model/global';

const HeadView = () => {
   return (
      <div className="table__head">
         <ButtonCustom
            statusType={StatusType.Primary}
            title="New item"
            rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
         />
         <ButtonCustom title="Search" leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />} />
         <Tippy position="top" html={<p>Filter by anything</p>}>
            <ButtonCustom
               title="Filter"
               rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
               leftIcon={<FontAwesomeIcon icon={faFilter} />}
            />
         </Tippy>
         <Tippy position="top" html={<p>Sort by any column</p>}>
            <ButtonCustom title="Sort" leftIcon={<FontAwesomeIcon icon={faSort} />} />
         </Tippy>
         <Tippy position="top" html={<p>Hidden columns</p>}>
            <ButtonCustom title="Hide" leftIcon={<FontAwesomeIcon icon={faEyeSlash} />} />
         </Tippy>
      </div>
   );
};

export default HeadView;
