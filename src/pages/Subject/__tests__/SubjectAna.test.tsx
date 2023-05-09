import React from "react";
import { render, screen, fireEvent, waitFor, getByTestId } from "@testing-library/react";
import SubjectAna from "../SubjectAna";
//import { Course, MyVerticallyCenteredModal } from "../SubjectAna";
import { BrowserRouter as Router } from "react-router-dom";
import Course from "../Course";
import MyVerticallyCenteredModal from "../MyVerticallyCenteredModal";

describe("SubjectAna component", () => {
  // titlu cursului este afisat corect
  test("renders course title", () => {
    const title = "Test Course Title";
    const description = "Test Course Description";
    render(
      <Course
        title={title}
        description={description}
        modalShow={false}
        setModalShow={() => {}}
        setDescription={() => {}}
        subject={{}}
      />
    );
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  // imaginea este afisata din sursa corecta
  test("write src picture", async () => {
    render(
      <Router>
        <SubjectAna />
      </Router>
    );
    const image = screen.getByTestId("image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://profs.info.uaic.ro/~adiftene/Scoala/2022/IP/Img/Amazon_Learn_and_Earn.jpg"
    );
  });

  // butonul "view full description" deschide modalul

  test("clicking 'View Full Description' shows the modal", async () => {
    const title = "Test Course Title";
    const description = "Test Course Description";
    const setModalShow = jest.fn();

    render(
      <Course
        title={title}
        description={description}
        modalShow={false}
        setModalShow={setModalShow}
        setDescription={() => {}}
        subject={{}}
      />
    );
    const button = screen.getByText("View Full Description");
    fireEvent.click(button);
    expect(setModalShow).toHaveBeenCalledWith(true);
  });

  // modalul este afisat pe ecran

  // test("Modal opening", async () => {
  //   render(
  //     <Router>
  //       <SubjectAna />
  //     </Router>
  //   );
  //   const moreDescription = screen.getByTestId("more description");

  //   fireEvent.click(moreDescription);

  //   const modal = screen.getByTestId("course-modal");
  //   expect(modal).toBeInTheDocument();
  // });

  // butoanele modalului: edit, close

  // const mockSetModalShow = jest.fn();
  // const mockSetDescription = jest.fn();
  // const mockSubject = {
  //   title: "Mathematics",
  //   description: "This is a mathematics course",
  // };
  // const defaultProps = {
  //   title: "Course Title",
  //   description: "",
  //   modalShow: true,
  //   setModalShow: mockSetModalShow,
  //   setDescription: mockSetDescription,
  //   subject: mockSubject,
  //   isModified: false,
  //   setIsModified: jest.fn(),
  // };

  // test("should render the modal with edit and close buttons", async () => {
  //   render(<MyVerticallyCenteredModal {...defaultProps} />);

  //   expect(screen.getByRole("dialog")).toBeInTheDocument();
  //   expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
  //   expect(screen.getByTestId("close-modal")).toBeInTheDocument();
  // });

  // test("should show the edit textarea when Edit button is clicked", async () => {
  //   render(<MyVerticallyCenteredModal {...defaultProps} />);

  //   fireEvent.click(screen.getByTestId("edit-modal"));
  //   //expect(screen.getByRole("textbox")).toBeInTheDocument();
  //   expect(screen.getByTestId("input-description")).toBeInTheDocument();
  // });

  // test("should set a new description when Save button is clicked and close the modal when Close button is clicked", async () => {
  //   render(<MyVerticallyCenteredModal {...defaultProps} />);

  //   fireEvent.click(screen.getByTestId("edit-modal"));

  //   const descriptionInput = screen.getByTestId("input-description");
    
  //   fireEvent.change(descriptionInput, {
  //     target: { value: "New description" },
  //   });

  //   fireEvent.click(screen.getByTestId("save-modal"));
  //   //expect(mockSetDescription).toHaveBeenCalledWith("New description");
  //   expect(mockSubject.description).toBe("New description");

  //   //expect(screen.getByTestId("close-modal")).toBeInTheDocument();

  //   // fireEvent.click(screen.getByTestId("close-modal"));
  //   // expect(mockSetModalShow).toHaveBeenCalledWith(false);
  // });
});
