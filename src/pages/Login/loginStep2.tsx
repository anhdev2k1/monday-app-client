import { Button, Form, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import './_login.scss';
import { useState } from 'react';
const LoginStep2 = () => {
   const [dataLogin, setDataLogin] = useState<any>({})
   const navigate = useNavigate()
   const handleLogin = async (data: any) => {
      try {
         const res = await axios({
            method: "GET",
            data,
            url: "http://localhost:3001/v1/api/auth/login",
            headers:{
             "Content-Type": "application/json"
            }
          })
          setDataLogin(res.data)
      } catch (error) {
         console.log("error:", error);
      }
   }
   const onFinish = (values: any) => {
      handleLogin(values)
      if(dataLogin.status === "success"){
         navigate("/workspace/10004")
         localStorage.setItem("token",JSON.stringify(dataLogin.accessToken))
      }
   };
   return (
      <div className="form__container">
         <h2 className="form__container-heading">Log in</h2>
         <Form name="basic" onFinish={onFinish} autoComplete="off" layout='vertical'>
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
               <Input placeholder="Example@company.com" className="form__container-input" name="email"/>
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
      </div>
   );
};

export default LoginStep2;
