import React, { useState, useEffect } from 'react';
import {Button, Form,Input, message, Typography } from "antd";
import styles from './Reset.module.scss';
import  {resetPassword}  from '../Login/api';

interface ResetValues {
  myPassword: string;
  confirmPassword: string;
  token: string;
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
    try {
      console.log(token);
      await resetPassword(newPassword, token);
      message.success("Reset Successful");
    } catch (error) {
      message.error("Reset Failed");
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
            {
              pattern: /^(?=.*[!@#$%^&*()])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              message: 'The password must contain at least 8 characters, at least one digit, at least one special symbol and at least one capital letter',
            }
          ]} name={'myPassword'}>
          <Input.Password placeholder='Enter your new password'/>
        </Form.Item>

        <Form.Item rules={[
            {
              required:true,
              message:"Please confirm your new password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]} name={'confirmPassword'}>

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

