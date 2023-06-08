import { useState } from 'react';
import styles from './itemFilter.module.scss';
export interface IItemFilter {
  _id: string;
  value: string;
  counter: number;
  color?: string;
}

type ItemFilterProps = {
  [key in keyof IItemFilter]: IItemFilter[key];
};

const ItemFilter = ({ value, counter, color }: ItemFilterProps) => {
  const [isActive, setIsActive] = useState(false);

  const activeItemHandler = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div
      className={`${styles.itemFilter} ${isActive && styles.active}`}
      onClick={activeItemHandler}
    >
      <span
        className={`${color && styles.itemIsColor} ${styles.itemColor}`}
        style={{
          backgroundColor: color,
        }}
      ></span>
      <p className={styles.itemTitle}>{value || 'Blank'}</p>
      <span className={styles.itemCounter}>{counter}</span>
    </div>
  );
};

export default ItemFilter;
