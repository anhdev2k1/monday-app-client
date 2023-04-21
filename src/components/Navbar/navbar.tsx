import { Link } from "react-router-dom";
import "./_navbar.scss"
const Navbar = () => {
    return ( 
        <nav className="navbar">
        <div className="navbar__brand">
                <div className="navbar__brand-title">
                    <span>Good afternoon, Anh!</span>
                    <p>Quickly access your recent boards, Inbox and workspaces</p>
                </div>
                <div className="navbar__brand-bg">
                    <img src="https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg" alt=""/>
                </div>
                <div className="navbar__brand-feature">
                   <Link to="/login" className="navbar__brand-feature--btn">
                        Login
                   </Link>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;