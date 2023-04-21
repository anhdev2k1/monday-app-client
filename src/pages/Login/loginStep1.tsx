import { Button, Form, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./_login.scss";
import {useNavigate} from "react-router-dom"
const LoginStep1 = () => {
  const navigate = useNavigate()

  const onFinish = (values:any) => {
    console.log("Success:", values);
    navigate("/login-step2")
  };
  return (
    <div className="form__container">
      <h2 className="form__container-heading">Log in to your account</h2>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <span className="form__container-desc">
          Enter your work email address
        </span>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            placeholder="Example@company.com"
            className="form__container-input"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="form__container-btn"
          >
            <span>Next</span>
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

export default LoginStep1;
