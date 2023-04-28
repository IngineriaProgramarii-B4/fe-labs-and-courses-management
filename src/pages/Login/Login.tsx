import React from 'react';
import {Button, Form,Input, message, Typography } from "antd";
import "./Login.css";
import api from './api';
import { useNavigate} from 'react-router-dom';
interface LoginFormData{
  myEmail: string;
  myPassword: string;
}

function Login() {
  const navigate = useNavigate();
  const [tokenChecked, setTokenChecked] = React.useState(false);

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    setTokenChecked(true);
    return token !== null && token !== "";
  };

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/Home');
    }
  });
  const login = async (values: LoginFormData) => {
    try {
      const response = await api.post('/api/v1/auth/login', {
        email: values.myEmail,
        password: values.myPassword,
      });
  
      console.log(response.data);
      if (response.data && response.data.accessToken) {
        // Salvează tokenul JWT în local storage sau într-un alt loc adecvat
        localStorage.setItem('token', response.data.accessToken);
        message.success('Login Successful');
        navigate('/Home');
      } else {
        message.error('Login failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error('Login failed: ' + error.message);
      } else {
        message.error('Login failed');
      }
    }
  };
  
  return (
    <div className="appBg">
      {tokenChecked ? (
      <Form className="loginForm" onFinish={values => login(values)}>
        <Typography.Title className='titluForm'>Welcome Back!</Typography.Title>
        <Form.Item rules={[
          {
            required:true,
            type:"email",
          
            message:"Please enter valid email",
          },
        ]}  name={'myEmail'} >
          <Input placeholder='Enter your email'/>
        </Form.Item >

      <Form.Item rules={[
          {
            required:true,
            message:"Please enter your password",
          },
        ]} name={'myPassword'}>
        <Input.Password placeholder='Enter your password'/>
      </Form.Item>
      <div>
        <Button className="LoginButton"  type="primary" htmlType="submit" block>Login</Button>
        <div className='info'>
            <input type="checkbox" />
            <a href='#' className='rememberMe'> Remember me</a>
            <a href='http://localhost:3000/resetPassword' className='forgotPass'>Forgot password?</a>
        </div>
        
        <div className='registerContainer'>
          <p style={{ marginRight: '10px' }}>You don't have an account?</p>
          <Button  className='registerButton' htmlType="submit"><a href='http://localhost:3000/register'>Register</a></Button>
        </div>
      </div>   
      </Form>) : (
        <p>Checking authentication...</p>
      )}
    </div>
  );
}

export default Login;