import React from 'react';
import images from '~/assets/svg';
import DateTimePicker from '~/components/DatePicker/datePicker';
import ValueIsText from '~/components/ValueIsText/valueIsText';
import { ITask, IValueOfTask } from '~/shared/model/task';

interface ITypeValue {
  nameOfType?: string;
  valueTask: IValueOfTask;
  position: number;
  task: ITask;
}

type IDataRenderTask = {
  [key: string]: JSX.Element;
};

const ValueCustomizedByColumnType = ({ nameOfType, valueTask, position, task }: ITypeValue) => {
  const { iconText, iconDatePicker } = images;

  const dataRenderTask: IDataRenderTask = {
    Date: (
      <DateTimePicker
        task={task}
        position={position}
        valueTask={valueTask}
        icon={<img className="icon__value--task" src={iconDatePicker} alt="icon__value" />}
      />
    ),
    Text: (
      <ValueIsText
        type="text"
        task={task}
        position={position}
        valueTask={valueTask}
        icon={<img className="icon__value--task" src={iconText} alt="icon__value" />}
      />
    ),
    Number: (
      <ValueIsText
        type="number"
        task={task}
        position={position}
        valueTask={valueTask}
        icon={<img className="icon__value--task" src={iconText} alt="icon__value" />}
      />
    ),
  };

  return (nameOfType && dataRenderTask[nameOfType]) || null;
};

export default ValueCustomizedByColumnType;
