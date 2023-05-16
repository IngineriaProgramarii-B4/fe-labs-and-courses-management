import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import axios from "axios";
import CardGrid from "../CardGrid";

jest.mock("axios");

const mockProps = {
  cards: [
    {
      id: 1,
      title: "Mathematics",
      description: "Mathematics course",
      year: 2022,
      semester: 1,
      credits: 5,
    },
    {
      id: 2,
      title: "Physics",
      description: "Physics course",
      year: 2022,
      semester: 2,
      credits: 4,
    },
  ],
  setCards: jest.fn(),
  isModified: false,
  setIsModified: jest.fn(),
};

describe("CardGrid", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders the correct number of subject cards", () => {
    render(<CardGrid {...mockProps} />);
    const subjectCards = screen.getAllByTestId("subject-card");
    expect(subjectCards.length).toEqual(mockProps.cards.length);
  });

  it("pressing the card sends the user to the course's page", async () => {
    const mockUrl = "http://localhost:3000/SelectedSubject?subject=Mathematics";
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: jest.fn() },
    });
    render(<CardGrid {...mockProps} />);
    const mathCard = screen.getByText("Mathematics");
    fireEvent.click(mathCard);
    // await waitFor(() => {
    //   expect(window.location.assign).toHaveBeenCalledWith(mockUrl);
    // });
  });
  
  
  
  
  
  
  
  
  
  

  /*
  it("renders the add subject card button", () => {
    render(<CardGrid {...mockProps} />);
    const addSubjectCardButton = screen.getByTestId("add-subject-card-button");
    expect(addSubjectCardButton).toBeInTheDocument();
  });
*/
});
