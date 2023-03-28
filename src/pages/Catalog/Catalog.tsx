import React from "react";
import "./Catalog.css";

function Catalog() {
  const grades = [
    { grade: 7, subject: "Math", date: "2022-02-01" },
    { grade: 9, subject: "English", date: "2022-02-05" },
    { grade: 7, subject: "History", date: "2022-02-10" },
    { grade: 5, subject: "Science", date: "2022-02-14" },
    { grade: 9, subject: "Art", date: "2022-02-20" },
    { grade: 4, subject: "Music", date: "2022-02-25" },
    { grade: 8, subject: "PE", date: "2022-03-01" },
    { grade: 8, subject: "Social Studies", date: "2022-03-05" },
    { grade: 9, subject: "Foreign Language", date: "2022-03-10" },
    { grade: 6, subject: "Computer Science", date: "2022-03-15" },
  ];
  const studentName = "User";

  return (
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
                <span className="subject-value">{grade.subject}</span>
              </td>
              <td className="grade">
                <span className="grade-value">
                  {" "}
                  <em>{grade.grade}</em>
                </span>
              </td>
              <td>
                <span className="date-value">{grade.date}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Catalog;
