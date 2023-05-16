import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MyVerticallyCenteredModal from "../MyVerticallyCenteredModal";
import SelectedSubject from "../SelectedSubject";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
jest.mock("axios");
afterEach(() => {
  jest.clearAllMocks();
});
describe("Modal that pops up and has a text area", () => {
  test("renders the modal", () => {
    render(
      <Router>
        <SelectedSubject />
      </Router>
    );
    const moreDescription = screen.getByTestId("more description");

    fireEvent.click(moreDescription);

    const modal = screen.getByTestId("course-modal");
    expect(modal).toBeInTheDocument();
  });

  const mockSetModalShow = jest.fn();
  const mockSetDescription = jest.fn();
  const mockSubject = {
    title: "Mathematics",
    description: "This is a mathematics course",
  };
  const defaultProps = {
    title: "Course Title",
    description: "",
    modalShow: true,
    setModalShow: mockSetModalShow,
    setDescription: mockSetDescription,
    subject: mockSubject,
    isModified: false,
    setIsModified: jest.fn(),
  };

  test("should render the modal with edit and close buttons", async () => {
    render(<MyVerticallyCenteredModal {...defaultProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
    expect(screen.getByTestId("close-modal")).toBeInTheDocument();
  });

  test("should show the edit textarea when Edit button is clicked", async () => {
    render(<MyVerticallyCenteredModal {...defaultProps} />);

    fireEvent.click(screen.getByTestId("edit-modal"));
    //expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByTestId("input-description")).toBeInTheDocument();
  });

  test("should set a new description when Save button is clicked and close the modal when Close button is clicked", async () => {
    render(<MyVerticallyCenteredModal {...defaultProps} />);

    fireEvent.click(screen.getByTestId("edit-modal"));

    const descriptionInput = screen.getByTestId("input-description");

    fireEvent.change(descriptionInput, {
      target: { value: "New description" },
    });

    fireEvent.click(screen.getByTestId("save-modal"));
    //expect(mockSetDescription).toHaveBeenCalledWith("New description");
    expect(mockSubject.description).toBe("New description");

    //expect(screen.getByTestId("close-modal")).toBeInTheDocument();

    // fireEvent.click(screen.getByTestId("close-modal"));
    // expect(mockSetModalShow).toHaveBeenCalledWith(false);
  });

  /******************************************************** */
  const mockProps = {
    title: "Test Title",
    description: "Test Description",
    modalShow: true,
    setModalShow: jest.fn(),
    setDescription: jest.fn(),
    subject: { title: "Test Title", description: "Test Description" },
    isModified: false,
    setIsModified: jest.fn(),
  };

  it("should render the modal correctly", () => {
    const { getByTestId } = render(
      <MyVerticallyCenteredModal {...mockProps} />
    );
    const modal = screen.getByTestId("course-modal");
    const closeButton = screen.getByTestId("close-modal");
    const editButton = screen.getByTestId("edit-modal");

    expect(modal).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });
  it("should allow the user to edit the description", () => {
    const { getByTestId } = render(
      <MyVerticallyCenteredModal {...mockProps} />
    );
    const editButton = screen.getByTestId("edit-modal");
    fireEvent.click(editButton);

    const inputDescription = screen.getByTestId("input-description");
    fireEvent.change(inputDescription, {
      target: { value: "New Description" },
    });

    const saveButton = screen.getByTestId("save-modal");
    fireEvent.click(saveButton);

    expect(mockProps.setDescription).toHaveBeenCalledWith("New Description");
    expect(mockProps.setIsModified).toHaveBeenCalledWith(true);
  });

  it("should handle errors when saving the description", async () => {
    (axios.put as jest.Mock).mockRejectedValueOnce(new Error("Failed to save"));

    const { getByTestId } = render(
      <MyVerticallyCenteredModal {...mockProps} />
    );
    const editButton = screen.getByTestId("edit-modal");
    fireEvent.click(editButton);

    const inputDescription = screen.getByTestId("input-description");
    fireEvent.change(inputDescription, {
      target: { value: "New Description" },
    });

    const saveButton = screen.getByTestId("save-modal");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockProps.setIsModified).not.toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockProps.setModalShow).toHaveBeenCalledWith(false);
    });
  });
});
