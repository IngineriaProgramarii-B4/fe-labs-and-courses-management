import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CourseCard from "./CoursesCard";
import CoursesCard from "./CoursesCard";
import { Card } from "antd";
import CoursesInputString from './CoursesCard';

test('should render the card title', () => {
    render(
        <Card 
          title="Teachers"
        />
    );
    const h1Element = screen.getByText(/teachers/i);
    expect(h1Element).toBeInTheDocument();
});

// describe('CoursesCard', () => {
//     test('renders the card title', () => {
//       render(<CourseCard title={name}/>);
//       const cardTitle = screen.findByText(/Teachers/i);
//       expect(cardTitle).toBeInTheDocument();
//     });
  
//     test('renders the teacher name', () => {
//       render(<CourseCard />);
//       const teacherName = screen.findByText(/Iftene Adrian/i);
//       expect(teacherName).toBeInTheDocument();
//     });
  
//     test('renders the course title', () => {
//       render(<CourseCard />);
//       const courseTitle = screen.findByText(/Ingineria Programarii/i);
//       expect(courseTitle).toBeInTheDocument();
//     });
//   });

  

// metoda 1
// test('should render the card title', () => {
//     render(
//         <Card 
//           title="Teachers"
//         />
//     );
//     const h1Element = screen.getByText(/teachers/i);
//     expect(h1Element).toBeInTheDocument();
// });

// test('should render the teacher name', () => {
//     render(
//         <Card 
//           title={"name"}
//         />
//     );
//     const h1Element = screen.getByText(/name/i);
//     expect(h1Element).toBeInTheDocument();
// });

// test('should render the course title', () => {
//     render(
//         <Card 
//             title={"teachedCourse.courseTitle"}
//         />
//     );
//     const h1Element = screen.getByText(/teachedCourse.courseTitle/i);
//     expect(h1Element).toBeInTheDocument();
// });


//met2
test('renders course card with teachedCourses data', () => {
    
    const teacherData = {
        name: "Iftene Adrian",
        teachedCourses: [
          {
            courseTitle: "Test Course 1",
            hasExam: true,
            hasPartialExam: false,
            hasHomeworkNotation: true,
            hasLaboratoryGrading: false,
            hasPresentGrading: true,
            finalGrade: "Gauss",
            noOfCredits: "5",
          },
        ],
      };
  
  render(<CourseCard teacherData={teacherData} />);
      
  expect(screen.getByText(teacherData.name)).toBeInTheDocument();
  expect(screen.getByText('Test Course 1')).toBeInTheDocument();

  expect(screen.getByText('Has Exam')).toBeInTheDocument();
  expect(screen.getByText('yes')).toBeInTheDocument();
  
  expect(screen.getByText('Has Partial Exam')).toBeInTheDocument();
  expect(screen.getByText('no')).toBeInTheDocument();
  
  expect(screen.getByText('Has Homework Notation')).toBeInTheDocument();
  expect(screen.getByText('yes')).toBeInTheDocument();
  
  expect(screen.getByText('Has Laboratory Grading')).toBeInTheDocument();
  expect(screen.getByText('no')).toBeInTheDocument();
  
  expect(screen.getByText('Has Present Grading')).toBeInTheDocument();
  expect(screen.getByText('yes')).toBeInTheDocument();
  
  expect(screen.getByText('Final Grade')).toBeInTheDocument();
  expect(screen.getByText('Gauss')).toBeInTheDocument();

  expect(screen.getByText('Number of Credits')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();


});


 
