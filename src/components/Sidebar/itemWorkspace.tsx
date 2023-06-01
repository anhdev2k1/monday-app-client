
interface IPropsItemWorkpsace {
   name: string;
}
const ItemWorkspace = ({ name }: IPropsItemWorkpsace) => {
   return (
      <div className="workspace__modal-item">
         <p className="workspace__modal-item-avt">{name[0]}</p>
         <p className="workspace__modal-item-name">{name}</p>
      </div>
   );
};

export default ItemWorkspace;
