import { colorsData } from './colorsData';
import './colorEdit.scss';
import Tippy from '~/components/Tippy';
interface IValueStatus {
   _id: string;
   color: string;
   value: string;
}
interface IColorEditProps {
   setOpenColorBox: (isOpen: boolean) => void;
   isOpen: boolean;
   setColor: (color: string) => void;
   setListStatusState: React.Dispatch<React.SetStateAction<any[]>>;
   valueTask: IValueStatus;
}
const ColorEdit = ({
   setOpenColorBox,
   isOpen,
   setColor,
   setListStatusState,
   valueTask,
}: IColorEditProps) => {
   const handleUpdateColor = (color: string) => {
      setListStatusState((pre) => {
         pre.forEach((itemValue) => {
            if (itemValue._id === valueTask._id && itemValue.color !== color) {
               itemValue.color = color;
            }
         });
         return pre;
      });
      setOpenColorBox(true);
      setColor(color);
   };
   return (
      <>
         {isOpen && (
            <div className="color__wrapper">
               <div className="list__color">
                  {colorsData.map((color) => {
                     return (
                        <Tippy html={color.title} position="top">
                           <div
                              className="color__item"
                              style={{ backgroundColor: color.color }}
                              onClick={() => handleUpdateColor(color.color)}
                           ></div>
                        </Tippy>
                     );
                  })}
               </div>
            </div>
         )}
      </>
   );
};

export default ColorEdit;
