import './_registerStep2.scss';
import { Row, Col } from 'antd';
import { Button, Form, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ImgRegisterStep2 from '~/assets/images/register/img-register-step2.jpg';
import LogoMonday from '~/assets/images/logo-monday.jpg';
const RegisterStep2 = () => {
   const navigate = useNavigate();
   const onFinish = (values: any) => {
      console.log(values);

      if (values) {
         navigate('/register-step2');
      }
   };
   return (
      <Row>
         <Col span={14}>
            <div className="form__register-step-2">
               <Form
                  layout="vertical"
                  className="form__container-step-2"
                  name="basic"
                  onFinish={onFinish}
                  autoComplete="off"
               >
                  <img className="img-logo" src={LogoMonday} alt="img-logo" />
                  <h1 className="form__container-step-2-title">Set up your account</h1>
                  <Form.Item
                     name="name"
                     label="Full name"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your name!',
                        },
                     ]}
                  >
                     <Input
                        type="text"
                        placeholder="e.g. Jane Doe"
                        className="form__container-step-2-input"
                     />
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
                        placeholder="input your password"
                        className="form__container-step-2-input"
                     />
                  </Form.Item>
                  <Form.Item className="btn__submit">
                     <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        className="form__container-step-2-btn"
                     >
                        <span>Continute</span>
                        <ArrowRightOutlined />
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </Col>
         <Col span={10}>
            <div className="img__wrapper">
               <div
                  className="img__banner"
                  style={{
                     backgroundImage: `url(${ImgRegisterStep2})`,
                  }}
               ></div>
            </div>
         </Col>
      </Row>
   );
};

export default RegisterStep2;
