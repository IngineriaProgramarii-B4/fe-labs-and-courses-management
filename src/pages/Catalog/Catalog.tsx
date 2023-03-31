import React from "react";
import { useState, useEffect } from "react";
import "./Catalog.css";

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
}

interface Student {
  idStud: number;
  nrMatricol: number;
  email: string;
  name: string;
  grades: Grade[];
  id: number;
}

function Catalog() {
  const studentName = "User";

  const [grades, setGrades] = useState<Grade[]>([]);

  useEffect(() => {
    async function fetchGrades() {
      const response = await fetch("http://localhost:8081/api/v1/catalog");
      const data = await response.json();
      const allGrades = data.entries.flatMap(
        (student: Student) => student.grades
      );
      setGrades(allGrades);
    }

    fetchGrades();
  }, []);

  return (
    <>
      <div className="catalog-wrapper">
        <h5 className="username">{studentName}'s Grades</h5>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
              <th>Date of Evaluation</th>
            </tr>
          </thead>

          <tbody>
            {grades.map((grade, index) => (
              <tr key={index}>
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
