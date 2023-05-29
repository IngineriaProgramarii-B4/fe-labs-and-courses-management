import React, { useState, ChangeEvent } from "react";
import { Form, Input, Typography, message } from "antd";
import styles from './InsertData.module.scss';
import Papa from "papaparse";
import axios from "axios";
import Navbar from "../../components/Layout/Navbar";
interface User {
  registrationNumber: string;
  firstname: string;
  lastname: string;
  role: string;
}

const FormInfo = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<User[]>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result: { data: User[] }) => {
          setData(result.data as User[]);
        },
        header: true,
      });
    }
  };

  const handleUploadSubmit = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(data); 

      axios
        .post("http://localhost:8082/api/v1/secretary/list", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          message.success('Datele au fost încărcate cu succes.');
        })
        .catch((error) => {
          message.error('A apărut o eroare la încărcarea datelor.');
        });
    } else {
      message.error('Niciun token găsit.');
    }
  };

  const onFinish = (values: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:8082/api/v1/secretary", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          form.resetFields(); // Resetează câmpurile după trimiterea datelor
          message.success('Formularul a fost trimis cu succes.');
        })
        .catch((error) => {
          message.error('A apărut o eroare la trimiterea formularului.');
        });
    } else {
      message.error('Niciun token găsit.');
    }
  };

  return (
  <>
    <div className={styles.appBg}>
       
      <Form className={styles.dataForm} form={form} onFinish={onFinish}>
      <Typography.Title className={styles.titluForm}>Insert Data here</Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter valid registration number",
            },
          ]}
          name="registrationNumber"
        >
          <Input placeholder="Registration Number..." />
        </Form.Item>
  
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter first name",},
            ]}
            name="firstname"
          >
            <Input placeholder="First name..." />
          </Form.Item>
    
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter last name",
              },
            ]}
            name="lastname"
          >
            <Input placeholder="Last name..." />
          </Form.Item>
    
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter role",
              },
            ]}
            name="role"
          >
            <Input placeholder="Role..." />
          </Form.Item>
    
          <div>
            <button
              style={{ width: "50%", transform: "translate(50%, 0)", borderRadius: "4px" }}
              className={styles.submitFormButton}
              type="submit"
            >
              Submit
            </button>
          </div>
    
          <div>
            <input
              style={{ display: "inline", width: "80%",marginTop:"12px" }}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
            />
            <button
    style={{ width: "20%", paddingBottom: "2px", borderRadius: "4px" }}
    className={styles.submitFormButton}
    onClick={(event) => {
        event.preventDefault();
        handleUploadSubmit();
    }}
>
    Upload
</button>

          </div>
        </Form>
      </div></>
    );
  };
  
  export default FormInfo;
  
           
