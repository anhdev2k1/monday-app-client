import Tippy from "../Tippy";
import icons from "../../assets/svg/index"
import "./navbarTop.scss"
const NavbarTop = () => {
    return ( 
        <nav className="navbar__top">
            <div className="navbar__top-title">
               <div className="navbar__top-title-burger">
                  <img src={icons.burger} alt="" />
               </div>

               <div className="navbar__top-title-heading">
                  <img src={icons.flower} alt="" className="flower" />
                  <strong>monday</strong>
                  <span>work management</span>
                  <button className="navbar__top-title-btn">See plans</button>
               </div>
            </div>

            <div className="navbar__top-features">
               <Tippy position="bottom" html="Notification">
                  <div className="navbar__top-features-item">
                     <img src={icons.notification} alt="" />
                  </div>
               </Tippy>

               <Tippy position="bottom" html="Inbox">
                  <div className="navbar__top-features-item">
                     <img src={icons.inbox} alt="" />
                  </div>
               </Tippy>
               <Tippy position="bottom" html="Invite Members">
                  <div className="navbar__top-features-item">
                     <img src={icons.invite} alt="" />
                  </div>
               </Tippy>
               <Tippy position="bottom" html="Apps">
                  <div className="navbar__top-features-item">
                     <img src={icons.app} alt="" />
                  </div>
               </Tippy>
               <Tippy position="bottom" html="Search everything">
                  <div className="navbar__top-features-item">
                     <img src={icons.search} alt="" />
                  </div>
               </Tippy>
               <Tippy position="bottom" html="Help">
                  <div className="navbar__top-features-item">
                     <img src={icons.help} alt="" />
                  </div>
               </Tippy>
            </div>
         </nav>
     );
}
 
export default NavbarTop;