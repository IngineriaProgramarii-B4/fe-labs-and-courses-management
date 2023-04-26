import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AddReminder from "./AddReminder";
import { RemindersContext } from "./RemindersContext";
import { ModalFooter } from "../UserInfoModal/UserInfoModal";
import React from "react";

describe("AddReminder", () => {

  test("should render title field", () => {
    render(<AddReminder />);
    const expected = screen.getByText(/Title/i);
    expect(expected).toBeInTheDocument();
  });
  test("should render description field", () => {
    render(<AddReminder />);
    const expected = screen.getByText(/Description/i);
    expect(expected).toBeInTheDocument();
  });
  test("should render due date field", () => {
    render(<AddReminder />);
    const expected = screen.getByText(/Due date/i);
    expect(expected).toBeInTheDocument();
  });
});