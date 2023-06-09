import { TypeActions } from '~/shared/model';
import ItemFilter, { IItemFilter } from '../ItemFilter';
import styles from './listFilter.module.scss';
interface ListFilterProps {
  name: string;
  items: IItemFilter[];
  filteredItems: Map<string, number>;
  handleFilter: (value: string, type: TypeActions) => void;
}

const ListFilter = ({ name, items, filteredItems, handleFilter }: ListFilterProps) => {
  return (
    <div className={styles.listFilter}>
      <p className={styles.listFilterName}>
        {name} {filteredItems.size > 0 ? `/ ${filteredItems.size}` : ''}
      </p>
      <div className={styles.listFilterWrapper}>
        {items.map((item, index) => (
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
