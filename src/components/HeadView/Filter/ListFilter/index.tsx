import { IFilter, TypeActions } from '~/shared/model';
import ItemFilter, { IItemFilter } from '../ItemFilter';
import styles from './listFilter.module.scss';
interface ListFilterProps {
  name: string;
  items: IItemFilter[];
  filteredItems: IFilter;
  handleFilter: (parent: string, value: string, type: TypeActions) => void;
}

const ListFilter = ({ name, items, filteredItems, handleFilter }: ListFilterProps) => {
  const copiedItems = [...items];
  const hasFilter = filteredItems.size === 0;
  const updatedItems: IItemFilter[] = hasFilter ? copiedItems : [];
  if (!hasFilter) {
    let i = 0;
    while (i < copiedItems.length) {
      if (filteredItems.has(name === 'Group' ? copiedItems[i]._id : copiedItems[i].value)) {
        updatedItems.push(...copiedItems.splice(i, 1));
      } else {
        i++;
      }
    }
    updatedItems.push(...copiedItems);
  }

  return (
    <div className={styles.listFilter}>
      <p className={styles.listFilterName}>
        {name} {filteredItems.size > 0 ? `/ ${filteredItems.size}` : ''}
      </p>
      <div className={styles.listFilterWrapper}>
        {updatedItems.map((item, index) => (
          <ItemFilter
            key={index}
            {...item}
            isActived={filteredItems.has(name === 'Group' ? item._id : item.value)}
            name={name}
            handleFilter={handleFilter}
          />
        ))}
      </div>
    </div>
  );
};

export default ListFilter;
