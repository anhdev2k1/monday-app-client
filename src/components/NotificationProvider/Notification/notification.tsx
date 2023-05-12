import { useContext, useEffect, FC } from 'react';
import { NotificationContext } from '../notificationProvider';
import './notification.scss';
export type AlertType = 'success' | 'error' | 'warning' | 'info';
interface NotificationProps {
   type: AlertType;
   message: string;
   autoCloseTime?: number;
}

const Notification: FC<NotificationProps> = ({ type, message, autoCloseTime }) => {
   const { setNotifications } = useContext(NotificationContext);
   useEffect(() => {
      const timer =
         autoCloseTime &&
         setTimeout(() => {
            setNotifications((prevState) =>
               prevState.filter((notification) => notification.message !== message),
            );
         }, autoCloseTime);

      return () => clearTimeout(timer);
   }, []);

   return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
