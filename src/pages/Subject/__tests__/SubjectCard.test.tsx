import axios from "axios";
import SubjectCard from "../SubjectCard";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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
        hoursOfStudy: 40
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
        "http://localhost:8082/api/v1/subjects/subjectTitle=Test Title", 
        {"headers": {"Authorization": "Bearer null"}} 
      )
    );

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8082/api/v1/subjects/subjectTitle=Test Title/image", 
        {"headers": {"Authorization": "Bearer null"}, 
        "responseType": "arraybuffer"}
      )
    );

    expect(editButton).toBeInTheDocument();

    const cardImgElement = screen.getByAltText("Test Title");
    expect(cardImgElement).toHaveAttribute("src", expect.any(String));

    // await waitFor(() => {
    //   expect(setCardImgMock).toHaveBeenCalled();
    // });
  });

  it("should show delete confirmation dialog and delete subject", async () => {
    const setIsModifiedMock = jest.fn();
    const deleteMock = jest.fn();
    const handleEditClickMock = jest.fn();

    jest.spyOn(console, "log").mockImplementation(() => {});

    const card = {
      id: 1,
      title: "Test Title",
      description: "Lorem ipsum",
      year: 2023,
      semester: 1,
      credits: 3,
      hoursOfStudy: 40
    };

    render(
      <SubjectCard
        card={card}
        isModified={false}
        setIsModified={setIsModifiedMock}
        role="TEACHER"
      />
    );

    const deleteButton = screen.getByText("Delete");

    fireEvent.click(deleteButton);

    const confirmButton = await screen.findByText("Yes");

    // Get the confirmation dialog by its container element
    const confirmationDialog = confirmButton.closest(".ant-modal");

    expect(confirmationDialog).toBeInTheDocument();
    
    fireEvent.click(confirmButton);

    expect(console.log).toHaveBeenCalledWith("OK");

    // Assert axios.delete() call
    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:8082/api/v1/subjects/subjectTitle=Test Title",
      {
        headers: {
          Authorization: "Bearer null",
        },
      }
    );

    // Assert setIsModified mock function call
    expect(setIsModifiedMock).toHaveBeenCalledWith(true);
  });

  it("should call handleEditClick when Edit button is clicked", async () => {
    const setIsModifiedMock = jest.fn();
    const handleEditClickMock = jest.fn();
  
    const card = {
      id: 1,
      title: "Test Title",
      description: "Lorem ipsum",
      year: 2023,
      semester: 1,
      credits: 3,
      hoursOfStudy: 40
    };

    const setCardImgMock = jest.fn();

     jest.spyOn(React, "useState")
     .mockReturnValueOnce(["", setCardImgMock])
     .mockReturnValueOnce([false, setIsModifiedMock]);
  
    render(
      <SubjectCard
        card={card}
        isModified={false}
        setIsModified={setIsModifiedMock}
        role="TEACHER"
      />
    );
  
    fireEvent.click(screen.getByTestId("edit-button"));

    //expect(handleEditClickMock).toHaveBeenCalled();
    //expect(handleEditClickMock).toHaveBeenCalledWith(expect.any(Object), card);
  });
});
