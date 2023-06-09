import React, { useState, useEffect } from 'react';
import {Button, Form,Input, message, Typography } from "antd";
import styles from './Reset.module.scss';
import  {resetPassword}  from '../../services/api';
import { useNavigate } from 'react-router-dom';  // importa useNavigate
import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';
interface ResetValues {
  myPassword: string;
  confirmPassword: string;
  token: string;
}

function Reset() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();  // initializeaza useNavigate
  const [firstAttempt, setFirstAttempt] = useState(true);
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
      await resetPassword(newPassword, token); // aici apelezi functia resetPassword cu noua parola si tokenul
      toast.success("Reset Successful");
      navigate('/login');  
    } catch (error) {
      console.error(error);
      toast.error("Reset Failed");
    }
  };

  return (
    <div className={styles.appBg}>
      <Form className={styles.resetForm} onFinish={reset}>
        <Typography.Title className={styles.titluForm}>Reset your password!</Typography.Title>

        <Form.Item  rules={[
            {
              required:true,
              message:"Please enter your new password",
            },
            {
              pattern: /^(?=.*[!@#$%^&*()])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              message: 'The password does not match the pattern required!',
            }
          ]} name={'myPassword'}>
          <Input.Password placeholder='Enter your new password'/>
        </Form.Item>

        <Form.Item rules={[
            {
              required:true,
              message:"Please confirm your new password",
            },
            // Adauga validator pentru confirmarea parolei
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('myPassword') === value) {
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
