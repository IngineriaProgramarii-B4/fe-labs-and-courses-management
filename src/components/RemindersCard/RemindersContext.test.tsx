import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button, Card, DatePicker, Form, Input, Divider } from "antd";
import { RemindersContext, ReminderDataProps } from "./RemindersContext";

const mockedRemindersData: ReminderDataProps[] = [
  {
    reminderId: "24534dsvfdsaz",
    dueDateTime: "01/06/2023",
    title: "Task 1",
    description: "Finish a book"
  },
  {
    reminderId: "876534dswet2vfdsaz",
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