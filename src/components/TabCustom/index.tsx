import { Button, Checkbox, Divider, Tabs } from 'antd';
import './tabCustom.scss';
interface IPropsTabCustom {
   arr: {
      label: JSX.Element;
      info: JSX.Element;
   }[];
}
const TabCustom = ({ arr }: IPropsTabCustom) => {
   const items = arr.map((data, i) => {
      const id = String(i + 1);
      return {
         label: data.label,
         key: id,
         children: data.info,
      };
   });

   return (
      <>
         <Tabs items={items} />
      </>
   );
};

export default TabCustom;
