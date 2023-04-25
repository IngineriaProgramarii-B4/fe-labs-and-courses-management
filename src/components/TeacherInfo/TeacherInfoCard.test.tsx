import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CoursesCard, { CourseCard } from "./CourseCard";
import TeacherInfoCard from "./TeacherInfoCard";

describe("TeacherInfoCard", () => {
  test("renders the card title", () => {
    render(<TeacherInfoCard />);
    const cardTitle = screen.getByText(/Teachers/i);
    expect(cardTitle).toBeInTheDocument();
  });

  test("renders the teacher name", () => {
    render(<TeacherInfoCard />);
    expect(screen.getByText(/Iftene Adrian/i)).toBeInTheDocument();
  });

  // test("renders the course titles", () => {
  //   render(<TeacherInfoCard />);
  //   expect(screen.getByText(/Ingineria Programarii/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Nume curs 2/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Nume curs 3/i)).toBeInTheDocument();
  // });
});

describe("CourseCard", () => {
  const courseData = {
    courseTitle: "Ingineria Programarii",
    hasExam: true,
    hasPartialExam: false,
    hasHomeworkNotation: true,
    hasLaboratoryGrading: false,
    hasPresentGrading: true,
    noOfCredits: "5",
    finalGrade: "Gauss",
  };

  test("should render properly", () => {
    render(<CourseCard {...courseData} />);

    // tests
    expect(screen.getByText(courseData.courseTitle)).toBeInTheDocument();

    // if (courseData.hasExam) {
    //   expect(screen.getByText(/Has Exam/)).toHaveTextContent(/yes/i);
    // }
    // if (courseData.hasPartialExam) {
    //   expect(screen.getByText(/Has Partial Exam/)).toHaveTextContent(/no/i);
    // }
    // if (courseData.hasHomeworkNotation) {
    //   expect(screen.getByText(/Has Homework Notation/)).toHaveTextContent(/yes/i);
    // }
    // if (courseData.hasLaboratoryGrading) {
    //   expect(screen.getByText(/Has Laboratory Grading/)).toHaveTextContent(/no/i);
    // }
    // if (courseData.hasPresentGrading) {
    //   expect(screen.getByText(/Has Present Grading/)).toHaveTextContent(/yes/i);
    // }
    expect(screen.getByText(courseData.noOfCredits)).toBeInTheDocument();
    expect(screen.getByText(courseData.finalGrade)).toBeInTheDocument();
  });
});

describe("CoursesCard", () => {
  const teachersData = [
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
          finalGrade: "Gauss",
        },
      ],
    },
  ];

  test("should render properly", () => {
    render(
      <CoursesCard
        name={teachersData[0].name}
        taughtSubjects={teachersData[0].taughtSubjects}
      />
    );

    //tests
    expect(screen.getByText(teachersData[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(teachersData[0].taughtSubjects[0].courseTitle)
    ).toBeInTheDocument();

    // const examText = teachersData[0].taughtSubjects[0].hasExam ? "yes" : "no";
    expect(screen.getByText(/Has exam/i)).toBeInTheDocument();
    expect(screen.getByText(/Has partial exam/i)).toBeInTheDocument();
    expect(screen.getByText(/Has homework notation/i)).toBeInTheDocument();
    expect(screen.getByText(/Has laboratory grading/i)).toBeInTheDocument();
    expect(screen.getByText(/Has present grading/i)).toBeInTheDocument();
    expect(screen.getAllByText("yes")).toHaveLength(3);
    expect(screen.getAllByText("no")).toHaveLength(2);
  });
});
