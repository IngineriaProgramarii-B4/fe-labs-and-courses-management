import React, { useState, useEffect } from 'react';
import {Button, Form,Input, message, Typography } from "antd";
import styles from './Reset.module.scss';

interface ResetValues {
  myPassword: string;
}

function Reset() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);

  const reset = async (values: ResetValues) => {
    const newPassword = values.myPassword;
    const response = await fetch('/api/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    if (response.ok) {
      message.success('Reset Successful');
    } else {
      message.error('Reset Failed');
    }
  };

  return (
    <div className={styles.appBg}>
      <Form className={styles.resetForm} onFinish={reset}>
        <Typography.Title className={styles.titluForm}>Reset your password!</Typography.Title>

        <Form.Item rules={[
            {
              required:true,
              message:"Please enter your new password",
            },
          ]} name={'myPassword'}>
          <Input.Password placeholder='Enter your new password'/>
        </Form.Item>

        <Form.Item rules={[
            {
              required:true,
              message:"Please confirm your new password",
            },
          ]} name={'myPassword'}>

          <Input.Password placeholder='Confirm your new password'/>
        </Form.Item>
        <div>
          <Button className={styles.resetButton}  type="primary" htmlType="submit" block>Reset Password</Button>
        </div>   
      </Form>
    </div>
  );
}

export default Reset;
