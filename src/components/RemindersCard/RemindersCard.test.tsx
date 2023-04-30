import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ReminderDataProps } from "./RemindersContext";
import RemindersCard, { RemindersCardBody } from "./RemindersCard";

const mockedRemindersData: ReminderDataProps[] = [
  {
    reminderId: "dfsf123gddfg",
    dueDateTime: "01/06/2023",
    title: "Task 1",
    description: "Finish a book"
  },
  {
    reminderId: "dfssfdgdf345fbcxz",
    dueDateTime: "01/05/2023",
    title: "Task 2",
    description: "Feed Linux"
  }
];
describe("RemindersCardBody", () => {
  test("should render the titles of the reminders", () => {
    render(<RemindersCardBody reminders={mockedRemindersData} />);
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
  });
  test("should render the descriptions of the reminders", () => {
    render(<RemindersCardBody reminders={mockedRemindersData} />);
    expect(screen.getByText(/Finish a book/i)).toBeInTheDocument();
    expect(screen.getByText(/Feed Linux/i)).toBeInTheDocument();
  });
});

