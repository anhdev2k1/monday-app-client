import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { IDataVerifyAcc, setUser, verifyEmail } from '~/shared/reducers/user.reducer';
import ButtonCustom from '../Button/ButtonCustom';
import { StatusType } from '~/shared/model/global';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDisplayOverlay } from '../Overlay/overlay.reducer';
import LoadingHandleEvent from '../LoadingHandleEvent/loadingHandleEvent';

const VerifyEmail = () => {
   const dispatch = useAppDispatch();
   const { state } = useLocation();
   const { email } = state;
   console.log(email);
   
   const navigate = useNavigate();
   const onFinish = async (values: IDataVerifyAcc) => {
      dispatch(
         setDisplayOverlay({
            isDisplay: true,
            children: <LoadingHandleEvent />,
         }),
      );
      const res = await axios.post('https://monday-app-server.vercel.app/v1/api/auth/verify', {
         email,
         code: values.code,
      });
      dispatch(
         setDisplayOverlay({
            isDisplay: false,
            children: <LoadingHandleEvent />,
         }),
      );
      if (res.data.status === 'success') {
         dispatch(setUser(res.data.metadata));
         navigate('/');
      }
   };

   return (
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
         <p style={{ textAlign: 'left', padding: '10px 0' }}>Email</p>
         <Input className="form__container-input" value={email} name="email" disabled={true} />
         <Form.Item
            label="Code"
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
               title="Verify"
            />
         </Form.Item>
      </Form>
   );
};

export default VerifyEmail;
