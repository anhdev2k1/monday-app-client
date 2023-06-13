import ValueTask from '~/components/Group/Table/ValueTask/valueTask';
import { IColumn } from '~/shared/model/column';
import { ITask, IValueOfTask } from '~/shared/model/task';
import './style.scss'
interface ITypeMultipleCardProps {
    column: IColumn;
    index: number;
    value: IValueOfTask;
    task: ITask;
    idBoard?: string;
}
const TypeMultipleCard = ({ column,value,task,idBoard,index }: ITypeMultipleCardProps) => {
  return (
    <>
      <div className="card__features-item">
        <table className="item__value">
          <tbody>
            <tr
              onClick={(e) => {
                e.preventDefault();
              }}
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
