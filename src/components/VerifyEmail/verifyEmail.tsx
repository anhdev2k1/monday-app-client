import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { IDataVerifyAcc, verifyEmail } from '~/shared/reducers/user.reducer';
import ButtonCustom from '../Button/ButtonCustom';
import { StatusType } from '~/shared/model/global';
import { Navigate, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
   const dispatch = useAppDispatch();
   const currentUser = useAppSelector((state) => state.userSlice.user.data);
   const navigate = useNavigate();
   const onFinish = async (values: IDataVerifyAcc) => {
      if (values.email && values.code && values.email) {
         dispatch(verifyEmail(values));
      }
   };
   console.log('currentUser222', currentUser);
   // useEffect(() => {
   //    if (currentUser && Object.keys(currentUser).length > 0) {
   //       console.log('currentUser');

   //       navigate('/');
   //    }
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [currentUser]);

   return (
      <>
         <Form
            layout="vertical"
            className="form__container"
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
         >
            <h1 className="form__container-title">Welcome to monday.com</h1>
            <p className="form__container-des">
               The code has been sent to your email - Please check and enter in the box below.
            </p>
            <Form.Item
               label="email"
               name="email"
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
            >
               <Input placeholder="Example@company.com" className="form__container-input" />
            </Form.Item>

            <Form.Item
               label="code"
               name="code"
               rules={[
                  {
                     required: true,
                     message: 'Please input your code!',
                  },
                  { pattern: /^\d{6}$/, message: 'Please enter a valid 6-digit code' },
               ]}
            >
               <Input placeholder="Ex : 123456" className="form__container-input" />
            </Form.Item>
            <Form.Item>
               <ButtonCustom
                  statusType={StatusType.Primary}
                  type="submit"
                  className="form__container-btn"
                  title="Submit"
               />
            </Form.Item>
         </Form>
      </>
   );
};

export default VerifyEmail;
