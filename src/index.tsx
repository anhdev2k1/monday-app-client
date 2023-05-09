import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { store } from './services/redux/store'
import { Provider } from 'react-redux';
import config from './config';
import setupAxiosInterceptors from './config/axios-interceptor';
import {
   NotificationContext,
   NotificationProvider,
} from './components/NotificationProvider/notificationProvider';

const store = config.getStore();
setupAxiosInterceptors();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <Provider store={store}>
      <NotificationProvider>
         <App />
      </NotificationProvider>
   </Provider>,
);
