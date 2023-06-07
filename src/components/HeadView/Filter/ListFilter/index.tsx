import ItemFilter, { IItemFilter } from '../ItemFilter';

interface ListFilterProps {
  name: string;
  items: IItemFilter[];
}

const ListFilter = ({ name, items }: ListFilterProps) => {
  return (
    <div>
      <span>{name}</span>
      {items.map((item, index) => (
        <ItemFilter key={index} {...item} />
      ))}
    </div>
  );
};

export default ListFilter;
