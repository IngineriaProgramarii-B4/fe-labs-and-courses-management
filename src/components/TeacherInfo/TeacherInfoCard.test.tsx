import React from "react";
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CoursesCard, { CourseCard } from "./CourseCard";
import TeacherInfoCard, { teacherDataProps } from "./TeacherInfoCard";
import axios, { AxiosInstance } from "axios";
import { CourseInputInfo } from "./CourseCard";
import ReminderItem from "../RemindersCard/ReminderItem";

jest.mock("axios");
const axiosInstanceMock = axios as jest.Mocked<typeof axios>;
const mockedTeachersData = [
  {
    firstname: "Iftene",
    lastname: "Adrian",
    taughtSubjects: ["Ingineria Programarii", "Nume curs 2", "Nume curs 3"]
  }
];

describe("TeacherInfoCard", () => {
  function createMockedAxiosInstance(): jest.Mocked<AxiosInstance> {
    const instance = axios.create();
    return {
      ...instance,
      get: jest.fn(),
      put: jest.fn()
    } as unknown as jest.Mocked<AxiosInstance>;
  }

  let axiosInstance: jest.Mocked<AxiosInstance>;
  beforeEach(() => {
    axiosInstance = createMockedAxiosInstance();

    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.get.mockResolvedValue({
      data: mockedTeachersData,
      status: 200,
      statusText: "OK",
      config: {},
      headers: {}
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the teacher name", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    await act(async () => {
      render(<TeacherInfoCard />);
    });

    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalled());
    expect(screen.getByText(/Iftene Adrian/i)).toBeInTheDocument();
  });

  test("renders the course titles", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    await act(async () => {
      render(<TeacherInfoCard />);
    });

    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalled());
    expect(screen.getByText(/Ingineria Programarii/i)).toBeInTheDocument();
    expect(screen.getByText(/Nume curs 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Nume curs 3/i)).toBeInTheDocument();
  });
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
    finalGrade: "Gauss"
  };

  test("should render properly", () => {
    render(<CourseCard {...courseData} />);
    screen.debug()
    expect(screen.getByText(courseData.courseTitle)).toBeInTheDocument();

    if (courseData.hasExam) {
      expect(screen.getAllByRole("generic").find(div =>  div.innerHTML.includes('Has Exam'))).toHaveTextContent(/yes/i);
    }
    if (courseData.hasPartialExam) {
      expect(screen.getAllByRole("generic").find(div =>  div.innerHTML.includes('Has Partial Exam'))).toHaveTextContent(/no/i);
    }
    if (courseData.hasHomeworkNotation) {
      expect(screen.getAllByRole("generic").find(div =>  div.innerHTML.includes('Has Homework Notation'))).toHaveTextContent(/yes/i);
    }
    if (courseData.hasLaboratoryGrading) {
      expect(screen.getAllByRole("generic").find(div =>  div.innerHTML.includes('Has Laboratory Grading'))).toHaveTextContent(/no/i);
    }
    if (courseData.hasPresentGrading) {
      expect(screen.getAllByRole("generic").find(div =>  div.innerHTML.includes('Has Present Grading'))).toHaveTextContent(/yes/i);
    }
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
          finalGrade: "Gauss"
        }
      ]
    }
  ];

  test("should render properly", () => {
    render(
      <CoursesCard
        name={teachersData[0].name}
        taughtSubjects={teachersData[0].taughtSubjects}
      />
    );

    expect(screen.getByText(teachersData[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(teachersData[0].taughtSubjects[0].courseTitle)
    ).toBeInTheDocument();

    expect(screen.getByText(/Has exam/i)).toBeInTheDocument();
    expect(screen.getByText(/Has partial exam/i)).toBeInTheDocument();
    expect(screen.getByText(/Has homework notation/i)).toBeInTheDocument();
    expect(screen.getByText(/Has laboratory grading/i)).toBeInTheDocument();
    expect(screen.getByText(/Has present grading/i)).toBeInTheDocument();
    expect(screen.getAllByText("yes")).toHaveLength(3);
    expect(screen.getAllByText("no")).toHaveLength(2);
  });
});

// test("should log error on failed API request", async () => {
//   console.error = jest.fn(); // mock console.error function
//
//   const axiosInstance = axios.create({
//     baseURL: "http://localhost:8090/api/v1",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
//
//   axiosInstance.get = jest.fn(() => Promise.reject(new Error("API request failed"))); // mock axiosInstance.get function to return a rejected promise
//
//   await expect(axiosInstance.get("/teachers?id=1")).rejects.toThrow(); // expect the rejected promise to throw an error
//
//   expect(console.error).toHaveBeenCalled(); // expect console.error to have been called
// });


describe("CourseInputInfo", () => {

  test("changing the value in an input will fire onChange method in property editable", async () => {
    const mockedSetValue = jest.fn()
    render(<CourseInputInfo title="IP" type="" value="" setValue={mockedSetValue} />)
    const editPropertyIcon = screen.getByTestId("edit-property-icon");
    await act(async () => {
      fireEvent.click(editPropertyIcon);
    });
    const editPropertyInput = screen.getByTestId("edit-property");
    expect(editPropertyInput).toBeInTheDocument();

    fireEvent.change(editPropertyInput, { target: { value: "New Value" } });
    expect(mockedSetValue).toHaveBeenCalledWith('New Value')
  });

  test("save the value of the editable input", async () => {
    const mockedSetValue = jest.fn()
    render(<CourseInputInfo title="IP" type="" value="" setValue={mockedSetValue} />)
    const editPropertyIcon = screen.getByTestId("edit-property-icon");
    await act(async () => {
      fireEvent.click(editPropertyIcon);
    });
    const editPropertyInput = screen.getByTestId("edit-property");
    expect(editPropertyInput).toBeInTheDocument();

    const savePropertyIcon = screen.getByTestId("save-property-icon");
    await act(async () => {
      fireEvent.click(savePropertyIcon);
    });
    expect(editPropertyInput).not.toBeInTheDocument();
  });
});
