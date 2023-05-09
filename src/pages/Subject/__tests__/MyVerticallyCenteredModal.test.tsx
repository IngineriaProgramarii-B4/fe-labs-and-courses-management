import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import MyVerticallyCenteredModal from "../MyVerticallyCenteredModal";
import SubjectAna from "../SubjectAna";
import { BrowserRouter as Router } from "react-router-dom";

describe("Modal that pops up and has a text area", () => {
    test("renders the modal", () => {
        
        render(
            <Router>
              <SubjectAna />
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

});
