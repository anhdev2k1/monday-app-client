import Card from '../Card';
import './cards.scss';
import HeadView from '../HeadView';
import { IGroup } from '~/shared/model/group';
import { ITask } from '~/shared/model/task';
import { IColumn } from '~/shared/model/column';
import { Col, Row } from 'antd';
import { useAppSelector } from '~/config/store';
import { decideRenderTask } from '~/utils/decideRenderTask';
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

  const tasks: (ITaskCard | undefined)[] = groups!.flatMap((group) =>
    group.tasks.map((task) => {
      let isChoose = true;
      if (filterGroup.size === 0) isChoose &&= true;
      else if (!filterGroup.has(group._id)) isChoose &&= false;
      else isChoose &&= true;
      const isRender = decideRenderTask({
        filterTask,
        filterValueInColumns,
        taskName: task.name,
        valuesInTask: task.values,
      });
      if (isChoose && isRender) {
        return {
          ...task,
          position: task.position,
          group: group,
          columns: columns!,
        };
      }
    }),
  );

  return (
    <div className="cards">
      <HeadView />
      <Row gutter={[14, { xs: 8, sm: 12, md: 12, lg: 14 }]}>
        {tasks.map(
          (task) =>
            task && (
              <Col key={task._id} span={6} lg={6} md={8} xs={12}>
                <Card task={task} idBoard={idBoard} />
              </Col>
            ),
        )}
      </Row>
    </div>
  );
};

export default Cards;
