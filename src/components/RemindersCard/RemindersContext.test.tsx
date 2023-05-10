import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Button, Card, DatePicker, Form, Input, Divider } from "antd";
import RemindersContextProvider, { RemindersContext, ReminderDataProps } from "./RemindersContext";

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

// TODO : test the methods that are in RemindersContext.tsx
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

  test('should render the component without errors', () => {
    render(
      <RemindersContext.Provider value={{}}>
          <div>Test</div>
      </RemindersContext.Provider>
    );
  });

});

//pica
test("should render properly", () => {
  render(
    <RemindersContextProvider>
          <div></div>
    </RemindersContextProvider>);
  mockedRemindersData.forEach((data) => {
    expect(screen.getByText(data.id)).toBeInTheDocument();
    expect(screen.getByText(data.dueDateTime)).toBeInTheDocument();
    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByText(data.description)).toBeInTheDocument();
   });
});

//pica
test('renders with initial state', () => {
  const { getByTestId } = render(<RemindersContextProvider>
    <></>
  </RemindersContextProvider>);
  const titleInput = getByTestId('title-input');
  const descriptionInput = getByTestId('description-input');
  const dateInput = getByTestId('date-input');
  const remindersList = getByTestId('reminders-list');

  expect(titleInput).toHaveValue('');
  expect(descriptionInput).toHaveValue('');
  expect(dateInput).toHaveValue('');
  expect(remindersList).toBeEmptyDOMElement();
});

// import axios from 'axios';

// test('fetches reminders from server and sets state', async () => {
//   // Mock the response data from the server
//   const mockReminders = [{ id: 1, title: 'Test reminder', description: 'This is a test reminder' }];
//   jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockReminders });

//   const setReminders = jest.fn();
//   await fetchReminders(setReminders);

//   // Verify that the setReminders function was called with the mock reminders
//   expect(setReminders).toHaveBeenCalledWith(mockReminders);
// });

// import axios from "axios";
// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// it("should submit the form data when the add button is clicked", async () => {

//   render(<RemindersContextProvider> <></></RemindersContextProvider>);
//   const addButton = screen.getByRole("button", { name: "+" });
//   fireEvent.click(addButton);
//   await waitFor(() =>
//     expect(mockedAxios.get).toHaveBeenCalledWith(
//       "http://localhost:8090/api/v1",
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//   );
// });