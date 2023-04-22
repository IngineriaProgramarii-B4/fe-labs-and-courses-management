import React from "react";
import { useState, useEffect } from "react";
import "./Catalog.css";
import axios from "axios";

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

interface Student {
  idStud: number;
  nrMatricol: number;
  email: string;
  name: string;
  grades: Grade[];
  id: number;
}

interface GradesData {
  value: number;
  subject: {
    name: string;
    teachers: {
      idProf: number;
      email: string;
      name: string;
      teachedSubjects: string[];
      id: number;
    }[];
  };
  evaluationDate: string;
  id: number;
}
function Catalog() {
  const studentName = "User";

  const [grades, setGrades] = useState<Grade[]>([]);

  const [subjectName, setSubjectName] = useState<string>("");
  const [gradeValue, setGradeValue] = useState<number>(0);
  const [evDateValue, setEvDateValue] = useState<string>("");

  const handleSubjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubjectName(event.target.value);
    console.log(subjectName);
  };

  const handleGradeValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGradeValue(Number(event.target.value));
  };

  const handleEvDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEvDateValue(event.target.value);
  };

  async function fetchGrades() {
    try {
      const response = await axios.get("http://localhost:8081/api/v1/catalog");
      const data = response.data;
      console.log(data);
      const allGrades = [];
      for (let i = 0; i < data.entries.length; i++) {
        allGrades.push(...data.entries[i].grades);
      }
      setGrades(allGrades);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddGrade = () => {
    if (subjectName && gradeValue) {
      const gradesData: GradesData = {
        value: gradeValue,
        subject: {
          name: subjectName,
          teachers: [
            {
              idProf: 0,
              email: "string",
              name: "string",
              teachedSubjects: ["string"],
              id: 0,
            },
          ],
        },
        evaluationDate: evDateValue,
        id: 0,
      };

      axios
        .post(
          "http://localhost:8081/api/v1/catalog/students/1/grades",
          gradesData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setSubjectName("");
          setGradeValue(0);

          fetchGrades();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDeleteGrade = (id: number) => {
    fetch(`http://localhost:8081/api/v1/catalog/students/1/grades/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchGrades();
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateGrade = (
    id: number,
    updatedGradeValue: number,
    updatedEvDateValue: string
  ) => {
    axios
      .put(
        `http://localhost:8081/api/v1/catalog/students/1/grades/${id}?value=${updatedGradeValue}&evaluationDate=${updatedEvDateValue}`,
        {
          value: updatedGradeValue,
          evaluationDate: updatedEvDateValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        fetchGrades();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    <>
      <div className="catalog-wrapper">
        <div>
          <form className="add-grade-wrapper">
            <div className="form-field">
              <label htmlFor="subject-name">Subject</label>
              <input
                type="text"
                value={subjectName}
                onChange={handleSubjectNameChange}
                name="subject-name"
                className="add-grade-input"
                placeholder="Subject"
              />
            </div>
            <div className="form-field">
              <label htmlFor="grade-value">Grade</label>
              <input
                type="number"
                value={gradeValue}
                onChange={handleGradeValueChange}
                name="grade-value"
                className="add-grade-input"
                placeholder="Grade"
              />
            </div>
            <div className="form-field">
              <label htmlFor="date-value">Evaluation Date</label>
              <input
                type="text"
                value={evDateValue}
                onChange={handleEvDateChange}
                name="date-value"
                className="add-grade-input"
                placeholder="Evaluation date"
              />
            </div>
          </form>
        </div>
        <div className="add-button-wrapper">
          <button onClick={handleAddGrade} className="add-button">
            Add Grade
          </button>
        </div>
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
            {grades.map((grade) => (
              <tr key={grade.id}>
                <td>
                  <img
                    src={require("../../img/trash.png")}
                    alt="cf"
                    className="trash-img"
                    onClick={() => handleDeleteGrade(grade.id)}
                  />
                  <img
                    src={require("../../img/edit.png")}
                    alt="bntu"
                    className="edit-img"
                    onClick={() => {
                      console.log("gradeValue: ", gradeValue);
                      console.log("evDateValue: ", evDateValue);
                      handleUpdateGrade(grade.id, gradeValue, evDateValue);
                    }}
                  />
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
