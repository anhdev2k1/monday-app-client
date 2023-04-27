import { EditOutlined } from "@ant-design/icons";
import "./changeStatus.scss"
const ChangeStatus = () => {
   return (
      <>
         <div className="title__feature-status--hover">
            <div className="title__feature-status--item">
               <span>Working on it</span>
            </div>
            <div className="title__feature-status--item">
               <span>Stuck</span>
            </div>
            <div className="title__feature-status--item">
               <span>Done</span>
            </div>
            <div className="title__feature-status--item">
               <span></span>
            </div>
            <div className="title__feature-status--edit">
               <EditOutlined />
               <span>Edit Labels</span>
            </div>
         </div>
      </>
   );
};

export default ChangeStatus;
