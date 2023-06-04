import './card.scss';
import { ITaskCard } from '../Cards';
import ItemInCard from './ItemInCard/itemInCard';
import images from '~/assets/svg';
import Tippy from '../Tippy';
import { useAppDispatch } from '~/config/store';
import { setDisplayOverlay } from '../Overlay/overlay.reducer';
import ModalCardDetail from './ModalCardDetail/modalCardDetail';
import { setTaskToDisplay } from '~/pages/Board/board.reducer';
import { useParams } from 'react-router-dom';
interface IPropsCard {
   task: ITaskCard;
   idBoard?: string;
}
const Card = ({ task, idBoard }: IPropsCard) => {
   const { iconDesTask } = images;
   const dispatch = useAppDispatch();

   const handleShowModalCartDetail = () => {
      dispatch(
         setTaskToDisplay({
            task: task,
         }),
      );

      dispatch(
         setDisplayOverlay({
            isDisplay: true,
            children: <ModalCardDetail idBoard={idBoard} />,
         }),
      );
   };

   return (
      <div onClick={handleShowModalCartDetail} className="card__item">
         <div className="card__item-title">
            <div className="card__title-header">
               <span className="card__title-header--heading">{task.name}</span>
               <Tippy position="top" html={<p>Start Conversation</p>}>
                  <button className="card__icon--plus">
                     <img src={iconDesTask} alt="card__icon--plus" />
                     {/* <IconDesTask /> */}
                  </button>
               </Tippy>
            </div>
            <div className="card__title-features">
               {task.columns.map((column, index) => {
                  if (column.belongType.name === 'status') {
                     return (
                        <ItemInCard
                           task={task}
                           key={column._id}
                           column={column}
                           value={task.values[index]}
                           idBoard={idBoard}
                        />
                     );
                  }
               })}
            </div>
         </div>
      </div>
   );
};

export default Card;
