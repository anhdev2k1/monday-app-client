import Card from '../Card';
import './cards.scss';
import HeadView from '../HeadView';
import { IGroup } from '~/shared/model/group';
import { ITask } from '~/shared/model/task';
import { IColumn } from '~/shared/model/column';
import { Col, Row } from 'antd';
import { useAppSelector } from '~/config/store';
import { decideRenderTask } from '~/utils/decideRender';
export interface ITaskCard extends ITask {
  columns: IColumn[];
  group: IGroup;
}

interface CardsProps {
  idBoard?: string;
}

const Cards = ({ idBoard }: CardsProps) => {
  const groups = useAppSelector((state) => state.boardSlice.currBoard.data?.groups);
  const columns = useAppSelector((state) => state.boardSlice.currBoard.data?.columns);
  const filterGroup = useAppSelector((state) => state.boardSlice.currBoard.filterGroup);
  const filterTask = useAppSelector((state) => state.boardSlice.currBoard.filterTask);
  const filterValueInColumns = useAppSelector(
    (state) => state.boardSlice.currBoard.filterValueInColumns,
  );
  const valueSearch = useAppSelector((state) => state.boardSlice.searchValue);

  const tasks: ITaskCard[] = [];
  groups!.forEach((group) =>
    group.tasks.map((task) => {
      let isChoose = filterGroup.size === 0 || filterGroup.has(group._id);
      const isRender = decideRenderTask({
        filterTask,
        filterValueInColumns,
        taskName: task.name,
        valueSearch,
        valuesInTask: task.values,
      });
      if (isChoose && isRender) {
        tasks.push({
          ...task,
          position: task.position,
          group: group,
          columns: columns!,
        });
      }
    }),
  );
  console.log({ tasks });

  return (
    <div className="cards">
      <HeadView />
      <div className='cards__container'>
        {tasks.length !== 0 ? (
          tasks.map((task) => (
            <Card task={task} idBoard={idBoard} />
          ))
        ) : (
          <div className="search__empty" style={{ textAlign: 'center', padding: '20px 0' }}>
            <img
              src="https://cdn.monday.com/images/search_empty_state.svg"
              alt=""
              style={{ width: '300px' }}
            />
            <h3>No result found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
