import { useContext, useEffect, FC } from 'react';
import { NotificationContext } from '../notificationProvider';
import './notification.scss';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { isNotification } from '~/components/Notification/notification.reducer';
export type AlertType = 'success' | 'error' | 'warning';

const Notification = () => {
   const infoNotification = useAppSelector((state) => state.notificationSlice);
  const dispatch = useAppDispatch()
   useEffect(() => {
      const timerID = setTimeout(()=>{
        dispatch(isNotification({
          isOpen : false,
          autoClose:0,
          message:"",
          type:'error'
        }))
      },infoNotification.autoClose)
      return (() => clearTimeout(timerID))
   },[infoNotification.autoClose])
   return (
      <>
         {infoNotification.isOpen && (
            <div className={`notification ${infoNotification.type}`}>
               {infoNotification.message}
            </div>
         )}
      </>
   );
};

export default Notification;
