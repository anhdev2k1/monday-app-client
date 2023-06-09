import styles from './itemFilter.module.scss';
import { TypeActions } from '~/shared/model';
export interface IItemFilter {
  _id: string;
  value: string;
  counter: number;
  color?: string;
}

interface ItemFilterProps extends IItemFilter {
  name: string;
  isActived: boolean;
  handleFilter: (value: string, type: TypeActions) => void;
}

const ItemFilter = ({
  _id,
  name,
  isActived,
  value,
  counter,
  color,
  handleFilter,
}: ItemFilterProps) => {
  const activeItemHandler = () => {
    handleFilter(name === 'Group' ? _id : value, !isActived ? TypeActions.ADD : TypeActions.REMOVE);
  };

  return (
    <div
      className={`${styles.itemFilter} ${isActived && styles.active}`}
      onClick={activeItemHandler}
    >
      <span
        className={`${color && styles.itemIsColor} ${styles.itemColor}`}
        style={{
          backgroundColor: color,
        }}
      ></span>
      <p className={styles.itemTitle}>{value || 'Blank'}</p>
      <span className={styles.itemCounter}>{counter || ''}</span>
    </div>
  );
};

export default ItemFilter;
