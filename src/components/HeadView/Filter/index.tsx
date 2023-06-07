import React from 'react';
import Tippy from '~/components/Tippy';
import { useAppSelector } from '~/config/store';
import ListFilter from './ListFilter';
import { IItemFilter } from './ItemFilter';
import styles from './filter.module.scss';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { StatusType } from '~/shared/model/global';
interface FilterProps {
  ref: React.RefObject<HTMLDivElement>;
}

const Filter = React.forwardRef(({ ref }: FilterProps) => {
  const currBoard = useAppSelector((state) => state.boardSlice.currBoard.data)!;
  const tasksMap = new Map<string, IItemFilter>();

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
    });

    console.log({ tasksMap });

    return {
      _id: group._id,
      value: group.name,
      counter: group.tasks.length,
      color: undefined,
    };
  });

  return (
    <Tippy position="top" html={<p>Filter by anything</p>}>
      <div className={styles.filter} ref={ref}>
        <div className={styles.filterMenu}>
          <div className={styles.filterMenuHeader}>
            <h4 className={styles.menuHeaderTitle}>Quick filters</h4>
            <span className={styles.menuHeaderInfo}>
              Showing {'all'} of {} tasks
            </span>
            <ButtonCustom
              title="Clear all"
              statusType={false ? StatusType.Transparent : StatusType.Disabled}
            />
          </div>

          <div className={styles.menuContainerWrapper}>
            <h3 className={styles.menuContainerTitle}>All columns</h3>

            <div className={styles.menuContainer}>
              <ListFilter name="Group" items={transformedGroups} />

              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />
              <ListFilter name="Name" items={[...tasksMap.values()]} />

              {/* {currBoard.columns.map((column, index) => (
                <ListFilter key={index} name={column.name} items={column.defaultValues} />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </Tippy>
  );
});

export default Filter;
