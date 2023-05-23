import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import AddGrade from "../components/AddGrade";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AddGrade component", () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  it("should render a button to open the modal", () => {
    render(<AddGrade fetchGrades={() => {}} />);
    const addButton = screen.getByRole("button", { name: "+" });
    expect(addButton).toBeInTheDocument();
  });

  it("should render a modal when the button is clicked", () => {
    render(<AddGrade fetchGrades={() => {}} />);
    const addButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(addButton);
    const modal = screen.getByRole("dialog", { name: /Add Grade/ });
    expect(modal).toBeInTheDocument();
  });

  it("should submit the form data when the add button is clicked", async () => {
    mockedAxios.post.mockResolvedValue({ data: {} });

    render(<AddGrade fetchGrades={() => {}} />);
    const addButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(addButton);
    const subjectInput = screen.getByPlaceholderText("Subject name...");
    const gradeInput = screen.getByPlaceholderText("Grade value...");
    const dateInput = screen.getByPlaceholderText("Date of evaluation...");
    const addButtonInModal = screen.getByRole("button", { name: /Add/ });

    fireEvent.change(subjectInput, { target: { value: "IP" } });
    fireEvent.change(gradeInput, { target: { value: "8" } });
    fireEvent.change(dateInput, { target: { value: "2022-01-01" } });

    fireEvent.click(addButtonInModal);

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:8082/api/v1/students/c6189cad-7d76-4f9c-995b-6694f7c40964/grades",
        {
          value: 8,
          subject: "IP",
          evaluationDate: "2022-01-01",
          deleted: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
    );
  });
});
