import React from 'react';
import {Button, Form,Input, message, Typography } from "antd";
import styles from './InsertData.module.scss';
import Upload from './SubmitButton';
import api from '../../services/api';
import { useNavigate} from 'react-router-dom';
  
  const FormInfo = () => {
    
    return (
      <div className={styles.appBg}>
        <Form className={styles.dataForm}>
          <Typography.Title className={styles.titluForm}>Insert Data here</Typography.Title>
          <Form.Item rules={[
            {
              required:true,
              message:"Please enter valid USER_ID",
            },
          ]} >
            <Input placeholder='User ID...'/>
          </Form.Item >
  
        <Form.Item rules={[
            {
              required:true,
              message:"Please enter first name",
            },
          ]} >
          <Input placeholder='First name...'/>
        </Form.Item>
  
        <Form.Item rules={[
            {
              required:true,
              message:"Please enter last name",
            },
          ]}>
          <Input placeholder='Last name...'/>
        </Form.Item>
  
        <Form.Item rules={[
            {
              required:true,
              message:"Please enter role ID",
            },
          ]}>
          <Input placeholder='Role...'/>
        </Form.Item>
        <div>
          <Upload />
        </div>   
        </Form>
      </div>
    );
  };

export default FormInfo;