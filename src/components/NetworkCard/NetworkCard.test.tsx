/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NetworkCard from "./NetworkCard";
import UserHeader from "./UserHeader";
import UserInfoFields from "./UserInfoFields";
import axios, { AxiosInstance } from "axios";

jest.mock("axios");
const axiosInstanceMock = axios as jest.Mocked<typeof axios>;

describe("UserHeader", () => {
  const userData = {
    username: "dianacuzic",
    firstname: "Diana",
    lastname: "Cuzic",
  };

  test("should render properly", () => {
    render(
      <UserHeader
        username={userData.username}
        firstname={userData.firstname}
        lastname={userData.lastname}
      />
    );

    expect(screen.getByText("@" + userData.username)).toBeInTheDocument();
    expect(
      screen.getByText(`${userData.firstname} ${userData.lastname}`)
    ).toBeInTheDocument();
  });
});

describe("UserInfoFields", () => {
  const userInfo = {
    title: "dianacuzic",
    value: "Diana",
  };

  test("should render properly", () => {
    render(<UserInfoFields title={userInfo.title} value={userInfo.value} />);

    expect(screen.getByText(userInfo.title + ":")).toBeInTheDocument();
    expect(screen.getByText(userInfo.value)).toBeInTheDocument();

    // !!pot fi valori multiple (in cazul in care value: string[])

    // userInfo.value && userInfo.value[0] &&
    // expect(screen.getByText(new RegExp(userInfo.value[0], "i"))).toBeInTheDocument();
  });
});

describe("NetworkCard", () => {
  const mockedNetworkData = [
    {
      email: "diana.cuzic@gmail.com",
      firstName: "Diana",
      lastName: "Cuzic",
      username: "dianacuzic",
      office: "P1",
      department: "Secretary",
    },
    {
      email: "stefan.ciobaca@uaic.com",
      firstName: "Stefan",
      lastName: "Ciobaca",
      username: "stefan.ciobaca",
      title: "Prof",
      taughtSubjects: ["PA", "PF", "Logica"],
    },
    {
      email: "florin.eugen@uaic.ro",
      firstName: "Florin",
      lastName: "Rotaru",
      username: "florin02",
      year: 2,
      semester: 4,
      registrationNumber: "123FAKE92929",
      enrolledCourses: ["IP", "PA", "SGBD", "TW", "SE"],
    },
  ];

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
      data: [mockedNetworkData],
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render properly", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    await act(async () => {
      render(<NetworkCard />);
    });

    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalled());
    mockedNetworkData.forEach((data) => {
      expect(screen.getByText(data.email)).toBeInTheDocument();
      expect(screen.getByText(data.firstName)).toBeInTheDocument();
      expect(screen.getByText(data.lastName)).toBeInTheDocument();
      data.year && expect(screen.getByText(data.year)).toBeInTheDocument();
      data.semester &&
        expect(screen.getByText(data.semester)).toBeInTheDocument();
      data.registrationNumber &&
        expect(screen.getByText(data.registrationNumber)).toBeInTheDocument();
      data.enrolledCourses &&
        data.enrolledCourses[0] &&
        expect(
          screen.getByText(new RegExp(data.enrolledCourses[0], "i"))
        ).toBeInTheDocument();
    });
  });
});
