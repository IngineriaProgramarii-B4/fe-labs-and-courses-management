import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import UpdateGrade from "../components/UpdateGrade";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UpdateGrade component", () => {
  beforeEach(() => {
    mockedAxios.put.mockReset();
  });

  it("should render a button to open the modal", () => {
    render(<UpdateGrade fetchGrades={() => {}} id={0} />);
    const editButton = screen.getByTestId("edit_img");
    expect(editButton).toBeInTheDocument();
  });

  it("should render a modal when the button is clicked", () => {
    render(<UpdateGrade fetchGrades={() => {}} id={0} />);
    const editButton = screen.getByTestId("edit_img");
    fireEvent.click(editButton);
    const modal = screen.getByRole("dialog", { name: /Update Grade/ });
    expect(modal).toBeInTheDocument();
  });
  // it("should render labels for grade and evaluation date", () => {
  //   render(<UpdateGrade fetchGrades={() => {}} id={0} />);
  //   const dateInput = screen.getByLabelText("Date");
  //   expect(dateInput).toBeInTheDocument();

  //   const gradeInput = screen.getByLabelText("Grade");
  //   expect(gradeInput).toBeInTheDocument();
  // });

  it("should submit the form data when the update button is clicked", async () => {
    mockedAxios.put.mockResolvedValueOnce({
      data: "Grade updated successfully!",
    });

    render(<UpdateGrade fetchGrades={() => {}} id={0} />);
    const editButton = screen.getByTestId("edit_img");
    fireEvent.click(editButton);

    const gradeInput = screen.getByRole("spinbutton");
    fireEvent.change(gradeInput, { target: { value: 8 } });

    const updateButton = screen.getByRole("button", { name: "Update" });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalledWith(
        "http://localhost:8082/api/v1/students/undefined/grades/0?value=8&evaluationDate=30.05.2023",
        {
          value: 8,
          evaluationDate: "30.05.2023",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer null`,
          },
        }
      );
    });
  });
});
