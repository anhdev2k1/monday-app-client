import { Button, Form, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './_login.scss';
const LoginStep2 = () => {
   const onFinish = (values: any) => {
      console.log('Success:', values);
   };
   return (
      <div className="form__container">
         <h2 className="form__container-heading">Log in</h2>
         <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
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
               className='form__container-item--flex'
            >
               <span className='form__input-heading'>Email</span>
               <Input placeholder="Example@company.com" className="form__container-input" />
            </Form.Item>
            <Form.Item
               name="password"
               rules={[{ required: true, message: 'Please input your Password!' }]}
               className='form__container-item--flex'
            >
                <span className='form__input-heading'>Password</span>
               <Input.Password type="password" className="form__container-input" />
            </Form.Item>
            <Link to="" >
               <span className='link-forgot'>Forgot your password?</span>
            </Link>
            <Form.Item>
               <Button type="primary" htmlType="submit" className="form__container-btn">
                  <span>Log in</span>
                  <ArrowRightOutlined />
               </Button>
            </Form.Item>
            
         </Form>
      </div>
   );
};

export default LoginStep2;
