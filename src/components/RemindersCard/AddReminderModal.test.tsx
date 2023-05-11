import React from "react";
import "@testing-library/jest-dom";
import { Button, Form, DatePicker, ConfigProvider, Input } from "antd";
import { act, fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import AddReminderModal, { ModalFooter } from "./AddReminderModal";
import ReminderItem from "./ReminderItem";
import RemindersContextProvider from "./RemindersContext";

const noop = () => {
};

describe("AddReminderModal", () => {
  test("should render modal title, description field and due date field", () => {
    render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => null} />);
    const modalTitle = screen.getByText(/Add Reminder/i);
    const titleField = screen.getByText(/Title/i);
    const descriptionField = screen.getByText(/Description/i);
    const dueDateField = screen.getByText(/Due date/i);
    expect(titleField).toBeInTheDocument();
    expect(modalTitle).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(dueDateField).toBeInTheDocument();
  });

  test("changing the value in an input will fire onChange method", async () => {
    render(<RemindersContextProvider>
        <AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => null} />
      </RemindersContextProvider>
    );

    const editTitle = screen.getByTestId("edit-title");
    expect(editTitle).toBeInTheDocument();
    fireEvent.change(editTitle, { target: { value: "New Value" } });
    // @ts-ignore
    expect(editTitle.value).toBe("New Value");

    const editDesc = screen.getByTestId("edit-desc");
    expect(editDesc).toBeInTheDocument();
    fireEvent.change(editDesc, { target: { value: "New Value" } });
    // @ts-ignore
    expect(editDesc.value).toBe("New Value");

    // const svgElement = screen.getByLabelText('calendar');
    //
    // await act(async () => {
    //   fireEvent.click(svgElement)
    // });
    //
    // screen.debug();


    // (screen.getByTestId("edit-date")).toHaveTextContent("18.05.2023 00:05");
  });


  test("close the modal when clicking the x button", async() => {
    render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => null} />);

    const addReminderModal = screen.getByRole("dialog");
    expect(addReminderModal).toBeInTheDocument();
    // @ts-ignore
    const closeModalButton = screen.getAllByRole("button")[0];
    fireEvent.click(closeModalButton);
    expect(screen.getAllByRole("generic")[0]).toBeEmpty()
  });

  test('renders the DatePicker component', () => {
        render(
      <AddReminderModal
        isModalAddReminderOpen={false}
        setIsModalAddReminderOpen={noop}
      />)
    const { getByLabelText } = render(
      <Form>
        <Form.Item
          label="Due date"
          name="date"
          rules={[{ required: false, message: "Select a date!" }]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByLabelText('Due date')).toBeInTheDocument();
  });


  test("should call onCancel when cancel button is clicked", () => {
    const mockedReminderOpen = jest.fn();
    render(
      <AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={mockedReminderOpen}/>
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockedReminderOpen).toHaveBeenCalled();
  });

});

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

  test("should call onCancel when cancel button is clicked", () => {
    const mockedOnCancel = jest.fn();
    render(
      <ModalFooter
        saveNewReminder={noop}
        onCancel={mockedOnCancel}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockedOnCancel).toHaveBeenCalled();
  });
});



