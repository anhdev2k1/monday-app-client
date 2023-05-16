import icons from '../../assets/svg/index';
import './menuTask.scss';
interface IMenuTaskProps {
   tasks: {
      _id: string;
   }[];
   task: string;
   handleDeleteTask: (taskID: string) => void;
   setIsChecked: React.Dispatch<
      React.SetStateAction<
         {
            _id: string;
         }[]
      >
   >;
}

const MenuTask = ({ tasks, task, handleDeleteTask, setIsChecked }: IMenuTaskProps) => {
   return (
      <div
         className="menu__wrapper"
         style={
            tasks.length > 0
               ? { transform: 'translateY(-40px)' }
               : { transform: 'translateY(300px)' }
         }
      >
         <div className="menu__num">
            <span>{tasks.length}</span>
         </div>
         <span className="menu__heading">Task Selected</span>
         <div className="menu__list-feature">
            <div className="menu__feature-item">
               <img src={icons.duplicate} alt="" />
               <span>Duplicate</span>
            </div>
            <div className="menu__feature-item">
               <img src={icons.export} alt="" />
               <span>Export</span>
            </div>
            <div className="menu__feature-item">
               <img src={icons.archive} alt="" />
               <span>Archive</span>
            </div>
            <div
               className="menu__feature-item"
               onClick={() => {
                  handleDeleteTask(task);
                  setIsChecked([]);
               }}
            >
               <img src={icons.deleteTask} alt="" />
               <span>Delete</span>
            </div>
            <div className="menu__feature-item">
               <img src={icons.convert} alt="" />
               <span>Convert</span>
            </div>
            <div className="menu__feature-item">
               <img src={icons.moveTo} alt="" />
               <span>Move to</span>
            </div>
         </div>
         <div className="menu__close">
            <img src={icons.close} alt="" />
         </div>
      </div>
   );
};

export default MenuTask;
