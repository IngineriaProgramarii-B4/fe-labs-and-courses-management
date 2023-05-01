import React from "react";
import "@testing-library/jest-dom";
import { Button } from "antd";
import { fireEvent, render, screen } from "@testing-library/react";
import AddReminderModal, {ModalFooter} from "./AddReminderModal";

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
   test("should render due date field", () => {
    render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => null} />);
    const expected = screen.getByText(/Due date/i);
    expect(expected).toBeInTheDocument();
  });
});

const noop = () => {};

describe("ModalFooter", () => {
  test("should render properly when in edit mode", () => {
    render(
      <ModalFooter
        saveNewReminder={noop}
        onCancel={noop}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    const saveButton = screen.getByText("Add");

    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  test("should call saveNewReminder when save button is clicked", () => {
    const mockedOnSave = jest.fn();
    render(
      <ModalFooter
      saveNewReminder={mockedOnSave}
      onCancel={noop}
      />
    );
  
    const saveButton = screen.getByText("Add");
    fireEvent.click(saveButton);
  
    expect(mockedOnSave).toHaveBeenCalledTimes(1);
  });
  
  test("should call onCancel when save button is clicked", () => {
    const mockedOnCancel = jest.fn();
    render(
      <ModalFooter
      saveNewReminder={noop}
      onCancel={mockedOnCancel}
      />
    );
  
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
  
    expect(mockedOnCancel).toHaveBeenCalledTimes(1);
  });
});

// describe("AddReminderModal", () => {
//   test("should render properly when in edit mode", () => {
//     render(
//       <AddReminderModal
//         isModalAddReminderOpen={false}
//         setIsModalAddReminderOpen={noop}
//       />
//     );

//     const title = screen.getByText("Title");
//     const description = screen.getByText("Description");
//     const dueDate = screen.getByText("Due date");

//     expect(title).toBeInTheDocument();
//     expect(description).toBeInTheDocument();
//     expect(dueDate).toBeInTheDocument();
//   });

// });




