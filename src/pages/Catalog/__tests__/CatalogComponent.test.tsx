import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Catalog from "../Catalog";
import axios from "axios";

jest.mock("axios");

describe("Catalog", () => {
  test("renders student's name and grades table", async () => {
    render(<Catalog />);
    expect(screen.getByText("User's Grades")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Subject")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Grade")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Date of Evaluation")).toBeInTheDocument();
    });
  });

  test("fetches and stores response data correctly", async () => {
    const mockGrades = [
      {
        value: 8,
        subject: {
          name: "IP",
          teachers: [
            {
              idProf: 1,
              email: "teacher@example.com",
              name: "John Doe",
              teachedSubjects: null,
              id: 1,
            },
          ],
        },
        evaluationDate: "2023-04-01",
        id: 1,
      },
    ];

    (axios.get as jest.Mock).mockResolvedValue({
      data: { grades: mockGrades },
    });

    render(<Catalog />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8081/api/v1/catalog/students/1"
      );
    });

    await waitFor(() => {
      expect(screen.getByText("IP")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("8")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("2023-04-01")).toBeInTheDocument();
    });

    expect(axios.get).toHaveReturnedWith(
      Promise.resolve({ data: { grades: mockGrades } })
    );
  });
});
