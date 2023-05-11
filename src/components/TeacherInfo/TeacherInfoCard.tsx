import { useEffect, useState } from "react";
import CoursesCard, { courseData } from "./CourseCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

export type teacherDataProps = {
  name: string;
  taughtSubjects: courseData[];
};

function TeacherInfoCard() {
  const [teacherInfo, setTeacherInfo] = useState<teacherDataProps[]>([
    {
      name: "",
      taughtSubjects: []
    }
  ]);

  const { id } = useParams();

  useEffect(() => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8090/api/v1",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    axiosInstance
      .get(`/teachers?id=${id}`)
      .then((res) => res.data)
      .then((data) => {
        setTeacherInfo(data.map((item: { firstname: any; lastname: any; taughtSubjects: any[]; }) => {
          return {
            name: item.firstname + " " + item.lastname,
            taughtSubjects: item.taughtSubjects.map((sub: string) => {
              return {
                courseTitle: sub,
                hasExam: false,
                hasPartialExam: true,
                hasHomeworkNotation: true,
                hasLaboratoryGrading: true,
                hasPresentGrading: false,
                noOfCredits: "4",
                finalGrade: "AVG"
              };
            })
          };
        }));
      })
      // .catch((err) => console.error(err));
  }, []);

  return (
    <div className="m-auto mt-8 w-2/3">
      {teacherInfo.map((teacher: teacherDataProps) => {
        return (<CoursesCard key={v4()} name={teacher.name} taughtSubjects={teacher.taughtSubjects}></CoursesCard>);
      })}
    </div>
  );
}

export default TeacherInfoCard;
