import React from 'react';
import { memo } from 'react';
import type { FC } from 'react';
import {Button, Form,Input, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./Reset.css";

function Reset() {
  const reset=()=>{
    message.success("Reset Successful");
  }
  return (
    <div className="appBg">
      <Form className="resetForm" onFinish={reset}>
        <Typography.Title className='titluForm'>Reset your password!</Typography.Title>
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
            message:"Please enter your new password",
          },
        ]} name={'myPassword'}>
        <Input.Password placeholder='Enter your password'/>
      </Form.Item>

      <Form.Item rules={[
          {
            required:true,
            message:"Please confirm your new password",
          },
        ]} name={'myPassword'}>

        <Input.Password placeholder='Enter your password'/>
      </Form.Item>
      <div>
        <Button className="LoginButton"  type="primary" htmlType="submit" block>Reset Password</Button>
      </div>   
      </Form>
    </div>
  );
}

export default Reset;