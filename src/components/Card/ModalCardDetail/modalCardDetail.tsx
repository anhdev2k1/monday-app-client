import './modalCardDetail.scss';
import Tippy from '~/components/Tippy';
import ItemInCard from '../ItemInCard/itemInCard';
import images from '~/assets/svg';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { handleEditTaskFromGroup } from '~/pages/Board/board.reducer';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { SizeType, StatusType } from '~/shared/model/global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { ITaskCard } from '~/components/Cards';

interface ModalCardDetailProps {
  idBoard?: string;
  taskInGroup?: ITaskCard;
}

const ModalCardDetail = ({ idBoard, taskInGroup }: ModalCardDetailProps) => {
  const { iconDesTask } = images;
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.boardSlice.taskToDisplay)!;
  
  const handleRenameTask = async (
    e: React.FocusEvent<HTMLInputElement, Element>,
    taskID: string,
  ) => {
    await axios.patch(`${SERVER_API_URL}v1/api/task/${taskID}`, {
      name: e.target.value,
    });
    dispatch(
      handleEditTaskFromGroup({
        groupId: task.group._id,
        taskId: task._id,
        key: 'name',
        value: e.target.value,
      }),
    );
  };
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
            <input
              onBlur={(e) => {
                if (e.target.value && e.target.value !== task.name) {
                  handleRenameTask(e, task._id);
                }
              }}
              className="modal__card__title--input"
              defaultValue={task.name}
              type="text"
            />
            {/* <Tippy position="top" html={<p>Start Conversation</p>}>
              <button className="modal__card__icon--plus">
                <img src={iconDesTask} alt="modal__card__icon--plus" />
              </button>
            </Tippy> */}
          </div>
          <div className="card__title-features">
            {/* <div className="item__in__card">
              <ButtonCustom
                sizeType={SizeType.Medium}
                className="item__card--btn"
                statusType={StatusType.Nonbehavior}
                title="Group"
                leftIcon={<FontAwesomeIcon icon={faCircle} />}
              />
              <table className="item__value">
                <tbody>
                  <tr
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <td className="item__value--group">{taskInGroup?.group.name}</td>
                  </tr>
                </tbody>
              </table>
            </div> */}

            {task.columns.map((column, index) => {
              return (
                <ItemInCard
                  task={task}
                  index={index}
                  key={column._id}
                  column={column}
                  value={task.values[index]}
                  idBoard={idBoard}
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
