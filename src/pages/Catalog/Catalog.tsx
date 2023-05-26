import React, { useState, useEffect } from "react";
import axios from "axios";
import AddGrade from "./components/AddGrade";
import UpdateGrade from "./components/UpdateGrade";
import DeleteGrade from "./components/DeleteGrade";
import styles from "./Catalog.module.scss";
import { useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import { Pagination } from "antd";

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
  const { id } = useParams();
  const [enrolledCourses, setEnrolledCourses] = useState<any>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  async function fetchEnrolledCourses() {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/users?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log("big data:", data);
      setFirstName(data[0].firstName);
      setLastName(data[0].lastName);
      const enrolledCoursesArray = data[0].enrolledCourses.map(
        (course: any) => {
          return { value: course.title, label: course.title };
        }
      );
      setEnrolledCourses(enrolledCoursesArray);

      console.log(enrolledCoursesArray);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchName() {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/users?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      setFirstName(data[0].firstname);
      setLastName(data[0].lastname);
    } catch (error) {
      console.log(error);
    }
  }

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
      fetchEnrolledCourses();
    }
  }, [token]);

  useEffect(() => {
    fetchGrades();
    fetchName();
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <div className="w-screen">
      <div className="bg-white/80 w-screen flex justify-center items-center">
        <div className={styles.catalog_wrapper}>
          <div className="flex flex-row justify-between">
            <h1>{firstName + " " + lastName + "'s grades:"}</h1>
            {decodedToken?.role === "TEACHER" && (
              <AddGrade
                fetchGrades={fetchGrades}
                enrolledCourses={enrolledCourses}
              />
            )}
          </div>
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
              {grades.slice(startIndex, endIndex).map((grade, index) => (
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
                    <span className={styles.subject_value}>
                      {grade.subject}
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
          <Pagination
            current={currentPage}
            defaultPageSize={pageSize}
            total={grades?.length + 1}
            onChange={handlePageChange}
            className="mt-3"
          />
        </div>
      </div>
    </div>
  );
}

export default Catalog;
