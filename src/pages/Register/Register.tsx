import { Button, Form, Input, Select, Typography, message } from 'antd';
import styles from './RegisterPage.module.scss';
import React from 'react';
import api from "../Login/api";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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

      if (response.status === 200) {
       //message.success("Registration Successful");
       navigate("/login");
      } else {
      //  message.error("Registration failed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error("Registration failed: " + error.message);
      } else {
        //message.error("Registration failed");
      }
      if (axios.isAxiosError(error) && error.response) {
        //console.error("Server response:", error.response);
      }
    }
  };
  const [form] = Form.useForm();

  return (
    <div>
      <div className={styles.topBar}></div>
      <Form className={styles.Formular}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={register}
        initialValues={{ residence: [''], prefix: '40' }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Typography.Title className={styles.TitluForm}>Welcome Back!</Typography.Title>
        <Form.Item className={`${styles.PullUp} ${styles.formItem}`}
          name="ID"
          label="ID"
          rules={[{ required: true, message: 'Please input your ID!', whitespace: true }]}
        >
          <Input placeholder='Please input your ID' />
        </Form.Item>
        <Form.Item className={`${styles.PullUp} ${styles.formItem}`}
          name="email"
          label="E-mail"
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

        <Form.Item className={`${styles.PullUp} ${styles.formItem}`}
          name="password"
          label="Password"
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

        <Form.Item className={`${styles.PullUp} ${styles.formItem}`}
          name="confirm"
          label="Confirm password"
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

        <Form.Item className={styles.PullUp}
          {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className={styles.btnRegister} >
            Register
          </Button>

          <Typography.Text >
            <div className={styles.signInOption}>
               Already have an account? <a href="/login">Sign in</a>
            </div>
           
          </Typography.Text>
          
        </Form.Item>

      </Form>
    </div>


  );
};

export default Register;