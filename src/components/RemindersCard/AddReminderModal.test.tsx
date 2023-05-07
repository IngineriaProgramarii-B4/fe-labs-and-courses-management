import React from "react";
import "@testing-library/jest-dom";
import { Button, Form, DatePicker, ConfigProvider, Input } from "antd";
import { fireEvent, render, screen } from "@testing-library/react";
import AddReminderModal, {ModalFooter} from "./AddReminderModal";
import RemindersContext from "./RemindersContext";

const noop = () => {};

describe("AddReminderModal", () => {
    test("should render modal title, description field and due date field", () => {
    render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => null} />);
    const modalTitle = screen.getByText(/Add Reminder/i);
    const descriptionField = screen.getByText(/Description/i);
    const dueDateField = screen.getByText(/Due date/i);
    expect(modalTitle).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(dueDateField).toBeInTheDocument();
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

describe("AddReminderModal descriptions", () => {
  it('should display inputs for title, description and datepicker', () => {
    const { getByLabelText } = render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => {}} />);
    expect(getByLabelText('Title')).toBeInTheDocument();
    expect(getByLabelText('Description')).toBeInTheDocument();
    expect(getByLabelText('Due date')).toBeInTheDocument();
  });

  it('should allow user to enter input values', () => {
    const { getByLabelText } = render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => {}} />);
    const titleInput = getByLabelText('Title') as HTMLInputElement;
    const descriptionInput = getByLabelText('Description') as HTMLInputElement;
    const datepickerInput = getByLabelText('Due date') as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(datepickerInput, { target: { value: '05.05.2023 12:00' } });

    expect(titleInput.value).toBe('Test Title');
    expect(descriptionInput.value).toBe('Test Description');
    expect(datepickerInput.value).toBe('05.05.2023 12:00');
  });

  // test('renders the DatePicker component', () => {
  //   const mockSetIsModalAddReminderOpen = jest.fn();
  //   const { getByLabelText } = render(
  //     <AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={mockSetIsModalAddReminderOpen} />
  //   );
  //   const datePicker = getByLabelText('Due date');
  //   expect(datePicker).toBeInTheDocument();
  // });

  // test('renders the DatePicker component', () => {
  //       render(
  //     <AddReminderModal
  //       isModalAddReminderOpen={false}
  //       setIsModalAddReminderOpen={noop}
  //     />)
  //   const { getByLabelText } = render(
  //     <Form>
  //       <Form.Item
  //         label="Due date"
  //         name="date"
  //         rules={[{ required: false, message: "Select a date!" }]}
  //       >
  //         <DatePicker />
  //       </Form.Item>
  //     </Form>
  //   );
  
  //   expect(getByLabelText('Due date')).toBeInTheDocument();
  // });
});



describe("AddReminderModal cancel and add buttons", () => {
  test('renders the Add Reminder Modal', () => {
    render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => {}} />);
  
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => {}} />);
  });

  it("renders with title and description inputs", () => {
    const { getByLabelText } = render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={() => {}} />);

    const titleInput = getByLabelText("Title");
    const descriptionInput = getByLabelText("Description");

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  // it("calls saveNewReminder and onCancel when Add button is clicked", () => {
  //   const saveNewReminderMock = jest.fn();
  //   const setIsModalAddReminderOpenMock = jest.fn();
  //   const { getByText } = render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={setIsModalAddReminderOpenMock} />);

  //   const addButton = getByText("Add");
  //   fireEvent.click(addButton);

  //   expect(saveNewReminderMock).toHaveBeenCalled();
  //   expect(setIsModalAddReminderOpenMock).toHaveBeenCalledWith(false);
  // });

  it("calls onCancel when Cancel button is clicked", () => {
    const setIsModalAddReminderOpenMock = jest.fn();
    const { getByText } = render(<AddReminderModal isModalAddReminderOpen={true} setIsModalAddReminderOpen={setIsModalAddReminderOpenMock} />);

    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(setIsModalAddReminderOpenMock).toHaveBeenCalledWith(false);
  });

});



