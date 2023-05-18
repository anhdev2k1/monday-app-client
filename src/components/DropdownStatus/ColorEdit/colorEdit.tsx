import { colorsData } from './colorsData';
import './colorEdit.scss';
import Tippy from '~/components/Tippy';
interface IColorEditProps {
   setOpenColorBox: (isOpen: boolean) => void;
   isOpen: boolean;
   setColor: (color:string) => void
}
const ColorEdit = ({ setOpenColorBox, isOpen, setColor }: IColorEditProps) => {
   const handleUpdateColor = (color:string) => {
      setOpenColorBox(true)
      setColor(color)
   }
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
                              onClick={() =>handleUpdateColor(color.color)}
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
