import React from 'react';
import Tippy from '~/components/Tippy';
import { useAppSelector } from '~/config/store';
import ListFilter from './ListFilter';
import { IItemFilter } from './ItemFilter';

interface FilterProps {
  ref: React.RefObject<HTMLDivElement>;
}

interface FilterColumn {
  name: string;
  position: number;
  defaultValues: Map<string, IItemFilter>;
}

const Filter = React.forwardRef(({ ref }: FilterProps) => {
  const currBoard = useAppSelector((state) => state.boardSlice.currBoard.data)!;
  const tasksMap = new Map<string, IItemFilter>();

  const transformedColumns: FilterColumn[] = currBoard.columns.map((column) => {
    const defaultValues = new Map<string, IItemFilter>();
    column.defaultValues.forEach((value) => {
      defaultValues.set(value.value, {
        value: value.value,
        color: value.color,
        counter: 0,
      });
    });

    return {
      name: column.name,
      position: column.position,
      defaultValues,
    };
  });

  const transformedGroups: IItemFilter[] = currBoard.groups.map((group) => {
    group.tasks.forEach((task) => {
      if (tasksMap.has(task.name)) {
        const foundTask = tasksMap.get(task.name)!;
        foundTask.counter++;
        tasksMap.set(foundTask.value, foundTask);
      } else {
        const newTask: IItemFilter = {
          value: task.name,
          color: undefined,
          counter: 1,
        };
        tasksMap.set(newTask.value, newTask);
      }

      transformedColumns.forEach((column) => {
        const valueOfTask = task.values[column.position];
        const value = valueOfTask.valueId?.value ?? valueOfTask.value;
        if (column.defaultValues.has(value)) {
          const foundDefaultValue = column.defaultValues.get(value)!;
          foundDefaultValue.counter++;
          column.defaultValues.set(value, foundDefaultValue);
        } else {
          const newDefaultValue: IItemFilter = {
            value: value,
            color: valueOfTask.valueId?.color,
            counter: 1,
          };
          column.defaultValues.set(newDefaultValue.value, newDefaultValue);
        }
      });
    });

    console.log({ tasksMap });
    console.log({ transformedColumns });

    return {
      _id: group._id,
      value: group.name,
      counter: group.tasks.length,
      color: undefined,
    };
  });

  return (
    <Tippy position="top" html={<p>Filter by anything</p>}>
      <div className="filter" ref={ref}>
        <div className="filter__menu">
          <div>
            <div>
              <h4>Quick filters</h4>
              <span>
                Showing {'all'} of {} tasks
              </span>
              {/* <FontAwesomeIcon icon={} /> */}
            </div>
            <span>Clear All</span>
          </div>

          <h3>All columns</h3>
          <div className="filter__container">
            <ListFilter name="Group" items={transformedGroups} />

            <ListFilter name="Name" items={[...tasksMap.values()]} />

            {transformedColumns.map((column, index) => (
              <ListFilter
                key={index}
                name={column.name}
                items={[...column.defaultValues.values()]}
              />
            ))}
          </div>
        </div>
      </div>
    </Tippy>
  );
});

export default Filter;
