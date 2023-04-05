import React, { useEffect, useState } from "react";
import { Card, Input, Col, Row } from "antd";

type CoursesInputStringProps = {
  title: string;
  type: string;
  value: string;
  setValue: (val: string) => void;
};

function CoursesInputString({
  title,
  type,
  value,
  setValue,
}: CoursesInputStringProps) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className={"flex"}>
      <p className={"my-auto"}>{title}:</p>
      {!isEditing ? (
        <div className={"flex"} onClick={() => setIsEditing(true)}>
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

type coursesData = {
  courseTitle: string;
  hasExam: boolean;
  hasPartialExam: boolean;
  hasHomeworkNotation: boolean;
  hasLaboratoryGrading: boolean;
  hasPresentGrading: boolean;
  noOfCredits: "1" | "4" | "5" | "6";
  finalGrade: string;
};

type teacherDataProps = {
  name: string;
  teachedCourses: coursesData[];
};

function CourseCard({name, teachedCourses} : teacherDataProps) {
  return (
    <Card type="inner" title={name}>
      <Row gutter={16}>
        <Col span={8}>
          {teachedCourses.map((teachedCourse) => {
            return (
              <Card title={teachedCourse.courseTitle} bordered={false}>
                <p>Grading:</p>
                <div style={{ padding: "10px" }}>
                  <span>
                    <CoursesInputString
                      title={"Has Exam"}
                      value={teachedCourse.hasExam ? "yes" : "no"}
                      setValue={() => {}}
                      type={"text"}
                    />
                  </span>
                  <span>
                    <CoursesInputString
                      title={"Has Partial Exam"}
                      value={teachedCourse.hasPartialExam ? "yes" : "no"}
                      setValue={() => {}}
                      type={"text"}
                    />
                  </span>
                  <span>
                    <CoursesInputString
                      title={"Has Homework Notation"}
                      value={teachedCourse.hasHomeworkNotation ? "yes" : "no"}
                      setValue={() => {}}
                      type={"text"}
                    />
                  </span>
                  <span>
                    <CoursesInputString
                      title={"Has Laboratory Grading"}
                      value={teachedCourse.hasLaboratoryGrading ? "yes" : "no"}
                      setValue={() => {}}
                      type={"text"}
                    />
                  </span>
                  <span>
                    <CoursesInputString
                      title={"Has Present Grading"}
                      value={teachedCourse.hasPresentGrading ? "yes" : "no"}
                      setValue={() => {}}
                      type={"text"}
                    />
                  </span>
                </div>
                <CoursesInputString
                  title={"Final Grade"}
                  value={teachedCourse.finalGrade}
                  setValue={() => {}}
                  type={"text"}
                />
                <CoursesInputString
                  title={"Number of Credits"}
                  value={teachedCourse.noOfCredits}
                  setValue={() => {}}
                  type={"text"}
                />
              </Card>
            );
          })}
        </Col>
      </Row>
    </Card>
  );
}

function CoursesCard() {
  const [cardsInfo, setCardInfo] = useState<teacherDataProps[]>([
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

    setCardInfo(teachersData);
  }, []);

  return (
    <Card title="Teachers">
      {cardsInfo.map((card) => {
       return( <CourseCard name={card.name} teachedCourses={card.teachedCourses}></CourseCard>);
      })}
    </Card>
  );
}
export default CoursesCard;
