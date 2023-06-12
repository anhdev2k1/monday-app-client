import styles from './itemFilter.module.scss';
import { TypeActions } from '~/shared/model';
export interface IItemFilter {
  _id: string;
  value: string;
  parent: string;
  color?: string;
}

interface ItemFilterProps extends IItemFilter {
  name: string;
  isActived: boolean;
  handleFilter: (parent: string, value: string, type: TypeActions) => void;
}

const ItemFilter = ({
  _id,
  name,
  isActived,
  value,
  parent,
  color,
  handleFilter,
}: ItemFilterProps) => {
  const activeItemHandler = () => {
    handleFilter(
      parent,
      name === 'Group' ? _id : value,
      !isActived ? TypeActions.ADD : TypeActions.REMOVE,
    );
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
    </div>
  );
};

export default ItemFilter;
