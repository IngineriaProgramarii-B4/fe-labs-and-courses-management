import { CascaderProps, Typography,message } from 'antd';
import "./RegisterPage.css"
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, } from 'antd';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import api from "../Login/api";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { router } from '../../services/router';
interface RegisterFormData {
  ID: string;
  email: string;
  password: string;
  confirm: string;
}

const { Option } = Select;
const { Title } = Typography;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
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
      message.success("Registration Successful");
      // Redirecționează utilizatorul la pagina de autentificare pentru a se conecta
      navigate("/login");
    } else {
      message.error("Registration failed");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      message.error("Registration failed: " + error.message);
    } else {
      message.error("Registration failed");
    }
    if (axios.isAxiosError(error) && error.response) {
      console.error("Server response:", error.response);
  }
}
};
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };



  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <div>
      <div className="top-bar"></div>
      <Form className='Formular'
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={register}
        initialValues={{ residence: [''], prefix: '40' }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Typography.Title className='TitluForm'>Welcome Back!</Typography.Title>
        <Form.Item className='PullUp'
          name="ID"
          label="ID"
          rules={[{ required: true, message: 'Please input your ID!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className='PullUp'
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
          <Input />
        </Form.Item>

        <Form.Item className='PullUp'
          name="Parola"
          label="Parola"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },

          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className='PullUp'
          name="Confirma"
          label="Confirma"
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
          <Input.Password />
        </Form.Item>

       

        <Form.Item className='PullUp'
          {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit"  >
            Register
          </Button>
          <Typography.Text style={{ marginTop: '16px' }}>
            Already have an account? <a href="/login">Sign in</a>
          </Typography.Text>
        </Form.Item>

      </Form>
    </div>


  );
};

export default Register;