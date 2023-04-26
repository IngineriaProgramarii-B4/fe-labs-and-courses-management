import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CoursesCard, { CourseCard } from "./CourseCard";
import TeacherInfoCard, { teacherDataProps } from "./TeacherInfoCard";
import axios, { AxiosInstance } from "axios";

jest.mock("axios");
const axiosInstanceMock = axios as jest.Mocked<typeof axios>;
const mockedTeachersData: teacherDataProps[] = [
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

describe("TeacherInfoCard", () => {
  function createMockedAxiosInstance(): jest.Mocked<AxiosInstance> {
    const instance = axios.create();
    return {
      ...instance,
      get: jest.fn(),
      put: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;
  }

  let axiosInstance: jest.Mocked<AxiosInstance>;
  beforeEach(() => {
    axiosInstance = createMockedAxiosInstance();

    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.get.mockResolvedValue({
      data: [mockedTeachersData],
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the card title", () => {
    render(<TeacherInfoCard />);

    const cardTitle = screen.getByText(/Teachers/i);
    expect(cardTitle).toBeInTheDocument();
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
