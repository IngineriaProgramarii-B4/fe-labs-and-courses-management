import React from "react";
import { useState, useEffect } from "react";
import "./Catalog.css";
import axios from "axios";
import AddGrade from "./components/AddGrade";
import UpdateGrade from "./components/UpdateGrade";
import DeleteGrade from "./components/DeleteGrade";

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

  const [grades, setGrades] = useState<Grade[]>([]);
  async function fetchGrades() {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/catalog/students/8"
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
      console.error(error);
    }
  }

  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    <>
      <div className="catalog-wrapper">
        <AddGrade fetchGrades={fetchGrades} />
        <h5 className="username">{studentName}'s Grades</h5>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Subject</th>
              <th>Grade</th>
              <th>Date of Evaluation</th>
            </tr>
          </thead>

          <tbody>
            {grades.map((grade, index) => (
              <tr key={index}>
                <td>
                  <DeleteGrade fetchGrades={fetchGrades} id={grade.id} />
                  <UpdateGrade fetchGrades={fetchGrades} id={grade.id} />
                </td>
                <td>
                  <span className="subject-value">{grade.subject.name}</span>
                </td>
                <td className="grade">
                  <span className="grade-value">
                    {" "}
                    <em>{grade.value}</em>
                  </span>
                </td>
                <td>
                  <span className="date-value">{grade.evaluationDate}</span>
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
