import { useEffect, useState } from "react";
import { Card } from "antd";
import CoursesCard, { courseData } from "./CourseCard";
import axios from "axios";

export type teacherDataProps = {
  name: string;
  taughtSubjects: courseData[];
};

function TeacherInfoCard() {
  const [teacherInfo, setTeacherInfo] = useState<teacherDataProps[]>([
    {
      name: "",
      taughtSubjects: [],
    },
  ]);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:8080/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
    });

    axiosInstance
      .get("/teachers")
      .then((res) => res.data)
      .then((data) => setTeacherInfo(data[0] as teacherDataProps[]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Card title="Teachers">
      {teacherInfo.map((teacher, index) => {
        return (
          <CoursesCard
            key={index}
            name={teacher.name}
            taughtSubjects={teacher.taughtSubjects}
          />
        );
      })}
    </Card>
  );
}

export default TeacherInfoCard;
