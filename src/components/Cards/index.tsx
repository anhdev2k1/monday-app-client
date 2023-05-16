import { useState } from 'react';
import Card from '../Card';
import { IPropDisplayyBoard } from '../MainTable';
import './cards.scss';
import { IGroup } from '~/shared/model/group';
interface ITaskCard {
   task: {
      _id: string;
      name: string;
      position: number;
   };
}
const Cards = ({ currBoard }: IPropDisplayyBoard) => {
   const [listsTask, setListsTask] = useState();

   // currBoard.groups.forEach(group => {
   //    group.tasks.reduce((acc, task) => {
   //       return [...acc]
   //    },[])
   // })
   const allTasks = currBoard.groups.flatMap((group) => {
      // group.tasks.idGroup = group._id
      const newTask = {
         ...group.tasks,
         idGroup: group._id,
      };
      return newTask;
   });
   console.log(allTasks);

   return (
      <>
         <div className="cards" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
         </div>
      </>
   );
};

export default Cards;
