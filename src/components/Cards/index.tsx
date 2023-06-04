import Card from '../Card';
import './cards.scss';
import { IGroup } from '~/shared/model/group';
import { ITask } from '~/shared/model/task';
import { IColumn } from '~/shared/model/column';
import { Col, Row } from 'antd';
import { useAppSelector } from '~/config/store';
import { useParams } from 'react-router-dom';
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

   const taskArray: ITaskCard[] = groups!.flatMap((group) =>
      group.tasks.map((task) => ({
         ...task,
         position: task.position,
         group: group,
         columns: columns!,
      })),
   );

   return (
      <div className="cards">
         <Row gutter={[14, { xs: 8, sm: 12, md: 12, lg: 14 }]}>
            {taskArray.map((task) => {
               return (
                  <Col key={task._id} span={6} lg={6} md={8} xs={12}>
                     <Card task={task} idBoard={idBoard} />
                  </Col>
               );
            })}
         </Row>
      </div>
   );
};

export default Cards;
