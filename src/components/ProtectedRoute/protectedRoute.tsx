import { Navigate, Outlet } from 'react-router-dom';
interface IProtectedRouteProps {
   user: any;
   redirectPath: string;
   children: JSX.Element;
}
const ProtectedRoute = ({ user, redirectPath, children }: IProtectedRouteProps) => {
   if (user === 401) {
      return <Navigate to={redirectPath} replace />;
   }
   return children ? children : <Outlet />;
};

export default ProtectedRoute;
