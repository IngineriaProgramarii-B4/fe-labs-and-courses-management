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

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8082/api/v1",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    axiosInstance
      .post("/users/loggedUser", localStorage.getItem("token"))
      .then((res) => res.data)
      .then((data) => {
        return data.email;
      })
      .then((email) => {
        axiosInstance
          .get(`/users?email=${email}`)
          .then((res) => res.data)
          .then((data) => {
            const taughtSubjectsArray = data[0].taughtSubjects.map(
              (course: any) => {
                return { value: course.title, label: course.title };
              }
            );
            setTaughtSubjects(taughtSubjectsArray);
          })
          .catch((err) => {
            if (err.response.status === 404) {
              console.log("err");
            }
          });
      });
  }, []);

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
    <div className="w-screen bg-white/90 h-screen overflow-hidden">
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
                taughtSubjects={taughtSubjects}
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
        <Pagination
          current={currentPage}
          defaultPageSize={pageSize}
          total={grades?.length + 1}
          onChange={handlePageChange}
          className="mt-3"
        />
      </div>
    </div>
  );
}

export default Catalog;
