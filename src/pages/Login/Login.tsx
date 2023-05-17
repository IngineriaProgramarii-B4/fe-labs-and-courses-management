import React from 'react';
import {Button, Form,Input, message, Typography } from "antd";
import styles from './Login.module.scss';
import api from '../../services/api';
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
    if (token !== null && token !== "") {
      setTokenChecked(true);
      return true;
    }
    setTokenChecked(true);
    return false;
  };
  

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/Home');
    } else {
      setTokenChecked(true);
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
    <div className={styles.appBg}>
      {tokenChecked ? (
      <Form className={styles.loginForm} onFinish={values => login(values)}>
        <Typography.Title className={styles.titluForm}>Welcome Back!</Typography.Title>
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
        <Button className={styles.LoginButton}  type="primary" htmlType="submit" block>Login</Button>
        <div className={styles.info}>
  <input type="checkbox" id="rememberMeCheckbox" />
  <label htmlFor="rememberMeCheckbox">
    <a className={styles.rememberMe} href="#">
      Remember me
    </a>
  </label>
  <a className="forgotPass" href="http://localhost:3000/sendMail">
    Forgot password?
  </a>
</div>

        
        <div className={styles.registerContainer}>
          <p style={{ marginRight: '10px' }}>You don't have an account?</p>
          <Button  className={styles.registerButton} htmlType="submit"><a href='http://localhost:3000/register'>Register</a></Button>
        </div>
      </div>   
      </Form>) : (
        <p>Checking authentication...</p>
      )}
    </div>
  );
}

export default Login;