import React, { useEffect, useState } from 'react';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import DefaultValueTask from '../Group/Table/ValueTask/defaultValueTask';
import './datePicker.scss';
import { useAppDispatch } from '~/config/store';
import { handleSetValueTask } from '~/pages/Board/board.reducer';
import { ITask, IValueOfTask } from '~/shared/model/task';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
interface IPropsDatePicker {
  valueTask: IValueOfTask;
  position: number;
  icon: JSX.Element;
  task: ITask;
}

const DateTimePicker: React.FC<IPropsDatePicker> = ({ valueTask, position, icon, task }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(valueTask.value);
  useEffect(() => {
    setSelectedDate(valueTask.value);
  }, [valueTask.value]);
  const dispatch = useAppDispatch();
  const handleDateChange = (date: Dayjs | null, dateString: string) => {
    setSelectedDate(dateString);
  };

  const handleEmptyValue = () => {
    setSelectedDate(null);
  };
  useEffect(() => {
    const handleUpdateValue = async () => {
      if (selectedDate !== valueTask.value) {
        dispatch(
          handleSetValueTask({
            newValue: selectedDate || '',
            taskId: task._id,
            positionOfTask: task.position,
            positionOfValueTask: position,
          }),
        );
        await axios.patch(`${SERVER_API_URL}v1/api/tasksColumns/${valueTask._id}`, {
          value: selectedDate || '',
          valueId: null,
        });
      }
    };
    handleUpdateValue();
  }, [selectedDate]);
  return (
    <>
      <DatePicker
        className="date__picker"
        style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
          textAlign: 'center',
          opacity: '0',
          zIndex: '10',
        }}
        size={'middle'}
        onChange={handleDateChange}
      />
      <DefaultValueTask icon={icon} handleEmptyValue={handleEmptyValue} text={selectedDate} />
    </>
  );
};

export default DateTimePicker;
