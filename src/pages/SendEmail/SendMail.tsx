import React from 'react';
import { Button, Form, Input, message, Typography } from "antd";
import styles from './SendMail.module.scss';
import { Link } from 'react-router-dom';
import { sendResetEmail } from '../../services/api';
import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';
function SendMail() {
  const reset = async (values: { myEmail: string }) => {
    try {
      toast.success("We confirm that the pasword reset email has been sent to your registered address!")
      await sendResetEmail(values.myEmail);
      
    } catch (error) {
      toast.error("Error sending reset email");
    }
  };


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
  Reset Password
</Button>


          
        </div>
      </Form>
    </div>
  );
}

export default SendMail;
