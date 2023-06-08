import React from 'react';
import { enableMapSet } from 'immer';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { store } from './services/redux/store'
import { Provider } from 'react-redux';
import config from './config';
import setupAxiosInterceptors from './config/axios-interceptor';
import Overlay from './components/Overlay';
import Notification from './components/NotificationProvider/Notification/notification';

const store = config.getStore();
setupAxiosInterceptors();
enableMapSet();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
    <Notification />
    <Overlay />
  </Provider>,
);
