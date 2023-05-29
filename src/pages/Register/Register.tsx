import { Button, Form, Input, Select, Typography, message } from 'antd';
import styles from './RegisterPage.module.scss';
import React from 'react';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';
interface RegisterFormData {
  ID: string;
  email: string;
  password: string;
  confirm: string;
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const register = async (values: RegisterFormData) => {
    try {
      const response = await api.post("/api/v1/auth/register", {
        userId: values.ID,
        email: values.email,
        password: values.password,
      });

      if (response.status === 201) {
        toast.success("Registration Successful");

        navigate("/login");
      } else {
        toast.error("Registration failed");
      }
    } catch (error: unknown) {
      let errorMessage = "Registration failed";
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server response:", error.response);
        if (error.response.data) {
          errorMessage += ": " + error.response.data;
        }
      } else if (error instanceof Error) {
        errorMessage += ": " + error.message;
      }
      toast.error(errorMessage);
    }

  };
  const [form] = Form.useForm();

  return (
    <div className={styles.appBg}>
      <div className={styles.topBar}></div>
      <Form className={styles.registerForm}
        // {...formItemLayout}
        form={form}
        name="register"
        onFinish={register}
        initialValues={{ residence: [''], prefix: '40' }}
        // style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Typography.Title className={styles.titluForm}>Welcome Back!</Typography.Title>
        <Form.Item
          name="ID"
          rules={[{ required: true, message: 'Please input your ID!', whitespace: true }]}
        >
          <Input placeholder='Please input your ID' />
        </Form.Item>

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
        >
          <Input placeholder='Please input your E-mail!' />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              pattern: /^(?=.*[!@#$%^&*()])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              message: 'The password must contain at least 8 characters, at least one digit, at least one special symbol and at least one capital letter!',
            }

          ]}
          hasFeedback
        >
          <Input.Password placeholder='Please input your password!' />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder='Please confirm your password!' />
        </Form.Item>
        <div>
          <Button className={styles.registerButton} type="primary" htmlType="submit" block>Register</Button>
          <div className={styles.info}>

            <a href="http://localhost:3000/sendMail">
              <p style={{ marginLeft: '70px', marginTop: '10px', fontSize: '16px' }}> Forgot password?</p>
            </a>
          </div>

          <div className={styles.registerContainer}>
            <p>Already have an acoount?</p>
            <Button className={styles.registerButton} htmlType="submit"><a href='http://localhost:3000/login'>Log in</a></Button>
          </div>
        </div>
      </Form>
    </div >
  );
};

export default Register;
