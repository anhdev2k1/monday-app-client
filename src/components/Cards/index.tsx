import { useState } from 'react';
import Card from '../Card';
import { IPropDisplayyBoard } from '../MainTable';
import './cards.scss';
import { IGroup } from '~/shared/model/group';
import { ITask } from '~/shared/model/task';
import { IColumn } from '~/shared/model/column';
import { Col, Row } from 'antd';
export interface ITaskCard extends ITask {
   columns: IColumn[];
}

const Cards = ({ currBoard }: IPropDisplayyBoard) => {
   const [listsTask, setListsTask] = useState();

   // currBoard.groups.forEach(group => {
   //    group.tasks.reduce((acc, task) => {
   //       return [...acc]
   //    },[])
   // })
   // const allTasks = currBoard.groups.flatMap((group) => {
   //    // group.tasks.idGroup = group._id
   //    const data = {
   //       ...group.tasks,
   //       group: group,
   //    };
   //    return data;
   //    // const newTask = {
   //    //    ...group.tasks,
   //    //    idGroup: group._id,
   //    // };
   //    // return newTask;
   // });

   const taskArray: ITaskCard[] = currBoard.groups.flatMap((group) =>
      group.tasks.map((task) => ({
         ...task,
         group: group,
         columns: currBoard.columns,
      })),
   );

   console.log(taskArray);

   return (
      <div className="cards">
         <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 24 }}>
            {taskArray.map((task) => {
               return (
                  <Col key={task._id} className="gutter-row" span={6}>
                     <Card task={task} />
                  </Col>
               );
            })}
         </Row>
      </div>
   );
};

export default Cards;
