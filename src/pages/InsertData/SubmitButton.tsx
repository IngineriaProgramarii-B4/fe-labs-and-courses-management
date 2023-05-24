  import React, { useState, ChangeEvent } from "react";
import styles from './InsertData.module.scss';
import Papa from "papaparse";
import axios from "axios";

interface User {
  registrationNumber: string;
  firstname: string;
  lastname: string;
  role: string;
}

const Upload = () => {
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

  const handleSubmit = () => {
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
          // Handle the response here
          console.log(response);
        })
        .catch((error) => {
          // Handle the error here
          console.error(error);
        });
    } else {
      // Handle the case when there is no token
      console.error("No token found");
    }
  };

  return (
    <div>
      <button style={{ width: '50%', transform: 'translate(50%, 0)',borderRadius:'4px'}}className={styles.submitFormButton} onClick={handleSubmit}>Submit</button> 
      <div style={{marginTop: '30px'}}>
        <input style={{display: 'inline', width: '80%'}} type="file" accept=".csv" onChange={handleFileUpload} />
        <button style={{width: '20%',paddingBottom:'2px',borderRadius:'4px'}} className={styles.submitFormButton} onClick={handleSubmit}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;