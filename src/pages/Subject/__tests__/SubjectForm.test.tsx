import { render, screen, fireEvent } from "@testing-library/react";
import SubjectForm from "../SubjectForm";

describe("SubjectForm", () => {
  it("should render the form correctly", () => {
    const props = {
      action: "add",
      title: "",
      setTitle: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      year: 1,
      setYear: jest.fn(),
      semester: 1,
      setSemester: jest.fn(),
      credits: 1,
      setCredits: jest.fn(),
      resetFields: false,
      upFile: null,
      setUpFile: jest.fn(),
      fileList: [],
      setFileList: jest.fn(),
    };

    render(<SubjectForm {...props} />);

    // Assert the presence of form elements
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Year")).toBeInTheDocument();
    expect(screen.getByLabelText("Semester")).toBeInTheDocument();
    expect(screen.getByLabelText("Number of credits")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("should trigger onChange handlers correctly", () => {
    const props = {
      action: "add",
      title: "",
      setTitle: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      year: 1,
      setYear: jest.fn(),
      semester: 1,
      setSemester: jest.fn(),
      credits: 1,
      setCredits: jest.fn(),
      resetFields: false,
      upFile: null,
      setUpFile: jest.fn(),
      fileList: [],
      setFileList: jest.fn(),
    };

    render(<SubjectForm {...props} />);

    // Trigger onChange event for input fields
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Sample Title" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Sample Description" },
    });

    // Assert that the respective onChange handlers were called with the correct values
    expect(props.setTitle).toHaveBeenCalledWith("Sample Title");
    expect(props.setDescription).toHaveBeenCalledWith("Sample Description");

    // Trigger onChange event for Select fields
    fireEvent.change(screen.getByLabelText("Year"), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText("Semester"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText("Number of credits"), {
      target: { value: "3" },
    });

    // Assert that the respective onChange handlers were called with the correct values
    // expect(props.setYear).toHaveBeenCalledWith("2");
    // expect(props.setSemester).toHaveBeenCalledWith("2");
    // expect(props.setCredits).toHaveBeenCalledWith("3");
  });

  // it("should render select options correctly", () => {
  //   const props = {
  //     action: "add",
  //     title: "",
  //     setTitle: jest.fn(),
  //     description: "",
  //     setDescription: jest.fn(),
  //     year: 1,
  //     setYear: jest.fn(),
  //     semester: 1,
  //     setSemester: jest.fn(),
  //     credits: 1,
  //     setCredits: jest.fn(),
  //     resetFields: false,
  //     upFile: null,
  //     setUpFile: jest.fn(),
  //     fileList: [],
  //     setFileList: jest.fn(),
  //   };
  
  //   render(<SubjectForm {...props} />);
  
  //   // Trigger onChange event for input fields
  //   fireEvent.change(screen.getByLabelText("Title"), {
  //     target: { value: "Sample Title" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Description"), {
  //     target: { value: "Sample Description" },
  //   });
  
  //   // Assert that the respective onChange handlers were called with the correct values
  //   expect(props.setTitle).toHaveBeenCalledWith("Sample Title");
  //   expect(props.setDescription).toHaveBeenCalledWith("Sample Description");
  
  //   // Trigger onChange event for Select fields
  //   const yearSelect = screen.getByLabelText("Year");
  //   fireEvent.mouseDown(yearSelect);
  //   const yearOptions = screen.getAllByRole("option");
  //   fireEvent.click(yearOptions[1]); // Select the second option (value: "2")
  //   //expect(props.setYear).toHaveBeenCalledWith(2);
  
  //   const semesterSelect = screen.getByLabelText("Semester");
  //   fireEvent.mouseDown(semesterSelect);
  //   const semesterOptions = screen.getAllByRole("option");
  //   fireEvent.click(semesterOptions[1]); // Select the second option (value: "2")
  //   //expect(props.setSemester).toHaveBeenCalledWith(2);
  
  //   const creditsSelect = screen.getByLabelText("Number of credits");
  //   fireEvent.mouseDown(creditsSelect);
  //   const creditsOptions = screen.getAllByRole("option");
  //   fireEvent.click(creditsOptions[2]); // Select the third option (value: "3")
  //   //expect(props.setCredits).toHaveBeenCalledWith(3);
  // });
  
});