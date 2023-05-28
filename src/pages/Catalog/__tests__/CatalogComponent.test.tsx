import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Catalog from "../Catalog";
import axios from "axios";

jest.mock("axios");

describe("Catalog", () => {
  test("renders student's name and grades table", async () => {
    render(<Catalog />);
    await waitFor(() => {
      expect(screen.getByText("'s grades:")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Subject")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Grade")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Evaluation Date")).toBeInTheDocument();
    });
  });

  test("fetches and stores response data correctly", async () => {
    const mockGrades = [
      {
        value: 8,
        subject: "IP",
        evaluationDate: "2023-04-01",
        deleted: false,
        id: 1,
      },
    ];

    (axios.get as jest.Mock).mockResolvedValue({
      data: { grades: mockGrades },
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    render(<Catalog />);

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
