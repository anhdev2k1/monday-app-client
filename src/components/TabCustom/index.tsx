import { Button, Checkbox, Divider, Tabs } from 'antd';
import './tabCustom.scss';
import { useAppSelector } from '~/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import HeadView from '../HeadView';
interface IPropsTabCustom {
   arr: {
      label: JSX.Element;
      info: JSX.Element;
   }[];
}
const TabCustom = ({ arr }: IPropsTabCustom) => {
   const currBoard = useAppSelector((state) => state.boardSlice.currBoard.data);
   const items = arr.map((data, i) => {
      const id = String(i + 1);
      return {
         label: data.label,
         key: id,
         children: data.info,
      };
   });

   return (
      <div className="thuan_22">
         <p className="board__title">
            <span>{currBoard?.name}</span> <FontAwesomeIcon icon={faCircleExclamation} />
         </p>
         <HeadView />
         <Tabs items={items} />
      </div>
   );
};

export default TabCustom;
