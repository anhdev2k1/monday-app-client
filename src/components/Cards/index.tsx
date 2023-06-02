import { useState } from 'react';
import Card from '../Card';
import { IPropMainTable } from '../MainTable';
import './cards.scss';
import { IGroup } from '~/shared/model/group';
import { ITask } from '~/shared/model/task';
import { IColumn } from '~/shared/model/column';
import { Col, Row } from 'antd';
export interface ITaskCard extends ITask {
   columns: IColumn[];
   group: IGroup;
}

const Cards = ({ currBoard }: IPropMainTable) => {
   const taskArray: ITaskCard[] = currBoard.groups.flatMap((group) =>
      group.tasks.map((task) => ({
         ...task,
         position: task.position,
         group: group,
         columns: currBoard.columns,
      })),
   );

   return (
      <div className="cards">
         <Row gutter={[14, { xs: 8, sm: 12, md: 12, lg: 14 }]}>
            {taskArray.map((task) => {
               return (
                  <Col key={task._id} span={6} lg={6} md={8} xs={12}>
                     <Card task={task} />
                  </Col>
               );
            })}
         </Row>
      </div>
   );
};

export default Cards;
