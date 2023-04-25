import React, { useEffect, useMemo } from 'react';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

interface IPropsNotification {
   info: 'success' | 'warning' | 'open' | 'error' | 'info';
   description: string;
   placement: NotificationPlacement;
}
const Notification = ({ info = 'success', description = '', placement }: IPropsNotification) => {
   const [api, contextHolder] = notification.useNotification();

   const openNotification = () => {
      api[info]({
         message: `Notification ${placement}`,
         description,
         placement,
      });
   };
   useEffect(() => {
      openNotification();
   }, []);
   // const contextValue = useMemo(() => ({ name: description }), []);

   return <>{contextHolder}</>;
};

export default Notification;
