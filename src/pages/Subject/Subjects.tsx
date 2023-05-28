import axios from "axios";
import CardGrid from "./CardGrid";
import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { v4 } from "uuid";

const extractToken = () => {
  try {
    let token: string | null = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage");
      return null;
    }
    return token;
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
};

interface Subject {
  id: number;
  title: string;
  description: string;
  year: number;
  semester: number;
  credits: number;
  hoursOfStudy: number;
}

function Subjects() {
  const [cards, setCards] = useState<Subject[]>([]);
  const [isModified, setIsModified] = useState<boolean>(false);
  const { decodedToken }: any = useJwt(String(extractToken()));

  /*console.log(decodedToken);*/

  const fetchData = () => {
    /*console.log("fetching data");*/
    const token = extractToken();
    if (!token) {
      console.error("No token found in local storage");
      return;
    }
    const role = decodedToken?.role;
    const userMail = decodedToken?.sub;
    if (role === "STUDENT") {
      axios
        .get<any>(`http://localhost:8082/api/v1/students?email=${userMail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data)
        .then((data) => {
          // setCards(data[0].enrolledCourses);
          const enrolledCourses: Subject[] = data[0].enrolledCourses;
          for (let i = 0; i < enrolledCourses.length; i++) {
            axios
              .get<any>(
                `http://localhost:5000/api/v1/prediction/${enrolledCourses[i].credits}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                enrolledCourses[i].hoursOfStudy = Number(
                  response.data.prediction.toFixed(0)
                );
              })
              .catch((error) => {
                enrolledCourses[i].hoursOfStudy = 0;
              });
          }
          setCards(enrolledCourses);
        });
    } else {
      axios
        .get<Subject[]>(`http://localhost:8082/api/v1/subjects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data)
        .then((data) => {
          // setCards(data);
          const subjects: Subject[] = data;
          for (let i = 0; i < subjects.length; i++) {
            axios
              .get<any>(
                `http://localhost:5000/api/v1/prediction/${subjects[i].credits}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                subjects[i].hoursOfStudy = Number(
                  response.data.prediction.toFixed(0)
                );
              })
              .catch((error) => {
                subjects[i].hoursOfStudy = 0;
              });
          }
          setCards(subjects);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [isModified]);

  return (
    <>
      <div //className="=app-container"
        className="grid gap-8 px-8 py-8 items-center text-center"
        key={v4()}
      >
        <CardGrid
          cards={cards}
          setCards={setCards}
          isModified={isModified}
          setIsModified={setIsModified}
          role={decodedToken?.role}
        />
      </div>
    </>
  );
}

export default Subjects;
