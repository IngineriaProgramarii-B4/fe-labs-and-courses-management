import React, { useState, useEffect } from "react";
import axios from "axios";
import AddGrade from "./components/AddGrade";
import UpdateGrade from "./components/UpdateGrade";
import DeleteGrade from "./components/DeleteGrade";
import styles from "./Catalog.module.scss";
import { useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import { Button, Pagination } from "antd";
import { CSVLink } from "react-csv";

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
  const [grades, setGrades] = useState<Grade[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [csvData, setCsvData] = useState<Grade[]>([]);
  const [taughtSubjects, setTaughtSubjects] = useState<any>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any>([]);
  const [commonSubjects, setCommonSubjects] = useState<any>([]);
  const [currentEmail, setCurrentEmail] = useState<string>("");

  async function fetchLoggedUser2() {
    try {
      const baseURL = "http://localhost:8082/api/v1";
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.post(
        `${baseURL}/users/loggedUser`,
        localStorage.getItem("token"),
        { headers }
      );
      const data = response.data;
      setCurrentEmail(data.email);

      const userDataResponse = await axios.get(
        `${baseURL}/users?email=${data.email}`,
        { headers }
      );
      const userData = userDataResponse.data;
      const taughtSubjectsArray = userData[0].taughtSubjects.map(
        (course: any) => ({
          value: course.title,
          label: course.title,
        })
      );
      return taughtSubjectsArray;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLoggedUser2().then((taughtSubjectsArray) => {
      setTaughtSubjects(taughtSubjectsArray);
    });
  }, []);

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
      setFirstName(data[0].firstName);
      setLastName(data[0].lastName);
      const enrolledCoursesArray = data[0].enrolledCourses.map(
        (course: any) => {
          return { value: course.title, label: course.title };
        }
      );
      setEnrolledCourses(enrolledCoursesArray);
      const commonSubjectsArray = enrolledCoursesArray.filter((course: any) => {
        return taughtSubjects.some(
          (subject: any) => subject.value === course.value
        );
      });
      setCommonSubjects(commonSubjectsArray);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (enrolledCourses.length > 0 && taughtSubjects.length > 0) {
      const commonSubjectsArray = enrolledCourses.filter((course: any) => {
        return taughtSubjects.some(
          (subject: any) => subject.value === course.value
        );
      });
      setCommonSubjects(commonSubjectsArray);
    }
  }, [enrolledCourses, taughtSubjects]);
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
      setCsvData(allGrades);
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
    <div className="display flex justify-center">
      <div className="w-[60rem] bg-white/90  overflow-hidden flex justify-center rounded-b-lg">
        <div className={styles.catalog_wrapper}>
          <div className="flex flex-row justify-between">
            <h1>{firstName + " " + lastName + "'s grades:"}</h1>

            <div>
              <Button className="mr-2 mb-2">
                <CSVLink
                  data={csvData.map(({ value, subject, evaluationDate }) => ({
                    value,
                    subject,
                    evaluationDate,
                  }))}
                  filename={`${firstName}_${lastName}_grades.csv`}
                  headers={[
                    { label: "Value", key: "value" },
                    { label: "Subject", key: "subject" },
                    { label: "Evaluation Date", key: "evaluationDate" },
                  ]}
                >
                  Export as CSV
                </CSVLink>
              </Button>
              {decodedToken?.role === "TEACHER" && (
                <AddGrade
                  fetchGrades={fetchGrades}
                  taughtSubjects={commonSubjects}
                  data-testid="add-grade"
                />
              )}
            </div>
          </div>
          <table className={styles.catalog_table}>
            <thead>
              <tr>
                <th></th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Evaluation Date</th>
              </tr>
            </thead>

            <tbody>
              {grades.slice(startIndex, endIndex).map((grade, index) => (
                <tr key={grade.id}>
                  <td>
                    {decodedToken?.role === "TEACHER" && (
                      <>
                        <DeleteGrade
                          fetchGrades={fetchGrades}
                          id={grade.id}
                          data-testid="delete-grade"
                        />
                        <UpdateGrade
                          fetchGrades={fetchGrades}
                          id={grade.id}
                          data-testid="update-grade"
                        />
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
