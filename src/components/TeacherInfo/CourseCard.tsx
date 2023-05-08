import React, { useState } from "react";
import { Input, Card, Divider } from "antd";
import { teacherDataProps } from "./TeacherInfoCard";

type CourseInputInfoProps = {
  title: string;
  type: string;
  value: string;
  setValue: (val: string) => void;
};

export function CourseInputInfo({
                                  title,
                                  type,
                                  value,
                                  setValue
                                }: CourseInputInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className={"flex"}>
      <p className={"my-auto"}>{title}:</p>
      {!isEditing ? (
        <div className={"flex"} onClick={() => setIsEditing(false)}>
          <p className={"my-auto ml-2"}>{value}</p>
          <i className={"fa-solid fa-pen-to-square ml-2 cursor-pointer"} />
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

export type courseData = {
  courseTitle: string;
  hasExam: boolean;
  hasPartialExam: boolean;
  hasHomeworkNotation: boolean;
  hasLaboratoryGrading: boolean;
  hasPresentGrading: boolean;
  noOfCredits: string;
  finalGrade: string;
};

export function CourseCard(course: courseData) {
  return (
    <div
    >
      <h1 className="font-semibold text-base">{course.courseTitle}</h1>
      <div style={{ padding: "10px" }}>
        <CourseInputInfo
          title={"Has Exam"}
          value={course.hasExam ? "yes" : "no"}
          setValue={() => {
          }}
          type={"text"}
        />
        <CourseInputInfo
          title={"Has Partial Exam"}
          value={course.hasPartialExam ? "yes" : "no"}
          setValue={() => {
          }}
          type={"text"}
        />
        <CourseInputInfo
          title={"Has Homework Notation"}
          value={course.hasHomeworkNotation ? "yes" : "no"}
          setValue={() => {
          }}
          type={"text"}
        />
        <CourseInputInfo
          title={"Has Laboratory Grading"}
          value={course.hasLaboratoryGrading ? "yes" : "no"}
          setValue={() => {
          }}
          type={"text"}
        />
        <CourseInputInfo
          title={"Has Present Grading"}
          value={course.hasPresentGrading ? "yes" : "no"}
          setValue={() => {
          }}
          type={"text"}
        />
        <CourseInputInfo
          title={"Final Grade"}
          value={course.finalGrade}
          setValue={() => {
          }}
          type={"text"}
        />
        <CourseInputInfo
          title={"Number of Credits"}
          value={course.noOfCredits}
          setValue={() => {
          }}
          type={"text"}
        />
      </div>
    </div>
  );
}

function CoursesCard({ name, taughtSubjects }: teacherDataProps) {
  return (
    <Card title={name}>
      <div className="flex flex-col">
        {taughtSubjects.map((taughtSubject) => {
          return <>
            <CourseCard {...taughtSubject} />
            <Divider />
          </>;
        })}
      </div>
    </Card>
  );
}

export default CoursesCard;
