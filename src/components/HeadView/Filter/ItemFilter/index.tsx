export interface IItemFilter {
  value: string;
  counter: number;
  color?: string;
}

type ItemFilterProps = {
  [key in keyof IItemFilter]: IItemFilter[key];
};

const ItemFilter = ({ value, counter, color }: ItemFilterProps) => {
  return (
    <div>
      <div>
        <div className={color ?? ''}></div>
        <span>{value}</span>
      </div>
      <span>{counter}</span>
    </div>
  );
};

export default ItemFilter;
