import React from "react";
import "@testing-library/jest-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fireEvent, render, screen } from "@testing-library/react";
import ReminderItem from "./ReminderItem";
import { Button, Modal } from "antd";

describe("ReminderItem", () => {
    const mockDeleteReminder = jest.fn();
  
    const reminderInfo = {
      id: 1,
      title: "Test reminder",
      description: "Test description",
      dueDateTime: "2023-05-10T10:00",
    };
  
    it("renders the title and description", () => {
      render(<ReminderItem         
        dueDateTime={reminderInfo.dueDateTime}
        title={reminderInfo.title}
        description={reminderInfo.description}
        id={reminderInfo.id} 
        deleteReminder={mockDeleteReminder} />);
        
      expect(screen.getByText("Test reminder")).toBeInTheDocument();
      expect(screen.getByText("description:")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
    });
  
    it("renders the due date", () => {
      render(<ReminderItem 
        dueDateTime={reminderInfo.dueDateTime}
        title={reminderInfo.title}
        description={reminderInfo.description}
        id={reminderInfo.id} 
        deleteReminder={mockDeleteReminder} />);
      expect(screen.getByText("due date:")).toBeInTheDocument();
      expect(screen.getByText("2023-05-10T10:00")).toBeInTheDocument();
    });
  
});

describe("ReminderItem", () => {
  const mockDeleteReminder = jest.fn();

  const reminderInfo = {
    id: 1,
    title: "Test reminder",
    description: "Test description",
    dueDateTime: "2023-05-10T10:00",
  };



test('renders delete reminder button', () => {
  render(<ReminderItem         
    dueDateTime={reminderInfo.dueDateTime}
    title={reminderInfo.title}
    description={reminderInfo.description}
    id={reminderInfo.id} 
    deleteReminder={mockDeleteReminder} />);
  const deleteReminderButton = screen.getByRole('button', { name: /delete reminder/i });
  expect(deleteReminderButton).toBeInTheDocument();
});

// test('clicking delete reminder button opens delete confirmation modal', () => {
//   render(<ReminderItem />);
//   const deleteReminderButton = screen.getByRole('button', { name: /delete reminder/i });
//   fireEvent.click(deleteReminderButton);
//   const deleteConfirmationModal = screen.getByRole('dialog', { name: /are you sure you want to delete this reminder/i });
//   expect(deleteConfirmationModal).toBeInTheDocument();
// });

// test('clicking cancel button in delete confirmation modal closes modal', () => {
//   render(<ReminderItem />);
//   const deleteReminderButton = screen.getByRole('button', { name: /delete reminder/i });
//   fireEvent.click(deleteReminderButton);
//   const cancelButton = screen.getByRole('button', { name: /cancel/i });
//   fireEvent.click(cancelButton);
//   const deleteConfirmationModal = screen.queryByRole('dialog', { name: /are you sure you want to delete this reminder/i });
//   expect(deleteConfirmationModal).not.toBeInTheDocument();
// });
});


test("display description and due date", () => {
  const reminder = {
    id: 1,
    title: "Test Reminder",
    description: "This is a test reminder.",
    dueDateTime: "2023-05-31T18:00",
  };
  const deleteReminder = jest.fn();
  render(<ReminderItem {...reminder} deleteReminder={deleteReminder} />);

  expect(screen.getByRole("heading", { name: "Test Reminder" })).toBeInTheDocument();
  expect(screen.getByText("description:")).toBeInTheDocument();
  expect(screen.getByText("This is a test reminder.")).toBeInTheDocument();
  expect(screen.getByText("due date:")).toBeInTheDocument();
  expect(screen.getByText("2023-05-31T18:00")).toBeInTheDocument();

  // Test delete reminder
  fireEvent.click(screen.getByTestId("delete-reminder"));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Delete"));
  expect(deleteReminder).toHaveBeenCalled();
});