import React from 'react';
import { memo } from 'react';
import type { FC } from 'react';
import {Button, Form,Input, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./Login.css";

function Login() {
  const login=()=>{
    message.success("Login Successful");
  }
  return (
    <div className="appBg">
      <Form className="loginForm" onFinish={login}>
        <Typography.Title className='titluForm'>Welcome Back!</Typography.Title>
        <Form.Item rules={[
          {
            required:true,
            type:"email",
            message:"Please enter valid email",
          },
        ]}  name={'myEmail'}>
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
            <a href='#' className='rememberMe'>Remember me</a>
            <a href='http://localhost:3000/resetPassword' className='forgotPass'>Forgot password?</a>
        </div>
        
        <div className='registerContainer'>
          <p style={{ marginRight: '10px' }}>You don't have an account?</p>
          <Button  className='registerButton' htmlType="submit"><a href='http://localhost:3000/register'>Register</a></Button>
        </div>
      </div>   
      </Form>
    </div>
  );
}

export default Login;