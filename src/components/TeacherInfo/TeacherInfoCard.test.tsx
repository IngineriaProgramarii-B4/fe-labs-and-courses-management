import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CoursesCard, { CourseCard } from "./CourseCard";
import TeacherInfoCard from "./TeacherInfoCard";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

// Don't test yet
// describe("TeacherInfoCard", () => {
//   test("renders the card title", () => {
//     render(<TeacherInfoCard />);
//     const cardTitle = screen.getByText(/Teachers/i);
//     expect(cardTitle).toBeInTheDocument();
//   });
//
//   test("renders the teacher name", () => {
//     render(<TeacherInfoCard />);
//     expect(screen.getByText(/Iftene Adrian/i)).toBeInTheDocument();
//   });
//
//   test("renders the course titles", () => {
//     render(<TeacherInfoCard />);
//     expect(screen.getByText(/Ingineria Programarii/i)).toBeInTheDocument();
//     expect(screen.getByText(/Nume curs 2/i)).toBeInTheDocument();
//     expect(screen.getByText(/Nume curs 3/i)).toBeInTheDocument();
//   });
// });

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
    render(
      <CourseCard
        courseTitle={courseData.courseTitle}
        hasExam={courseData.hasExam}
        hasPartialExam={courseData.hasPartialExam}
        hasHomeworkNotation={courseData.hasHomeworkNotation}
        hasLaboratoryGrading={courseData.hasLaboratoryGrading}
        hasPresentGrading={courseData.hasPresentGrading}
        noOfCredits={courseData.noOfCredits}
        finalGrade={courseData.finalGrade}
      />
    );

    // tests
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
  });
});

// test("should be editable when in edit mode", () => {
//   const setValueMock = jest.fn();
//   render(
//     <CourseCard
//         name={"name"}
//         courseTitle={"Ingineria Programarii"}
//         hasExam={true}
//         hasPartialExam={true}
//         hasHomeworkNotation={true}
//         hasLaboratoryGrading={true}
//         hasPresentGrading={true}
//         noOfCredits={"no"}
//         finalGrade={"final"}
//     />
//   );
// });

// describe("TeacherInfoCard", () => {
//   test("renders course cards with correct data", () => {
//     const teachersData = [
//       {
//         name: "Iftene Adrian",
//         teachedCourses: [
//           {
//             courseTitle: "Ingineria Programarii",
//             hasExam: true,
//             hasPartialExam: false,
//             hasHomeworkNotation: true,
//             hasLaboratoryGrading: false,
//             hasPresentGrading: true,
//             noOfCredits: "5",
//             finalGrade: "Gauss",
//           }
//         ],
//       },
//     ];
//
//     const { getByText } = render(<TeacherInfoCard />);
//
//   //Check if the teacher's name is displayed
//     expect(getByText("Iftene Adrian")).toBeInTheDocument();
//
//   //Check if each course's title is displayed
//     expect(getByText("Ingineria Programarii")).toBeInTheDocument();
//     expect(getByText("Nume curs 2")).toBeInTheDocument();
//     expect(getByText("Nume curs 3")).toBeInTheDocument();
//
//     //Check if each course's grading properties are displayed
//     const hasExamElement = screen.queryByText('Has Exam');
//     expect(hasExamElement).toBeInTheDocument();
//
//     if (hasExamElement) {
//         expect(hasExamElement).toHaveTextContent('yes');
//      }
//
//   expect(screen.queryByText('Has Partial Exam')).toBeInTheDocument();
//   expect(screen.queryByText('no')).toBeInTheDocument();
//
//   expect(screen.queryByText('Has Homework Notation')).toBeInTheDocument();
//   expect(screen.queryByText('yes')).toBeInTheDocument();
//
//   expect(screen.queryByText('Has Laboratory Grading')).toBeInTheDocument();
//   expect(screen.queryByText('no')).toBeInTheDocument();
//
//   expect(screen.queryByText('Has Present Grading')).toBeInTheDocument();
//   expect(screen.queryByText('yes')).toBeInTheDocument();
//
//   expect(screen.queryByText('Final Grade')).toBeInTheDocument();
//   expect(screen.queryByText('Gauss')).toBeInTheDocument();
//
//   expect(screen.queryByText('Number of Credits')).toBeInTheDocument();
//   expect(screen.queryByText('5')).toBeInTheDocument();
//   });
// });
