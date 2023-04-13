import { useState } from "react";
import { Input, Card } from "antd";
import { teacherDataProps } from "./TeacherInfoCard";

type CourseInputInfoProps = {
  title: string;
  type: string;
  value: string;
  setValue: (val: string) => void;
};

function CourseInputInfo({
  title,
  type,
  value,
  setValue,
}: CourseInputInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className={"flex"}>
      <p className={"my-auto"}>{title}:</p>
      {!isEditing ? (
        <div className={"flex"} onClick={() => setIsEditing(false)}>
          <p className={"my-auto ml-2"}>{value}</p>
          <i className={"fa-solid fa-pencil"} />
        </div>
      ) : (
        <div>
          <Input
            type={type}
            className={"ml-2 w-[13rem]"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <i
            className={"fa-solid fa-check"}
            onClick={() => setIsEditing(false)}
          />
        </div>
      )}
    </div>
  );
}

type courseData = {
  courseTitle: string;
  hasExam: boolean;
  hasPartialExam: boolean;
  hasHomeworkNotation: boolean;
  hasLaboratoryGrading: boolean;
  hasPresentGrading: boolean;
  noOfCredits: "1" | "4" | "5" | "6";
  finalGrade: string;
};

function CourseCard(course: courseData) {
  return (
    <Card
      title={course.courseTitle}
      bordered={false}
      style={{ margin: "auto" }}
    >
      <div style={{ padding: "10px" }}>
        <CourseInputInfo
          title={"Has Exam"}
          value={course.hasExam ? "yes" : "no"}
          setValue={() => {}}
          type={"text"}
        />
        <CourseInputInfo
          title={"Has Partial Exam"}
          value={course.hasPartialExam ? "yes" : "no"}
          setValue={() => {}}
          type={"text"}
        />
        <CourseInputInfo
          title={"Has Homework Notation"}
          value={course.hasHomeworkNotation ? "yes" : "no"}
          setValue={() => {}}
          type={"text"}
        />
        <CourseInputInfo
          title={"Has Laboratory Grading"}
          value={course.hasLaboratoryGrading ? "yes" : "no"}
          setValue={() => {}}
          type={"text"}
        />
        <CourseInputInfo
          title={"Has Present Grading"}
          value={course.hasPresentGrading ? "yes" : "no"}
          setValue={() => {}}
          type={"text"}
        />
        <CourseInputInfo
          title={"Final Grade"}
          value={course.finalGrade}
          setValue={() => {}}
          type={"text"}
        />
        <CourseInputInfo
          title={"Number of Credits"}
          value={course.noOfCredits}
          setValue={() => {}}
          type={"text"}
        />
      </div>
    </Card>
  );
}

function CoursesCard({ name, teachedCourses }: teacherDataProps) {
  return (
    <Card type="inner" title={name} style={{ width: "80%", margin: "auto" }}>
      <div style={{ display: "flex", padding: "15px" }}>
        {teachedCourses.map((teachedCourse) => {
          return <CourseCard {...teachedCourse}></CourseCard>;
        })}
      </div>
    </Card>
  );
}

export { CoursesCard, type courseData };
