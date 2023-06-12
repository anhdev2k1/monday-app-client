import { IFilter } from '~/shared/model';
import { IGroup } from '~/shared/model/group';
import { ITask, IValueOfTask } from '~/shared/model/task';

interface IDecideRenderGroupParams {
  filterGroup: IFilter;
  filterTask: IFilter;
  filterValueInColumns: IFilter[];
  group: IGroup;
}

export const decideRenderGroup = ({
  filterGroup,
  filterTask,
  filterValueInColumns,
  group,
}: IDecideRenderGroupParams): {
  isRender: boolean;
  updatedTasks: ITask[];
} => {
  const updatedTasks: ITask[] = [];
  let isRender = filterGroup.size === 0 || filterGroup.has(group._id);
  if (!isRender) return { isRender, updatedTasks };
  for (const task of group.tasks) {
    const isRenderTask = decideRenderTask({
      filterTask,
      filterValueInColumns,
      taskName: task.name,
      valuesInTask: task.values,
    });
    if (isRenderTask) updatedTasks.push(task);
  }

  return { isRender: updatedTasks.length !== 0, updatedTasks };
};

interface IDecideRenderTaskParams {
  filterTask: IFilter;
  filterValueInColumns: IFilter[];
  taskName: string;
  valuesInTask: IValueOfTask[];
}

export const decideRenderTask = ({
  filterTask,
  filterValueInColumns,
  taskName,
  valuesInTask,
}: IDecideRenderTaskParams) => {
  let isRender = filterTask.size === 0 || filterTask.has(taskName);
  isRender &&= filterValueInColumns.every((filterValueInColumn, index) => {
    if (filterValueInColumn.size === 0) return true;
    const valueOfTask = valuesInTask[index];
    if (filterValueInColumn.has(valueOfTask.valueId?.value ?? valueOfTask.value)) return true;
    return false;
  });
  return isRender;
};
