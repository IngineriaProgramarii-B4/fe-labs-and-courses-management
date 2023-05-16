import axios from "axios";
import SubjectCard from "../SubjectCard";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useState } from "react";
jest.mock("axios");

describe("SubjectCard component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders subject card with mock image", async () => {
    const setCardImgMock = jest.fn();
    const setCardImg = jest.fn();
  
    jest.spyOn(React, "useState").mockReturnValue(["", setCardImg]); // Mocking useState hook
  
    const StateUpdateWrapper = () => {
      const [card, setCard] = useState({
        id: 1,
        title: "Test Title",
        description: "Lorem ipsum",
        year: 2023,
        semester: 1,
        credits: 3,
      });
  
      return (
        <div data-testid="state-update-wrapper">
          <SubjectCard
            card={card}
            isModified={false}
            setIsModified={() => {}}
            //setCardImg={setCardImgMock}
            role={"TEACHER"}
          />
        </div>
      );
    };

    const response = {
      data: {
        image: {
          type: "image/png",
        },
      },
    };
    const imageData = new Uint8Array([1, 2, 3]); // Example image data
    (axios.get as jest.Mock)
      .mockResolvedValueOnce(response)
      .mockResolvedValueOnce({ data: imageData });

    render(<StateUpdateWrapper />);

    const editButton = screen.getByTestId("edit-button");

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8082/api/v1/subjects/subjectTitle=Test Title"
      )
    );

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8082/api/v1/subjects/subjectTitle=Test Title/image",
        { responseType: "arraybuffer" }
      )
    );

    expect(editButton).toBeInTheDocument();

    const cardImgElement = screen.getByAltText("Test Title");
    expect(cardImgElement).toHaveAttribute("src", expect.any(String));

    // await waitFor(() => {
    //   expect(setCardImgMock).toHaveBeenCalled();
    // });
  });
});
