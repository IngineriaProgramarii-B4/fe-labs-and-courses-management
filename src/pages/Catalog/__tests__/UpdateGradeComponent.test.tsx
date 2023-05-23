import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import UpdateGrade from "../components/UpdateGrade";
import { UUID } from "crypto";

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

  it("should submit the form data when the update button is clicked", async () => {
    mockedAxios.put.mockResolvedValue({ data: {} });

    render(<UpdateGrade fetchGrades={() => {}} id={0} />);
    const editButton = screen.getByTestId("edit_img");
    fireEvent.click(editButton);
    const gradeInput = screen.getByPlaceholderText("New grade value...");
    const dateInput = screen.getByPlaceholderText("New date of evaluation...");
    const updateButtonInModal = screen.getByRole("button", { name: /Update/ });

    fireEvent.change(gradeInput, { target: { value: "8" } });
    fireEvent.change(dateInput, { target: { value: "2022-01-01" } });

    fireEvent.click(updateButtonInModal);

    await waitFor(() =>
      expect(mockedAxios.put).toHaveBeenCalledWith(
        "http://localhost:8082/api/v1/students/c6189cad-7d76-4f9c-995b-6694f7c40964/grades/0?value=8&evaluationDate=2022-01-01",
        {
          value: 8,
          evaluationDate: "2022-01-01",
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
