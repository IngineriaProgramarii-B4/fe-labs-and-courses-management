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

  test("opens subject modal on add card button click", async () => {
    render(<SubjectAlex />);

    const addCardButton = await screen.findByTestId("add-card-button");
    fireEvent.click(addCardButton);

    const subjectModalOutline = await screen.findByTestId("add-card-outline");
    expect(subjectModalOutline).toBeInTheDocument();

    const subjectModalTitle = await screen.findByTestId("add-card-title");
    expect(subjectModalTitle).toBeInTheDocument();
  });
});
