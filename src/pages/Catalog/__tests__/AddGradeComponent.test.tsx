import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AddGrade from "../components/AddGrade";

jest.mock("axios");

describe("AddGrade", () => {
  const fetchGradesMock = jest.fn();
  const enrolledCoursesMock = [
    { label: "Course 1", value: "course1" },
    { label: "Course 2", value: "course2" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Add Grade button", () => {
    render(
      <AddGrade
        fetchGrades={fetchGradesMock}
        enrolledCourses={enrolledCoursesMock}
      />
    );

    const addButton = screen.getByText("Add Grade +");
    expect(addButton).toBeInTheDocument();
  });

  test("opens the modal when Add Grade button is clicked", () => {
    render(
      <AddGrade
        fetchGrades={fetchGradesMock}
        enrolledCourses={enrolledCoursesMock}
      />
    );

    const addButton = screen.getByText("Add Grade +");
    fireEvent.click(addButton);

    const modalTitle = screen.getByText("Add Grade");
    expect(modalTitle).toBeInTheDocument();
  });

  test("closes the modal when cancel button is clicked", () => {
    render(
      <AddGrade
        fetchGrades={fetchGradesMock}
        enrolledCourses={enrolledCoursesMock}
      />
    );

    const addButton = screen.getByText("Add Grade +");
    fireEvent.click(addButton);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    const modalTitle = screen.queryByText("Add Grade");
    expect(modalTitle).not.toBeInTheDocument();
  });

  test("adds a new grade when Add button is clicked", async () => {
    render(
      <AddGrade
        fetchGrades={fetchGradesMock}
        enrolledCourses={enrolledCoursesMock}
      />
    );

    const addButton = screen.getByText("Add Grade +");
    fireEvent.click(addButton);

    const subjectSelect = screen.getByLabelText("Subject");
    fireEvent.change(subjectSelect, { target: { value: "course1" } });

    const gradeInput = screen.getByLabelText("Grade");
    fireEvent.change(gradeInput, { target: { value: 9 } });

    const dateInput = screen.getByLabelText("Date");
    fireEvent.change(dateInput, { target: { value: "05.24.2023" } });

    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce({
      data: { id: 1, value: 9, subject: "course1" },
    });

    const addGradeButton = screen.getByText("Add");
    fireEvent.click(addGradeButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8082/api/v1/students/:id/grades",
        {
          value: 9,
          subject: "IP",
          evaluationDate: "05.02.2023",
          deleted: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer null",
          },
        }
      );
    });
    const modalTitle = screen.queryByText("Add Grade");
    await waitFor(() => {
      expect(modalTitle).not.toBeInTheDocument();
    });
  });
});
