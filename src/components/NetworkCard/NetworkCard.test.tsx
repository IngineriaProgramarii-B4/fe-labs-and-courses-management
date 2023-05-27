/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import NetworkCard, { RenderCard } from "./NetworkCard";
import UserHeader from "./UserHeader";
import UserInfoFields from "./UserInfoFields";
import axios, { AxiosInstance } from "axios";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));
jest.mock("axios");
const axiosInstanceMock = axios as jest.Mocked<typeof axios>;

describe("UserHeader", () => {
  const userData = {
    id: "string",
    username: "dianacuzic",
    firstname: "Diana",
    lastname: "Cuzic",
    roles: [
      {
        id: 1,
        name: "ADMIN",
      },
    ],
  };

  const userData2 = {
    id: "string",
    username: "dianacuzic",
    firstname: "Diana",
    lastname: "Cuzic",
    roles: [
      {
        id: 2,
        name: "TEACHER",
      },
    ],
  };

  test("should render properly if it stundent", () => {
    render(
      <BrowserRouter>
        <UserHeader
          username={userData.username}
          firstname={userData.firstname}
          lastname={userData.lastname}
          isStudent={true}
          isHovered={false}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("@" + userData.username)).toBeInTheDocument();
    expect(
      screen.getByText(userData.firstname + " " + userData.lastname)
    ).toBeInTheDocument();
  });

  test("should render properly if it is not student", () => {
    render(
      <BrowserRouter>
        <UserHeader
          username={userData2.username}
          firstname={userData2.firstname}
          lastname={userData2.lastname}
          isStudent={false}
          isHovered={false}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("@" + userData.username)).toBeInTheDocument();
    expect(
      screen.getByText(userData.firstname + " " + userData.lastname)
    ).toBeInTheDocument();
  });
});

describe("UserInfoFields", () => {
  const userInfo = {
    id: "1",
    title: "lastName",
    value: "Diana",
  };

  test("should render properly", () => {
    render(
      <UserInfoFields
        title={userInfo.title}
        value={userInfo.value}
        id={userInfo.id}
      />
    );

    expect(screen.getByText(userInfo.title + ":")).toBeInTheDocument();
    expect(screen.getByText(userInfo.value)).toBeInTheDocument();
  });
});

describe("NetworkCard", () => {
  const mockedNetworkData = [
    {
      id: "1",
      email: "diana.cuzic@gmail.com",
      firstname: "Diana",
      lastname: "Cuzic",
      username: "dianacuzic",
      office: "P1",
      department: "Secretary",
    },
    {
      id: "2",
      email: "stefan.ciobaca@uaic.com",
      firstname: "Stefan",
      lastname: "Ciobaca",
      username: "stefan.ciobaca",
      title: "Prof",
      taughtSubjects: ["PA", "PF", "Logica"],
    },
    {
      id: "3",
      email: "florin.eugen@uaic.ro",
      firstname: "Florin",
      lastname: "Rotaru",
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
      data: mockedNetworkData,
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });

    (axios.get as jest.Mock).mockResolvedValue({
      data: new Blob(),
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
      render(
        <BrowserRouter>
          <NetworkCard />
        </BrowserRouter>
      );
    });

    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalled());
    mockedNetworkData.forEach((data) => {
      expect(screen.getByText(data.email)).toBeInTheDocument();
      expect(screen.getByText(data.firstname)).toBeInTheDocument();
      expect(screen.getByText(data.lastname)).toBeInTheDocument();
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

  test("should handle error when fetching data", async () => {
    jest.spyOn(axios, "create").mockReturnValueOnce({
      get: jest.fn(() =>
        Promise.reject({
          response: {
            status: 404,
          },
        })
      ),
    } as any);

    render(
      <BrowserRouter>
        <NetworkCard />
      </BrowserRouter>
    );

    const networkCard = screen.queryByTestId("network-card");
    expect(networkCard).toBeInTheDocument();
  });
});

describe("RenderCard", () => {
  const userData = {
    id: "string",
    username: "dianacuzic",
    firstName: "Diana",
    lastName: "Cuzic",
    roles: [
      {
        id: 1,
        name: "ADMIN",
      },
    ],
    email: "dianacuzic@gmail.com",
  };

  const mockedAxios = axios as jest.Mocked<typeof axios>;
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: new Blob(),
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("set avatar on image load", async () => {
    const mockBlob = new Blob([""], { type: "image/png" });
    const mockUrl = "mockUrl";
    global.URL.createObjectURL = jest.fn(() => mockUrl);
    mockedAxios.get.mockResolvedValue({
      data: mockBlob,
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });

    render(
      <BrowserRouter>
        <RenderCard user={userData} />
      </BrowserRouter>
    );

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalled());
  });

  test("hovering over card", () => {
    render(
      <BrowserRouter>
        <RenderCard user={userData} />
      </BrowserRouter>
    );

    const card = screen.getByTestId("user-card");
    const cardLink = screen.getByTestId("user-card-link");

    // Simulate the mouseEnter event
    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    expect(cardLink).toHaveClass("hover:scale-[103%]");
  });
});
