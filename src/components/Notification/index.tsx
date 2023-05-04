import React, { useEffect } from 'react';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

export enum Info {
   Success = 'success',
   Warning = 'warning',
   Open = 'open',
   Error = 'error',
   Info = 'info',
}

interface IPropsNotification {
   info: Info;
   description: string;
   placement: NotificationPlacement;
}
const Notification = ({ info = Info.Success, description = '', placement }: IPropsNotification) => {
   const [api, contextHolder] = notification.useNotification();

   const openNotification = () => {
      api[info]({
         message: info,
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
