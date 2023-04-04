import { CascaderProps, Typography } from 'antd';
import "./RegisterPage.css"
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, } from 'antd';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';

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

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="40">+40</Option>
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

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
        onFinish={onFinish}
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
          name="password"
          label="Password"
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
          name="confirm"
          label="Confirm Password"
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
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
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

export default App;