import React, { useState, useEffect } from "react";
import axios from "axios";
import AddGrade from "./components/AddGrade";
import UpdateGrade from "./components/UpdateGrade";
import DeleteGrade from "./components/DeleteGrade";
import styles from "./Catalog.module.scss";
import DropdownMenuSubject from "./components/DropdownMenuSubject";
import DropdownMenuSem from "./components/DropdownMenuSem";
import { useParams } from "react-router-dom";

interface Grade {
  value: number;
  subject: {
    name: string;
    teachers: {
      idProf: number;
      email: string;
      name: string;
      teachedSubjects: any;
      id: number;
    }[];
  };
  evaluationDate: string;
  id: number;
}

function Catalog() {
  const studentName = "User";
  const id = useParams()

  const [grades, setGrades] = useState<Grade[]>([]);
  const [userType, setUserType] = useState<string>("student");

  async function fetchGrades() {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/v1/students/${id}`
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
    fetchGrades();
    setUserType("teacher");
  }, []);

  return (
    <>
      <div className={styles.catalog_wrapper}>
        {userType === "teacher" && <AddGrade fetchGrades={fetchGrades} />}
        <h5 className={styles.username}>{studentName}'s Grades</h5>
        <DropdownMenuSubject />
        <DropdownMenuSem />
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
                  {userType === "teacher" && (
                    <>
                      <DeleteGrade fetchGrades={fetchGrades} id={grade.id} />
                      <UpdateGrade fetchGrades={fetchGrades} id={grade.id} />
                    </>
                  )}
                </td>
                <td>
                  <span className={styles.subject_value}>
                    {grade.subject.name}
                  </span>
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
