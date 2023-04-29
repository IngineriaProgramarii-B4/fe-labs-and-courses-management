import { useEffect, useState } from "react";
import { Card } from "antd";
import CoursesCard, {courseData } from "./CourseCard";
import axios from "axios";

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

  useEffect(() => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8090/api/v1",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    axiosInstance
      .get("/teachers")
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

    // DUMMY DATA
    const teachersData: teacherDataProps[] = [
      {
        name: "Iftene Adrian",
        taughtSubjects: [
          {
            courseTitle: "Ingineria Programarii",
            hasExam: true,
            hasPartialExam: false,
            hasHomeworkNotation: true,
            hasLaboratoryGrading: false,
            hasPresentGrading: true,
            noOfCredits: "5",
            finalGrade: "Gauss"
          },
          {
            courseTitle: "Nume curs 2",
            hasExam: false,
            hasPartialExam: true,
            hasHomeworkNotation: true,
            hasLaboratoryGrading: true,
            hasPresentGrading: false,
            noOfCredits: "4",
            finalGrade: "AVG"
          },
          {
            courseTitle: "Nume curs 3",
            hasExam: false,
            hasPartialExam: true,
            hasHomeworkNotation: true,
            hasLaboratoryGrading: true,
            hasPresentGrading: false,
            noOfCredits: "4",
            finalGrade: "AVG"
          }
        ]
      }
    ];
    // setTeacherInfo(teachersData);
  }, []);

  return (
    <Card title="Teachers">
      {teacherInfo.map((teacher: teacherDataProps) => {
        return (<CoursesCard name={teacher.name} taughtSubjects={teacher.taughtSubjects}></CoursesCard>);
      })}
    </Card>
  );
}

export default TeacherInfoCard;
