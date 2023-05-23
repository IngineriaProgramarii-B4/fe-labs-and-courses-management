import React, { useState, useEffect } from "react";
import axios from "axios";
import AddGrade from "./components/AddGrade";
import UpdateGrade from "./components/UpdateGrade";
import DeleteGrade from "./components/DeleteGrade";
import styles from "./Catalog.module.scss";
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
  const studentName = decodedToken?.sub;
  const { id } = useParams();
  const [grades, setGrades] = useState<Grade[]>([]);

  async function fetchGrades() {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/students/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      const allGrades = [];
      if (data) {
        allGrades.push(...data.grades);
      }
      setGrades(allGrades);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (token) {
    }
  }, []);

  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    <>
      <div className={styles.catalog_wrapper}>
        {decodedToken?.role === "TEACHER" && (
          <AddGrade fetchGrades={fetchGrades} />
        )}
        {/* <h5 className={styles.username}>User: {studentName}</h5>

        <h4>Role: {decodedToken?.role}</h4> */}
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
