import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Button, Card } from "antd";
import { RemindersContext, ReminderDataProps } from "./RemindersContext";
import axios, { AxiosInstance } from "axios";
import ReminderItem from "./ReminderItem";
import { Divider } from "antd/lib";
import MockAdapter from "axios-mock-adapter";

const mockedRemindersData: ReminderDataProps[] = [
  {
    id: "24534dsvfdsaz",
    dueDateTime: "01/06/2023",
    title: "Task 1",
    description: "Finish a book"
  },
  {
    id: "876534dswet2vfdsaz",
    dueDateTime: "01/05/2023",
    title: "Task 2",
    description: "Feed Linux"
  }
];
jest.mock("axios");
const axiosInstanceMock = axios as jest.Mocked<typeof axios>;

function createMockedAxiosInstance(): jest.Mocked<AxiosInstance> {
  const instance = axios.create();
  return {
    ...instance,
    get: jest.fn(),
    put: jest.fn()
  } as unknown as jest.Mocked<AxiosInstance>;
}

let axiosInstance: jest.Mocked<AxiosInstance>;

afterEach(() => {
  jest.clearAllMocks();
});

describe("RemindersContext", () => {


  test("should call saveNewReminder when click on submit button", () => {
    const mockedSaveNewReminder = jest.fn();
    render(
      <>
        <Button onClick={() => {
          mockedSaveNewReminder();
        }}>
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

  test("fetches reminders from server and sets state", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.get.mockResolvedValue({
      data: mockedRemindersData,
      status: 200,
      statusText: "OK",
      config: {},
      headers: {}
    });

    render(
      <Card title="Your Reminders">
        {
          mockedRemindersData.map((reminder: ReminderDataProps) => (
              <React.Fragment key={reminder.id}>
                <ReminderItem dueDateTime={reminder.dueDateTime} description={reminder.description}
                              title={reminder.title} id={reminder.id} deleteReminder={() => {

                }} />
                <Divider />
              </React.Fragment>
            )
          )
        }
      </Card>
    );

    mockedRemindersData.forEach((data) => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
      expect(screen.getByText(data.description)).toBeInTheDocument();
    });

  });

  test("saves a new reminder", async () => {

  });

  test("delete a reminder reminder", async () => {

  });
});
