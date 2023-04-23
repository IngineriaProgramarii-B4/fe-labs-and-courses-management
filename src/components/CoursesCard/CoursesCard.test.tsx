import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CourseCard from "./CoursesCard";
import CoursesCard from "./CoursesCard";
import { Card } from "antd";
import CoursesInputString from './CoursesCard';

window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
};

// teste care verifica daca numele la card-uri e ok pus 
describe('CoursesCard', () => {
    test('renders the card title', () => {
      render(<CoursesCard />);
      const cardTitle = screen.getByText(/Teachers/i);
      expect(cardTitle).toBeInTheDocument();
    });
  
    test('renders the teacher name', () => {
      render(<CoursesCard />);
      expect(screen.queryByText(/Iftene Adrian/i)).toBeInTheDocument();

    });
  
    test('renders the course title', () => {
      render(<CoursesCard />);
      expect(screen.queryByText(/Ingineria Programarii/i)).toBeInTheDocument();

    });
    test('renders the course title', () => {
      render(<CoursesCard />);
      expect(screen.queryByText(/Nume curs 2/i)).toBeInTheDocument();

    });

    test('renders the course title', () => {
      render(<CoursesCard />);
      expect(screen.queryByText(/Nume curs 3/i)).toBeInTheDocument();

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

describe("CoursesCard", () => {
  test("renders course cards with correct data", () => {
    const teachersData = [
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
          }
        ],
      },
    ];

    const { getByText } = render(<CoursesCard />);
    
  //Check if the teacher's name is displayed
    expect(getByText("Iftene Adrian")).toBeInTheDocument();

  //Check if each course's title is displayed
    expect(getByText("Ingineria Programarii")).toBeInTheDocument();
    expect(getByText("Nume curs 2")).toBeInTheDocument();
    expect(getByText("Nume curs 3")).toBeInTheDocument();

    //Check if each course's grading properties are displayed
    const hasExamElement = screen.queryByText('Has Exam');
    expect(hasExamElement).toBeInTheDocument();
    
    if (hasExamElement) {
        expect(hasExamElement).toHaveTextContent('yes');
     }

  expect(screen.queryByText('Has Partial Exam')).toBeInTheDocument();
  expect(screen.queryByText('no')).toBeInTheDocument();
  
  expect(screen.queryByText('Has Homework Notation')).toBeInTheDocument();
  expect(screen.queryByText('yes')).toBeInTheDocument();
  
  expect(screen.queryByText('Has Laboratory Grading')).toBeInTheDocument();
  expect(screen.queryByText('no')).toBeInTheDocument();
  
  expect(screen.queryByText('Has Present Grading')).toBeInTheDocument();
  expect(screen.queryByText('yes')).toBeInTheDocument();
  
  expect(screen.queryByText('Final Grade')).toBeInTheDocument();
  expect(screen.queryByText('Gauss')).toBeInTheDocument();

  expect(screen.queryByText('Number of Credits')).toBeInTheDocument();
  expect(screen.queryByText('5')).toBeInTheDocument();
  });
});

 
