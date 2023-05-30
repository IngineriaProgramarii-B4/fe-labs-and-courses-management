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

  const getEstimatedStudyHours = (credits: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      axios
        .get<any>(`http://localhost:5000/api/v1/prediction/${credits}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          resolve(Number(response.data.prediction.toFixed(0)));
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const fetchData = async () => {
    const token = extractToken();
    if (!token) {
      console.error("No token found in local storage");
      return;
    }
    const role = decodedToken?.role;
    const userMail = decodedToken?.sub;
    if (role === "STUDENT") {
      try {
        const response = await axios.get<any>(
          `http://localhost:8082/api/v1/students?email=${userMail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const enrolledCourses: Subject[] = response.data[0].enrolledCourses;
        const studyHourPromises = enrolledCourses.map((course) =>
          getEstimatedStudyHours(course.credits)
            .then((hours) => {
              course.hoursOfStudy = hours;
            })
            .catch(() => {
              course.hoursOfStudy = 0;
            })
        );
        await Promise.all(studyHourPromises);
        setCards(enrolledCourses);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.get<Subject[]>(
          `http://localhost:8082/api/v1/subjects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const subjects: Subject[] = response.data;
        const studyHourPromises = subjects.map((subject) =>
          getEstimatedStudyHours(subject.credits)
            .then((hours) => {
              subject.hoursOfStudy = hours;
            })
            .catch(() => {
              subject.hoursOfStudy = 0;
            })
        );
        await Promise.all(studyHourPromises);
        setCards(subjects);
      } catch (error) {
        console.error(error);
      }
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

// export default Subjects;
export { Subjects, extractToken };
