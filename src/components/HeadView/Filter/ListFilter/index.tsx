import ItemFilter, { IItemFilter } from '../ItemFilter';
import styles from './listFilter.module.scss';
interface ListFilterProps {
  name: string;
  items: IItemFilter[];
}

const ListFilter = ({ name, items }: ListFilterProps) => {
  return (
    <div className={styles.listFilter}>
      <p className={styles.listFilterName}>{name}</p>
      <div className={styles.listFilterWrapper}>
        {items.map((item, index) => (
          <ItemFilter key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ListFilter;
