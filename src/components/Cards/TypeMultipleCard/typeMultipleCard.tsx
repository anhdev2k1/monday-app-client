import ValueTask from '~/components/Group/Table/ValueTask/valueTask';
import { IColumn } from '~/shared/model/column';
import { ITask, IValueOfTask } from '~/shared/model/task';
import './style.scss';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { SizeType, StatusType } from '~/shared/model/global';
interface ITypeMultipleCardProps {
  column: IColumn;
  index: number;
  value: IValueOfTask;
  task: ITask;
  idBoard?: string;
}
const TypeMultipleCard = ({ column, value, task, idBoard, index }: ITypeMultipleCardProps) => {
  
  return (
    <>
      <div className="card__features-item">
        <div className="card__item-group">
        <FontAwesomeIcon icon={faLayerGroup} />
          <span className='card__item-group--name'>Group</span>
          <p>{task.group.name}</p>
        </div>
        <table className="item__value">
          <tbody className="table__data">
            <tr
              onClick={(e) => {
                e.preventDefault();
              }}
              className="table__data-task" key={task._id}
            >
              <ValueTask
                task={task}
                index={index}
                valueOfTask={value}
                column={column}
                idBoard={idBoard}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TypeMultipleCard;
