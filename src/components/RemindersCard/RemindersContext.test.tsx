import React from "react";
import { waitFor, fireEvent, render, screen } from "@testing-library/react";
import { Button, Card } from "antd";
import RemindersContextProvider, {
  RemindersContext,
  ReminderDataProps,
} from "./RemindersContext";
import axios, { AxiosInstance } from "axios";
import ReminderItem from "./ReminderItem";
import RemindersCard from "./RemindersCard";

const mockedRemindersData: ReminderDataProps[] = [
  {
    id: "24534dsvfdsaz",
    dueDateTime: "01/06/2023",
    title: "Task 1",
    description: "Finish a book",
  },
  {
    id: "876534dswet2vfdsaz",
    dueDateTime: "01/05/2023",
    title: "Task 2",
    description: "Feed Linux",
  },
];
jest.mock("axios");
const axiosInstanceMock = axios as jest.Mocked<typeof axios>;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Use actual for all non-hook parts
  useNavigate: jest.fn(),
}));

let localStorageMock: {
  getItem: jest.Mock;
  setItem: jest.Mock;
  clear: jest.Mock;
  removeItem: jest.Mock;
  key: jest.Mock;
  length: number;
};
describe("RemindersContext", () => {
  function createMockedAxiosInstance(): jest.Mocked<AxiosInstance> {
    const instance = axios.create();
    return {
      ...instance,
      get: jest.fn(),
      put: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;
  }

  let axiosInstance: jest.Mocked<AxiosInstance>;
  beforeEach(() => {
    axiosInstance = createMockedAxiosInstance();

    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.get.mockResolvedValue({
      data: mockedRemindersData,
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });

    axiosInstance.post.mockResolvedValue({
      data: mockedRemindersData[0].id,
      status: 204,
      statusText: "CREATED",
      config: {},
      headers: {},
    });

    localStorageMock = {
      getItem: jest.fn().mockReturnValue("testToken"),
      setItem: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn(),
      key: jest.fn(),
      length: 0,
    };

    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.key.mockClear();
  });

  test("should call saveNewReminder when click on submit button", () => {
    const mockedSaveNewReminder = jest.fn();
    render(
      <>
        <Button
          onClick={() => {
            mockedSaveNewReminder();
          }}
        >
          Add
        </Button>
      </>
    );
    const submitNewReminderButton = screen.getByText("Add");
    fireEvent.click(submitNewReminderButton);
    expect(mockedSaveNewReminder).toHaveBeenCalledTimes(1);
  });

  test("should render the component without errors", () => {
    render(
      <RemindersContext.Provider value={{}}>
        <div>Test</div>
      </RemindersContext.Provider>
    );
  });

  test("posts logged user", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.patch.mockResolvedValue({ status: 200 });

    render(
      <RemindersContextProvider>
        <RemindersCard />
      </RemindersContextProvider>
    );

    await waitFor(() => expect(axiosInstance.post).toHaveBeenCalled());
  });

  test("fetches reminders from server and sets state", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.get.mockResolvedValue({
      data: mockedRemindersData,
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });

    render(
      <Card title="Your Reminders">
        {mockedRemindersData.map((reminder: ReminderDataProps) => (
          <React.Fragment key={reminder.id}>
            <ReminderItem
              dueDateTime={reminder.dueDateTime}
              description={reminder.description}
              title={reminder.title}
              id={reminder.id}
              deleteReminder={() => {}}
            />
          </React.Fragment>
        ))}
      </Card>
    );

    mockedRemindersData.forEach((data) => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
      expect(screen.getByText(data.description)).toBeInTheDocument();
    });
  });

  test("saves a new reminder", async () => {
    axiosInstance.patch.mockResolvedValue({ status: 200 });
    axiosInstance.post.mockResolvedValue({
      data: mockedRemindersData[0],
      status: 204,
      statusText: "CREATED",
      config: {},
      headers: {},
    });

    render(
      <RemindersContextProvider>
        <RemindersCard />
      </RemindersContextProvider>
    );

    await waitFor(() => expect(axiosInstance.post).toHaveBeenCalled());
  });

  test("delete a reminder", async () => {
    axiosInstance.patch.mockResolvedValue({ status: 200 });
    axiosInstance.delete.mockResolvedValue({
      data: mockedRemindersData[0].id,
      status: 204,
      statusText: "NO CONTENT",
      config: {},
      headers: {},
    });

    render(
      <RemindersContextProvider>
        <RemindersCard />
      </RemindersContextProvider>
    );

    await waitFor(() => expect(axiosInstance.delete).toHaveBeenCalled());
  });
});
