import axios from 'axios';
import { SERVER_API_URL } from './constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = () => {
   console.log('chay vao day');

   const onRequestSuccess = (config: any) => {
      let token: string | null = localStorage.getItem('token');
      let userID: string | null = localStorage.getItem('userId');
      if (typeof token === 'string' && typeof userID === 'string') {
         token = JSON.parse(token);
         userID = JSON.parse(userID);
         config.headers.authorization = `Bearer ${token}`;
         config.headers['x-client-id'] = userID;
         // config.headers['Content-Type'] = 'multipart/form-data';
      }
      return config;
   };
   const onResponseSuccess = (response: any) => {
      return response;
   };
   const onResponseError = (err: any) => {
      console.log(err);

      const status = err.status || (err.response ? err.response.status : 0);
      if (status === 403 || status === 401) {
         //   onUnauthenticated();
      }
      return Promise.reject(err);
   };

   axios.interceptors.request.use(onRequestSuccess);
   axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
