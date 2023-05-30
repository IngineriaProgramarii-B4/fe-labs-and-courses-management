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
        taughtSubjects={enrolledCoursesMock}
      />
    );

    const addButton = screen.getByText("Add Grade +");
    expect(addButton).toBeInTheDocument();
  });

  test("opens the modal when Add Grade button is clicked", () => {
    render(
      <AddGrade
        fetchGrades={fetchGradesMock}
        taughtSubjects={enrolledCoursesMock}
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
        taughtSubjects={enrolledCoursesMock}
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
        taughtSubjects={enrolledCoursesMock}
      />
    );

    const addButton = screen.getByText("Add Grade +");
    fireEvent.click(addButton);

    const subjectSelect = screen.getByLabelText("Subject");
    expect(subjectSelect).toBeInTheDocument();
    // fireEvent.change(subjectSelect, { target: { value: "course1" } });

    const gradeInput = screen.getByLabelText("Grade");
    expect(gradeInput).toBeInTheDocument();
    fireEvent.change(gradeInput, { target: { value: 9 } });

    const dateInput = screen.getByLabelText("Date");
    expect(dateInput).toBeInTheDocument();
    fireEvent.change(dateInput, { target: { value: "05.24.2023" } });
  });
});
