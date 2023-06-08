import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { IItemFilter } from './ItemFilter';
import styles from './filter.module.scss';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { StatusType } from '~/shared/model/global';
import ListFilter from './ListFilter';
import { handleAddFilterGroup } from '~/pages/Board/board.reducer';

interface FilterColumn {
  name: string;
  position: number;
  defaultValues: Map<string, IItemFilter>;
}

const Filter = React.forwardRef<HTMLDivElement>((props, ref) => {
  const currBoard = useAppSelector((state) => state.boardSlice.currBoard.data)!;
  const filterGroup = useAppSelector((state) => state.boardSlice.currBoard.filterGroup);
  const filterTask = useAppSelector((state) => state.boardSlice.currBoard.filterTask);
  const filterValueInColumns = useAppSelector(
    (state) => state.boardSlice.currBoard.filterValueInColumns,
  );

  const [transformedGroups, setTransformedGroups] = useState<IItemFilter[]>([]);
  const [transformedColumns, setTransformedColumns] = useState<FilterColumn[]>([]);
  const [transformedTasks, setTransformedTasks] = useState<Map<string, IItemFilter>>(new Map());
  const dispatch = useAppDispatch();

  const [taskCounter, setTaskCounter] = useState(0);

  useEffect(() => {
    let taskCounterTemp = 0;
    const transformedTasksTemp = new Map<string, IItemFilter>();
    const transformedColumnsTemp = currBoard.columns.map((column) => {
      const defaultValues = new Map<string, IItemFilter>(
        column.defaultValues.map((value) => {
          const { value: defaultValue, color } = value;
          const key = defaultValue + color;
          return [key, { _id: value._id, value: defaultValue, color, counter: 0 }];
        }),
      );

      return {
        name: column.name,
        position: column.position,
        defaultValues,
      };
    });

    const transformedGroupsTemp = currBoard.groups.map((group) => {
      group.tasks.forEach((task) => {
        taskCounterTemp++;
        if (transformedTasksTemp.has(task.name)) {
          const foundTask = transformedTasksTemp.get(task.name)!;
          foundTask.counter++;
          transformedTasksTemp.set(foundTask.value, foundTask);
        } else {
          const newTask: IItemFilter = {
            _id: task._id,
            value: task.name,
            color: undefined,
            counter: 1,
          };
          transformedTasksTemp.set(newTask.value, newTask);
        }

        transformedColumnsTemp.forEach((column) => {
          const valueOfTask = task.values[column.position];
          const value = valueOfTask.valueId?.value ?? valueOfTask.value;
          const color = valueOfTask.valueId?.color ?? '';
          if (column.defaultValues.has(value + color)) {
            const foundDefaultValue = column.defaultValues.get(value + color)!;
            foundDefaultValue.counter++;
            column.defaultValues.set(value + color, foundDefaultValue);
          } else {
            const newDefaultValue: IItemFilter = {
              _id: valueOfTask._id,
              value: value,
              color: color,
              counter: 1,
            };
            column.defaultValues.set(
              newDefaultValue.value + newDefaultValue.color,
              newDefaultValue,
            );
          }
        });
      });

      return {
        _id: group._id,
        value: group.name,
        counter: group.tasks.length,
        color: undefined,
      };
    });
    setTransformedColumns(transformedColumnsTemp);
    setTransformedGroups(transformedGroupsTemp);
    setTransformedTasks(transformedTasksTemp);
    setTaskCounter(taskCounterTemp);
  }, []);

  const addFilterGroupHandler = (id?: string, name?: string) => {
    if (id) {
      dispatch(
        handleAddFilterGroup({
          groupId: id,
        }),
      );
    }
  };

  const addFilterTaskHandler = (id?: string, name?: string) => {};

  const addFilterColumnHandler = (id?: string, name?: string) => {};

  return (
    <div className={styles.filter} ref={ref} onClick={(e) => e.stopPropagation()}>
      <div className={styles.filterMenu}>
        <div className={styles.filterMenuHeader}>
          <h4 className={styles.menuHeaderTitle}>Quick filters</h4>
          <span className={styles.menuHeaderInfo}>
            Showing {'all'} of {taskCounter} tasks
          </span>
          <ButtonCustom
            title="Clear all"
            statusType={false ? StatusType.Transparent : StatusType.Disabled}
          />
        </div>

        <div className={styles.menuContainerWrapper}>
          <h3 className={styles.menuContainerTitle}>All columns</h3>

          <div className={styles.menuContainer}>
            <ListFilter
              name="Group"
              items={transformedGroups}
              addFilterHandler={addFilterGroupHandler}
            />

            <ListFilter
              name="Task"
              items={[...transformedTasks.values()]}
              addFilterHandler={addFilterTaskHandler}
            />

            {transformedColumns.map((column, index) => {
              return (
                <ListFilter
                  key={index}
                  name={column.name}
                  items={[...column.defaultValues.values()]}
                  addFilterHandler={addFilterColumnHandler}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Filter;
