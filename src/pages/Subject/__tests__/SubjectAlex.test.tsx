import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubjectAlex from "../SubjectAlex";

describe("SubjectAlex", () => {
  test("renders subject cards", async () => {
    render(<SubjectAlex />);
    const cards = await screen.findAllByTestId("subject-card");
    expect(cards.length).toBeGreaterThan(0);
  });
});
