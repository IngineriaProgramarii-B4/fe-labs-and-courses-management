import React, { createContext } from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import RemindersContextProvider, { ReminderDataProps } from "./RemindersContext";
import RemindersCard, { RemindersCardBody } from "./RemindersCard";
import axios, { AxiosInstance } from "axios";
import { Button, Modal } from "antd";

const mockedRemindersData: ReminderDataProps[] = [
  {
    id: "dfsf123gddfg",
    dueDateTime: "01.06.2023",
    title: "Task 1",
    description: "Finish a book"
  }
];

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Use actual for all non-hook parts
  useNavigate: jest.fn()
}));

describe("RemindersCardBody", () => {
  const axiosInstanceMock = axios as jest.Mocked<typeof axios>;
  let axiosInstance: jest.Mocked<AxiosInstance>;

  function createMockedAxiosInstance(): jest.Mocked<AxiosInstance> {
    const instance = axios.create();
    return {
      ...instance,
      get: jest.fn(),
      put: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn()
    } as unknown as jest.Mocked<AxiosInstance>;
  }

  beforeEach(() => {
    axiosInstance = createMockedAxiosInstance();
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  test("should render the titles and the descriptions of the reminders", () => {
    render(<RemindersCardBody reminders={mockedRemindersData} />);
    expect(screen.getByText("Your Reminders")).toBeInTheDocument();
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Finish a book/i)).toBeInTheDocument();
  });

  test("should render information regarding reminders properly", () => {
    render(<RemindersCardBody reminders={mockedRemindersData} />);
    mockedRemindersData.forEach((data) => {
      expect(screen.getByText(data.dueDateTime)).toBeInTheDocument();
      expect(screen.getByText(data.title)).toBeInTheDocument();
      expect(screen.getByText(data.description)).toBeInTheDocument();
      expect(screen.getByRole("separator")).toBeInTheDocument();
    });
  });

  test("opens add reminder modal", () => {
    render(<RemindersCardBody reminders={mockedRemindersData} />);
    const addButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(addButton);
    expect(screen.getByRole("dialog", { name: /Add Reminder?/i })).toBeInTheDocument();
  });

  test("add reminder", () => {
    render(<RemindersCardBody reminders={mockedRemindersData} />);
    const addButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(addButton);
    expect(screen.getByRole("dialog", { name: /Add Reminder?/i })).toBeInTheDocument();
  });

  test("delete reminder function", async () => {
    const mockDeleteReminder = jest.fn();
    render(
      <Modal
        centered={true}
        title="Are you sure you want to delete this reminder?"
        open={true}
        onCancel={() => {
        }}
        destroyOnClose={true}
        footer={
          <Button
            onClick={() => {
              mockDeleteReminder();
            }}
          >
            Ok
          </Button>
        }
      />
    );
    const deleteConfirmationModal = screen.getByRole("dialog", { name: /Are you sure you want to delete this reminder?/i });
    expect(deleteConfirmationModal).toBeInTheDocument();

    const deleteReminderBtn = screen.getAllByRole("button")[1];
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(deleteReminderBtn);
    });
    // expect(mockDeleteReminder).toHaveBeenCalled();
  });

  test("delete reminder axios", async () => {
    axiosInstance.delete.mockResolvedValue({
      data: mockedRemindersData[0].id,
      status: 204,
      statusText: "NO CONTENT",
      config: {},
      headers: {}
    });
    axiosInstance.post.mockResolvedValue({
      status: 200,
      data: {username: "Petrica Cercel"},
    });
    axiosInstance.get.mockResolvedValue({
      status: 200,
      data: {},
    });
    render(
      <RemindersContextProvider>
        <RemindersCardBody reminders={mockedRemindersData} />
      </RemindersContextProvider>
    );

    const deleteIcon = screen.getByTestId("delete-reminder-icon");
    await act(async () => {
      fireEvent.click(deleteIcon);
    });

    const deleteBtn = screen.getByTestId("delete-reminder-btn");
    await act(async () => {
      fireEvent.click(deleteBtn);
    });
    await waitFor(() => expect(axiosInstance.delete).toHaveBeenCalled());
  });

});

describe("RemindersCard", () => {
  // test("should render all the reminders", () => {
  //   render(
  //     <RemindersContextProvider>
  //       <RemindersCard />
  //     </RemindersContextProvider>
  //   );
  // });
});
