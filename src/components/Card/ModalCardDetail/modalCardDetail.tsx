import { ITaskCard } from '~/components/Cards';
import './modalCardDetail.scss';
import Tippy from '~/components/Tippy';
import ItemInCard from '../ItemInCard/itemInCard';
import images from '~/assets/svg';
interface IPropsCard {
   task: ITaskCard;
}
const ModalCardDetail = ({ task }: IPropsCard) => {
   const { iconDesTask } = images;
   return (
      <div
         onClick={(e) => {
            e.stopPropagation();
         }}
         className="modal__card--detail"
      >
         <div className="modal__card__item">
            <div className="modal__card__item-title">
               <div className="modal__card__title-header">
                  <input className="modal__card__title--input" value={task.name} type="tex" />
                  <Tippy position="top" html={<p>Start Conversation</p>}>
                     <button className="modal__card__icon--plus">
                        <img src={iconDesTask} alt="modal__card__icon--plus" />
                     </button>
                  </Tippy>
               </div>
               <div className="card__title-features">
                  {task.columns.map((column, index) => {
                     return (
                        <ItemInCard
                           task={task}
                           key={column._id}
                           column={column}
                           value={task.values[index]}
                        />
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ModalCardDetail;
