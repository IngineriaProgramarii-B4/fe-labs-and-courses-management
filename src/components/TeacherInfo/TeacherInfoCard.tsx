import { useEffect, useState } from "react";
import CoursesCard, {courseData } from "./CourseCard";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  const {id} = useParams()

  useEffect(() => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8082/api/v1",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    axiosInstance
      .get(`/teachers?id=${id}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data)
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
              }
            })
          }
        }))
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="m-auto mt-8 w-2/3">
      {teacherInfo.map((teacher: teacherDataProps) => {
        return (<CoursesCard name={teacher.name} taughtSubjects={teacher.taughtSubjects}></CoursesCard>);
      })}
    </div>
  );
}

export default TeacherInfoCard;
