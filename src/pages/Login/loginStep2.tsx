import { Button, Form, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './_login.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from '~/services/redux/features/user';
import { Info } from '~/components/Notification';
import { setToken } from '~/services/redux/features/updateToken';
import { IDataLogin, IInfoNotifi } from '../Register';
import { IResponseUser } from '~/shared/model/authentication';
import { IResponseData } from '~/shared/model/global';
import Notification from '~/components/Notification';

const LoginStep2 = () => {
   const baseUrl = process.env.REACT_APP_SERVER_API_URL;
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [infoNotifi, setInfoNotifi] = useState<IInfoNotifi>({
      isOpen: false,
      info: Info.Open,
      description: '',
      placement: 'topRight',
   });

   const onFinish = async (values: IDataLogin) => {
      if (values) {
         const requestUrl = `${baseUrl}v1/api/auth/signin`;
         const response = await axios.post<IResponseData<IResponseUser>>(requestUrl, values);
         const { accessToken } = response.data.metadata;
         if (accessToken) {
            setInfoNotifi({
               isOpen: true,
               info: Info.Success,
               description: response.data.message,
               placement: 'topRight',
            });
            dispatch(setToken(accessToken));
            dispatch(
               currentUser({
                  _id: response.data.metadata.user._id,
                  name: response.data.metadata.user.name,
               }),
            );

            localStorage.setItem('token', JSON.stringify(accessToken));
            setTimeout(() => {
               navigate('/');
            }, 1000);
         } else {
            setInfoNotifi({
               isOpen: true,
               info: Info.Error,
               description: response.data.message,
               placement: 'topRight',
            });
         }
      }
   };

   return (
      <div className="form__container">
         <h2 className="form__container-heading">Log in</h2>
         <Form name="basic" onFinish={onFinish} autoComplete="off" layout="vertical">
            <Form.Item
               name="email"
               label="Email"
               rules={[
                  {
                     type: 'email',
                     message: 'The input is not valid E-mail!',
                  },
                  {
                     required: true,
                     message: 'Please input your E-mail!',
                  },
               ]}
               className="form__container-item--flex"
            >
               <Input
                  placeholder="Example@company.com"
                  className="form__container-input"
                  name="email"
               />
            </Form.Item>
            <Form.Item
               name="password"
               rules={[{ required: true, message: 'Please input your Password!' }]}
               className="form__container-item--flex"
               label="Password"
            >
               <Input.Password
                  type="password"
                  className="form__container-input"
                  placeholder="Password"
                  name="password"
               />
            </Form.Item>
            <Link to="">
               <span className="link-forgot">Forgot your password?</span>
            </Link>
            <Form.Item>
               <Button type="primary" htmlType="submit" className="form__container-btn">
                  <span>Log in</span>
                  <ArrowRightOutlined />
               </Button>
            </Form.Item>

            <div className="suggest__signup-wrapper">
               <div className="suggest__signup-component">
                  <span>Don't have an account yet?</span>
                  <Link to="/register" className="suggest__signup-link">
                     <span>Sign up</span>
                  </Link>
               </div>
               <div className="suggest__signup-support">
                  <span>Can't log in?</span>
                  <Link to="" className="suggest__signup-link">
                     <span>Visit our help center</span>
                  </Link>
               </div>
            </div>
         </Form>
         {infoNotifi.isOpen && (
            <Notification
               info={infoNotifi.info}
               description={infoNotifi.description}
               placement={infoNotifi.placement}
            />
         )}
      </div>
   );
};

export default LoginStep2;
