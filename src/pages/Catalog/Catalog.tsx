import React, { useState, useEffect } from "react";
import axios from "axios";
import AddGrade from "./components/AddGrade";
import UpdateGrade from "./components/UpdateGrade";
import DeleteGrade from "./components/DeleteGrade";
import styles from "./Catalog.module.scss";
import DropdownMenuSubject from "./components/DropdownMenuSubject";
import DropdownMenuSem from "./components/DropdownMenuSem";
import { useParams } from "react-router-dom";
import { useJwt } from "react-jwt";

interface Grade {
  value: number;
  subject: string;
  evaluationDate: string;
  deleted: boolean;
  id: number;
}

function Catalog() {
  const [token, setToken] = useState<string | null>(null);
  const { decodedToken }: any = useJwt(token as string);

  console.log(decodedToken);
  const studentName = decodedToken?.sub;
  const id = useParams();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [userType, setUserType] = useState<string>("student");

  async function fetchGrades() {
    console.log(token);
    try {
      const response = await axios.get(
        "http:///localhost:8082/api/v1/students/2a2dfe47-3502-46c0-a02d-13f2521f23bf",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      const allGrades = [];
      if (data) {
        allGrades.push(...data.grades);
      }
      console.log("all grades:", allGrades);
      setGrades(allGrades);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);

  useEffect(() => {
    fetchGrades();
    setUserType("teacher");
  }, []);

  return (
    <>
      <div className={styles.catalog_wrapper}>
        {decodedToken?.role === "TEACHER" && (
          <AddGrade fetchGrades={fetchGrades} />
        )}
        <h5 className={styles.username}>User: {studentName}</h5>

        {/* <DropdownMenuSubject />
        <DropdownMenuSem /> */}
        <h4>Role: {decodedToken?.role}</h4>
        <table className={styles.catalog_table}>
          <thead>
            <tr>
              <th></th>
              <th>Subject</th>
              <th>Grade</th>
              <th>Date of Evaluation</th>
            </tr>
          </thead>

          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id}>
                <td>
                  {decodedToken?.role === "TEACHER" && (
                    <>
                      <DeleteGrade fetchGrades={fetchGrades} id={grade.id} />
                      <UpdateGrade fetchGrades={fetchGrades} id={grade.id} />
                    </>
                  )}
                </td>
                <td>
                  <span className={styles.subject_value}>{grade.subject}</span>
                </td>
                <td className={styles.grade}>
                  <span className={styles.grade_value}>
                    {" "}
                    <em>{grade.value}</em>
                  </span>
                </td>
                <td>
                  <span className={styles.date_value}>
                    {grade.evaluationDate}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Catalog;
