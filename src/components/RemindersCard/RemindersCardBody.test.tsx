
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ReminderDataProps, RemindersCardBody} from "./RemindersCard";

const mockedRemindersData: ReminderDataProps[] = [
  {
    dueDateTime: "01/06/2023",
    title: "Task 1",
    description: "Finish a book"
  },
  {
    dueDateTime: "01/05/2023",
    title: "Task 2",
    description: "Feed Linux"
  }
];

describe("RemindersCardBody", () => {
  test("should render reminders title", () => {
    render(<RemindersCardBody reminders={mockedRemindersData} />)
    const cardTitle = screen.getByText(/Your reminders/i);
    expect(cardTitle).toBeInTheDocument();
  });

  test("should render the title of the reminder", () => {
    render(<RemindersCardBody reminders={mockedRemindersData} />)
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
  });
})

