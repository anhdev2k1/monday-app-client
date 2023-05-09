import { createContext, useState, FC } from 'react';

interface NotificationContextType {
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
}

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  setNotifications: () => {}
});

interface INotificationProviderProps {
  children: JSX.Element;
}

export const NotificationProvider: FC<INotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};