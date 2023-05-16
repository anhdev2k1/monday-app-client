import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
import './row.scss';
import ResizableBox from '../Resizable';
import {ITask} from "../../shared/model/task"
import { IGroup } from '~/shared/model/group';
interface ITaskProps {
   task: ITask;
}
const Row = ({ task }: ITaskProps) => {
   
   return (
      <ul className="cols__row">
         <li className="col__row__item">
            {/* <label htmlFor="checked"></label> */}
            <input type="checkbox" id="checked" />
         </li>
         <ResizableBox right={false} id="0" key={task._id}>
            <span>{task.name}</span>
         </ResizableBox>
      </ul>
   );
};

export default Row;
