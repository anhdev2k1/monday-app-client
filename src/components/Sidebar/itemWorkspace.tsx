import { Link, useNavigate } from "react-router-dom";
import { IWorkspace } from "~/shared/model/workSpace";

interface IPropsItemWorkpsace {
   dataWorkspace: IWorkspace;
}
const ItemWorkspace = ({ dataWorkspace }: IPropsItemWorkpsace) => {
   return (
      <Link to={`/workspace/${dataWorkspace._id}`} className="workspace__modal-item">
         <p className="workspace__modal-item-avt">{dataWorkspace.name[0]}</p>
         <p className="workspace__modal-item-name">{dataWorkspace.name}</p>
      </Link>
   );
};

export default ItemWorkspace;
