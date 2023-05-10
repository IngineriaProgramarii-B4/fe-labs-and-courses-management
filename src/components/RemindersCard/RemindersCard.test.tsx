import React, { createContext } from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RemindersContextProvider, { ReminderDataProps } from "./RemindersContext";
import RemindersCard, { RemindersCardBody } from "./RemindersCard";
import axios, { AxiosInstance } from "axios";

const mockedRemindersData: ReminderDataProps[] = [
  {
    id: "dfsf123gddfg",
    dueDateTime: "01.06.2023",
    title: "Task 1",
    description: "Finish a book"
  }
];

describe("RemindersCardBody", () => {
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
    });
  });

  test("opens add reminder modal", () => {
    render(<RemindersCardBody reminders={mockedRemindersData} />);
    const addButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(addButton);
    expect(screen.getByRole("dialog",  { name: /Add Reminder?/i })).toBeInTheDocument();
  });
});

describe("RemindersCard", () => {
  test("should render all the reminders", () => {

  })
})
