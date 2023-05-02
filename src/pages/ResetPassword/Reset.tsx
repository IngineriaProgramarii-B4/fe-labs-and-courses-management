import React from 'react';
import {Button, Form,Input, message, Typography } from "antd";
import styles from './Reset.module.scss';

function Reset() {
  const reset=()=>{
    message.success("Reset Successful");
  }
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