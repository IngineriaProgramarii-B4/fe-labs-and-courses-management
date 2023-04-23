import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Catalog from "../Catalog";

jest.mock("axios");

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
