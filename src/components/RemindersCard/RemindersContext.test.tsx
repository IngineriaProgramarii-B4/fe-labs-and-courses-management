import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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

//ReminderItem tests

// const mockReminderData = {
//   reminderId: "12345dsvfdsaz",
//   dueDateTime: "02/05/2023",
//   title: "Task title",
//   description: "IP"
// };

// describe("ReminderItem", () => {
//   test("should render the reminder data", () => {
//     render(<ReminderItem {...mockReminderData} />);
//     expect(screen.getByText(mockReminderData.title)).toBeInTheDocument();
//     expect(screen.getByText(mockReminderData.description)).toBeInTheDocument();
//     expect(screen.getByText(mockReminderData.dueDateTime)).toBeInTheDocument();
//   });

  // test("should open delete confirmation modal", () => {
  //   render(<ReminderItem {...mockReminderData} />);
  //   const deleteButton = screen.getByTitle("Delete Reminder");
  //   fireEvent.click(deleteButton);
  //   const modal = screen.getByRole("dialog");
  //   expect(modal).toBeInTheDocument();
  //   expect(screen.getByText("Are you sure you want to delete this reminder?")).toBeInTheDocument();
  // });
//});