import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonCustom from '../Button/ButtonCustom';
import { faAngleDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Card from '../Card';
import { StatusType } from '~/shared/model/global';

const Cards = () => {
   return (
      <>
         <div className="table__head">
            <ButtonCustom
               statusType={StatusType.Primary}
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
         <div className="cards" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
         </div>
      </>
   );
};

export default Cards;
