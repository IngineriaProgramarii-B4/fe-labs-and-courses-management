import React from 'react';
import { Button, Form, Input, message, Typography } from "antd";
import styles from './SendMail.module.scss';
import { Link } from 'react-router-dom';

function SendMail() {
  const reset = () => {
    message.success("Reset Successful");
  }
  return (
    <div className={styles.appBg}>
      <Form className={styles.resetForm} onFinish={reset}>
        <Typography.Title className={styles.titluForm}>Please insert your email</Typography.Title>
        <Form.Item
          name='myEmail'
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input placeholder='Enter your email' />
        </Form.Item>
        <div>
          
            <Button className={styles.resetButton} type="primary" htmlType="submit" block>
              <Link to='/resetPassword'>Reset Password</Link>
            </Button>
          
        </div>
      </Form>
    </div>
  );
}

export default SendMail;
