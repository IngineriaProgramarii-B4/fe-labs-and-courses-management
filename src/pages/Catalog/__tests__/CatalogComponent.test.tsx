import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Catalog from "../Catalog";
import axios from "axios";

jest.mock("axios");

describe("Catalog", () => {
  test("renders student's name and grades table", async () => {
    render(<Catalog />);

    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
    expect(screen.getByText("'s grades:")).toBeInTheDocument();
    expect(screen.getByText("Subject")).toBeInTheDocument();
    expect(screen.getByText("Grade")).toBeInTheDocument();
    expect(screen.getByText("Evaluation Date")).toBeInTheDocument();
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

  test("exports grades as CSV", async () => {
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
      expect(screen.getByText("Export as CSV")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Export as CSV"));
    const csvLink = screen.getByText("Export as CSV");
    expect(csvLink).toBeInTheDocument();
  });

  test("displays the correct number of grades per page based on pagination", async () => {
    const mockGrades = [
      {
        value: 8,
        subject: "IP",
        evaluationDate: "2023-04-01",
        deleted: false,
        id: 1,
      },
      {
        value: 8,
        subject: "PA",
        evaluationDate: "2023-04-01",
        deleted: false,
        id: 1,
      },
      {
        value: 8,
        subject: "SGBD",
        evaluationDate: "2023-04-01",
        deleted: false,
        id: 1,
      },
      {
        value: 8,
        subject: "AIIT",
        evaluationDate: "2023-04-01",
        deleted: false,
        id: 1,
      },
      {
        value: 8,
        subject: "SE",
        evaluationDate: "2023-04-01",
        deleted: false,
        id: 1,
      },
      {
        value: 8,
        subject: "IS",
        evaluationDate: "2023-04-01",
        deleted: false,
        id: 1,
      },
      {
        value: 8,
        subject: "ML",
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

    expect(screen.getByText("IP")).toBeInTheDocument();

    expect(screen.getByText("PA")).toBeInTheDocument();

    expect(screen.getByText("SGBD")).toBeInTheDocument();

    expect(screen.getByText("AIIT")).toBeInTheDocument();

    expect(screen.queryByText("SE")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("2"));

    expect(screen.getByText("SE")).toBeInTheDocument();

    expect(screen.getByText("IS")).toBeInTheDocument();

    expect(screen.getByText("ML")).toBeInTheDocument();
  });
});
