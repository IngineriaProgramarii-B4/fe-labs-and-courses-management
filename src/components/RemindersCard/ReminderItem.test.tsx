import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ReminderItem from "./ReminderItem";

describe("ReminderItem", () => {
  const mockDeleteReminder = jest.fn();

  const reminderInfo = {
    id: 1,
    title: "Test reminder",
    description: "Test description",
    dueDateTime: "2023-05-10T10:00"
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

  test("renders delete reminder button", () => {
    render(<ReminderItem
      dueDateTime={reminderInfo.dueDateTime}
      title={reminderInfo.title}
      description={reminderInfo.description}
      id={reminderInfo.id}
      deleteReminder={mockDeleteReminder} />);
    const deleteReminderButton = screen.getByTestId("delete-reminder-icon");
    expect(deleteReminderButton).toBeInTheDocument();
  });

test('clicking delete reminder button opens delete confirmation modal', () => {
  render(<ReminderItem />);
  const deleteReminderButton = screen.getByTestId("delete-reminder-icon");
  fireEvent.click(deleteReminderButton);
  const deleteConfirmationModal = screen.getByRole('dialog', { name: /Are you sure you want to delete this reminder?/i });
  expect(deleteConfirmationModal).toBeInTheDocument();
});

test('clicking cancel button in delete confirmation modal closes modal', () => {
  render(<ReminderItem />);
  const deleteReminderButton = screen.getByTestId("delete-reminder-icon");
  fireEvent.click(deleteReminderButton);
  const cancelButton = screen.getByTestId("cancel-delete-icon");
  fireEvent.click(cancelButton);
  const deleteConfirmationModal = screen.queryByRole('dialog', { name: /are you sure you want to delete this reminder/i });
  expect(deleteConfirmationModal).not.toBeInTheDocument();
});


  test('clicking pencil icon will make the description editable', () => {
    render(<ReminderItem />);
    const editDescriptionIcon = screen.getByTestId("edit-description-icon");
    fireEvent.click(editDescriptionIcon);
    const editDescriptionInput = screen.getByTestId("edit-desc-input");
    expect(editDescriptionInput).toBeInTheDocument();
  });

  test('clicking pencil icon will make the due date editable', () => {
    render(<ReminderItem />);
    const editDateIcon = screen.getByTestId("edit-date-icon");
    fireEvent.click(editDateIcon);
    const editDateInput = screen.getByTestId("edit-date-input");
    expect(editDateInput).toBeInTheDocument();
  });


  test('changing the value in an input will fire onChange method in description editable', () => {
    render(<ReminderItem />);
    const editDescriptionIcon = screen.getByTestId("edit-description-icon");
    fireEvent.click(editDescriptionIcon);
    const editDescInput = screen.getByTestId("edit-desc-input");
    expect(editDescInput).toBeInTheDocument();

    fireEvent.change(editDescInput, { target: { value: 'New Value' } });
    // @ts-ignore
    expect(editDescInput.value).toBe('New Value');
  });

  test('changing the value in an input will fire onChange method in date editable', () => {
    render(<ReminderItem />);
    const editDateIcon = screen.getByTestId("edit-date-icon");
    fireEvent.click(editDateIcon);
    const editDateInput = screen.getByTestId("edit-date-input");
    expect(editDateInput).toBeInTheDocument();

    fireEvent.change(editDateInput, { target: { value: 'New Value' } });
    // @ts-ignore
    expect(editDateInput.value).toBe('New Value');
  });

  test('close the delete modal when clicking the x button', () => {
    render(<ReminderItem />);
    const deleteReminderButton = screen.getByTestId("delete-reminder-icon");
    fireEvent.click(deleteReminderButton);
    const deleteConfirmationModal = screen.getByRole('dialog', { name: /Are you sure you want to delete this reminder?/i });
    expect(deleteConfirmationModal).toBeInTheDocument();

    const closeModalButton = screen.getByRole("img");
    fireEvent.click(closeModalButton)
    expect(deleteConfirmationModal).not.toBeInTheDocument();
  });


  test("display description and due date", () => {
    const reminder = {
      id: 1,
      title: "Test Reminder",
      description: "This is a test reminder.",
      dueDateTime: "2023-05-31T18:00"
    };
    const deleteReminder = jest.fn();
    render(<ReminderItem {...reminder} deleteReminder={deleteReminder} />);

    expect(screen.getByRole("heading", { name: "Test Reminder" })).toBeInTheDocument();
    expect(screen.getByText("description:")).toBeInTheDocument();
    expect(screen.getByText("This is a test reminder.")).toBeInTheDocument();
    expect(screen.getByText("due date:")).toBeInTheDocument();
    expect(screen.getByText("2023-05-31T18:00")).toBeInTheDocument();

    // Test delete reminder
    fireEvent.click(screen.getByTestId("delete-reminder-icon"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Ok"));
    expect(deleteReminder).toHaveBeenCalled();
  });
});