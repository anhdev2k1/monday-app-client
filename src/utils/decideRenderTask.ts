import { IValueOfTask } from '~/shared/model/task';

interface IDecideRenderTaskParams {
  filterTask: Map<string, number>;
  taskName: string;
  valuesInTask: IValueOfTask[];
  filterValueInColumns: Map<string, number>[];
}

export const decideRenderTask = ({
  filterTask,
  filterValueInColumns,
  taskName,
  valuesInTask,
}: IDecideRenderTaskParams) => {
  let isRender = true;
  if (filterTask.size === 0) isRender &&= true;
  else if (!filterTask.has(taskName)) isRender &&= false;
  else isRender &&= true;
  isRender &&= filterValueInColumns.every((filterValueInColumn, index) => {
    if (filterValueInColumn.size === 0) return true;
    const valueOfTask = valuesInTask[index];
    if (filterValueInColumn.has(valueOfTask.valueId?.value ?? valueOfTask.value)) return true;
    return false;
  });
  return isRender;
};
