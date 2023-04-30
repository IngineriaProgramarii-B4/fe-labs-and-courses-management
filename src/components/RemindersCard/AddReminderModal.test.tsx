import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AddReminderModal from "./AddReminderModal";

describe("AddReminderModal", () => {

  test("should render the title of the Modal", () => {
    render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => null} />);
    const expected = screen.getByText(/Add Reminder/i);
    expect(expected).toBeInTheDocument();
  });
  test("should render the title field", () => {
    render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => null} />);
    const expected = screen.getByText(/Description/i);
    expect(expected).toBeInTheDocument();
  });
  test("should render the description field", () => {
    render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => null} />);
    const expected = screen.getByText(/Description/i);
    expect(expected).toBeInTheDocument();
  });
  test("should render due date field", () => {
    render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => null} />);
    const expected = screen.getByText(/Due date/i);
    expect(expected).toBeInTheDocument();
  });
});