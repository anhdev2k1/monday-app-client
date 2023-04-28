import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "./addPeople.scss"
const AddPeople = () => {
   return (
      <>
         <div className="feature__add-people">
            <div className="feature__add-search">
               <Input
                  placeholder="Search names, roles or teams"
                  className="feature__add-search-input"
               />
               <div className="feature__add-search-btn">
                  <SearchOutlined />
               </div>
            </div>
            <div className="suggest__people">
               <span className="suggest__people-heading">Suggested people</span>
               <div className="suggest__people-item">
                  <div className="suggest__people-item-avt">
                     <span>AN</span>
                  </div>
                  <span>Anh Nguyễn</span>
               </div>
               <div className="suggest__people-item--invite">
                  <UserAddOutlined />
                  <span>Invite a new member by email</span>
               </div>
            </div>
         </div>
      </>
   );
};

export default AddPeople;
