import { useEffect, useState } from "react";
import { Card } from "antd";
import {CoursesCard, courseData} from "./CourseCard";

type teacherDataProps = {
  name: string;
  teachedCourses: courseData[];
};

function TeacherInfoCard() {
  const [teacherInfo, setTeacherInfo] = useState<teacherDataProps[]>([
    {
      name: "",
      teachedCourses: [],
    },
  ]);

  useEffect(() => {
    // TODO : fetch data from db for this specific user
    const teachersData: teacherDataProps[] = [
      {
        name: "Iftene Adrian",
        teachedCourses: [
          {
            courseTitle: "Ingineria Programarii",
            hasExam: true,
            hasPartialExam: false,
            hasHomeworkNotation: true,
            hasLaboratoryGrading: false,
            hasPresentGrading: true,
            noOfCredits: "5",
            finalGrade: "Gauss",
          },
          {
            courseTitle: "Nume curs 2",
            hasExam: false,
            hasPartialExam: true,
            hasHomeworkNotation: true,
            hasLaboratoryGrading: true,
            hasPresentGrading: false,
            noOfCredits: "4",
            finalGrade: "AVG",
          },
          {
            courseTitle: "Nume curs 3",
            hasExam: false,
            hasPartialExam: true,
            hasHomeworkNotation: true,
            hasLaboratoryGrading: true,
            hasPresentGrading: false,
            noOfCredits: "4",
            finalGrade: "AVG",
          },
        ],
      },
    ];
    setTeacherInfo(teachersData);
  }, []);

  return (
    <Card title="Teachers">
      {teacherInfo.map((teacher) => {
       return( <CoursesCard name={teacher.name} teachedCourses={teacher.teachedCourses}></CoursesCard>);
      })}
    </Card>
  );
}
export {TeacherInfoCard, type teacherDataProps};
