import axios from "axios";
import SubjectCard from "../SubjectCard";
import { render, screen, waitFor } from "@testing-library/react";
jest.mock("axios");

describe("SubjectCard component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders subject card with mock image", async () => {
    const title = "Test Title";
    const response = {
      data: {
        image: {
          type: "image/png",
        },
      },
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(response);
    const imgBlob = new Blob([], { type: response.data.image.type });
    const imgUrl = URL.createObjectURL(imgBlob);

    render(
      <SubjectCard
        card={{
          id: 1,
          title: title,
          description: "Lorem ipsum",
          year: 2023,
          semester: 1,
          credits: 3,
        }}
        isModified={false}
        setIsModified={() => {}}
      />
    );
    const editButton = screen.getByTestId("edit-button");

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8090/api/v1/subjects/subjectTitle=${title}`
      )
    );

    expect(editButton).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", imgUrl);
  });
});
