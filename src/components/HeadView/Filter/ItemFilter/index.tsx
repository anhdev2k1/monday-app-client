import styles from './itemFilter.module.scss';
export interface IItemFilter {
  value: string;
  counter: number;
  color?: string;
}

type ItemFilterProps = {
  [key in keyof IItemFilter]: IItemFilter[key];
};

const ItemFilter = ({ value, counter, color = '#ccc' }: ItemFilterProps) => {
  return (
    <div className={styles.itemFilter}>
      <span
        className={`${color && styles.itemIsColor} ${styles.itemColor}`}
        style={{
          backgroundColor: color,
        }}
      ></span>
      <p className={styles.itemTitle}>{value}</p>
      <span className={styles.itemCounter}>{counter}</span>
    </div>
  );
};

export default ItemFilter;
