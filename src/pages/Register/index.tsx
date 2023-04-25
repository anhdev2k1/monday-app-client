import './_register.scss';
import { Row, Col } from 'antd';
import { Button, Form, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ImgBanner from '~/assets/images/register/welcome-to-monday.jpg';
import axios from 'axios';
interface IDataRegister {
   email: string;
   name: string;
   password: string;
}
const Register = () => {
   const baseUrl = process.env.REACT_APP_SERVER_API_URL;

   const onFinish = (values: IDataRegister) => {
      if (values) {
         const requestUrl = `${baseUrl}/v1/api/auth/signup`;
         const response = axios.post(requestUrl, values);
         console.log(response);
      }
   };
   return (
      <Row>
         <Col span={14}>
            <div className="form__register">
               <Form
                  layout="vertical"
                  className="form__container"
                  name="basic"
                  onFinish={onFinish}
                  autoComplete="off"
               >
                  <h1 className="form__container-title">Welcome to monday.com</h1>
                  <p className="form__container-des">
                     Get started - it's free. No credit card needed.
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
                     label="Full name"
                     name="name"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your name!',
                        },
                     ]}
                  >
                     <Input placeholder="Example@company.com" className="form__container-input" />
                  </Form.Item>

                  <Form.Item
                     name="password"
                     label="Password"
                     rules={[
                        {
                           required: true,
                           message: 'The input is not valid password!',
                        },
                     ]}
                  >
                     <Input
                        type="password"
                        placeholder="Example@company.com"
                        className="form__container-input"
                     />
                  </Form.Item>
                  <Form.Item>
                     <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        className="form__container-btn"
                     >
                        <span>Register</span>
                        <ArrowRightOutlined />
                     </Button>
                  </Form.Item>
                  <div className="suggest__signup-wrapper">
                     <div className="suggest__signup-support">
                        <span>Already have an account?</span>
                        <Link to="/login" className="suggest__signup-link">
                           <span>login</span>
                        </Link>
                     </div>
                  </div>
               </Form>
            </div>
         </Col>
         <Col span={10}>
            <div className="img__wrapper">
               <div
                  className="img__banner"
                  style={{
                     backgroundImage: `url(${ImgBanner})`,
                  }}
               ></div>
            </div>
         </Col>
      </Row>
   );
};

export default Register;
