import { Link, useNavigate } from 'react-router-dom';
import './_navbar.scss';
import { useAppDispatch, useAppSelector } from '~/config/store';
import axios from 'axios';
import { message } from 'antd';
import { resetUser } from '~/shared/reducers/user.reducer';
const Navbar = () => {
  const currentUser = useAppSelector((state) => state.userSlice.user.data);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const handleLogout = async () => {
    messageApi.loading('Đợi 1 tý nhé!...');
    const userId = localStorage.getItem('userId');
    localStorage.removeItem('userId');
    dispatch(resetUser());
    await axios.post(
      'http://localhost:3001/v1/api/auth/logout',
      {},
      {
        headers: {
          'client-id': userId,
        },
      },
    );
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };
  return (
    <nav className="navbar">
      {contextHolder}
      <div className="navbar__brand">
        <div className="navbar__brand-title">
          <span>
            How are you today? <strong>{currentUser?.user.userProfile.name}!</strong>
          </span>
          <p>Quickly access your recent boards, Inbox and workspaces</p>
        </div>
        <div className="navbar__brand-bg">
          <img
            src="https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg"
            alt=""
          />
        </div>
        {currentUser?.user ? (
          <div className="navbar__brand-feature" onClick={handleLogout}>
             <Link to="" className="navbar__brand-feature--btn">
                Logout
             </Link>
          </div>
          
        ) : (
           <div className="navbar__brand-feature">
             <Link to="/login" className="navbar__brand-feature--btn">
               Login
             </Link>
           </div>
          
        )}
      </div>
    </nav>
  );
};

export default Navbar;
