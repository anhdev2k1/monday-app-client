import { colorsData } from './colorsData';
import './colorEdit.scss';
import Tippy from '~/components/Tippy';
import { useAppDispatch } from '~/config/store';
import { handleEditValueListStatus } from '~/pages/Board/board.reducer';
interface IValueStatus {
   _id: string;
   color: string;
   value: string;
}
interface IColorEditProps {
   setOpenColorBox: (isOpen: boolean) => void;
   isOpen: boolean;
   // setColor: (color: string) => void;
   columnId: string;
   valueTask: IValueStatus;
   handleUpdateValue: (key: 'value' | 'color', value: string) => Promise<void>;
}
const ColorEdit = ({ isOpen, handleUpdateValue }: IColorEditProps) => {
   return (
      <>
         {isOpen && (
            <div className="color__wrapper">
               <div className="list__color">
                  {colorsData.map((data) => {
                     return (
                        <Tippy html={<p>{data.title}</p>} position="top">
                           <div
                              className="color__item"
                              style={{ backgroundColor: data.color }}
                              onClick={() => handleUpdateValue('color', data.color)}
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
