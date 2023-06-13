import './card.scss';
import { ITaskCard } from '../Cards';
import ItemInCard from './ItemInCard/itemInCard';
import Tippy from '../Tippy';
import { useAppDispatch } from '~/config/store';
import { setDisplayOverlay } from '../Overlay/overlay.reducer';
import ModalCardDetail from './ModalCardDetail/modalCardDetail';
import { setTaskToDisplay } from '~/pages/Board/board.reducer';
import ValueTask from '../Group/Table/ValueTask/valueTask';
import TypeMultipleCard from '../Cards/TypeMultipleCard/typeMultipleCard';
interface IPropsCard {
  task: ITaskCard;
  idBoard?: string;
}
const Card = ({ task, idBoard }: IPropsCard) => {
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
        children: <ModalCardDetail taskInGroup={task} idBoard={idBoard} />,
      }),
    );
  };

  return (
    <div onClick={handleShowModalCartDetail} className="card__item">
      <div className="card__item-title">
        <div className="card__title-header">
          <span className="card__title-header--heading">{task.name}</span>
        </div>
        <div className="card__title-features">
          {task.columns.map((column, index) => {
            if (column.belongType.name === 'Status') {
              return (
                <ItemInCard
                  task={task}
                  index={index}
                  key={column._id}
                  column={column}
                  value={task.values[index]}
                  idBoard={idBoard}
                />

                // <TypeMultipleCard column = {column} task={task} index={index} key={column._id} value={task.values[index]} idBoard={idBoard}/>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
