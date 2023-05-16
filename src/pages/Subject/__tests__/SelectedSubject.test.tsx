import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByTestId,
} from "@testing-library/react";
import SelectedSubject from "../SelectedSubject";
import { BrowserRouter as Router } from "react-router-dom";
import Course from "../Course";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("axios");

describe("SelectedSubject component", () => {
  it("should set the subject and description state variables when data is returned from the API", async () => {
    const subjectTitle = "testSubject";
    const subjectData = {
      id: 1,
      title: "Test Subject",
      description: "This is a test subject.",
      image: {
        type: "image/png",
        data: new ArrayBuffer(8),
      },
    };
    const expectedDescription = subjectData.description;

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: subjectData });

    await act(async () => {
      render(<SelectedSubject />);
    });

    expect(screen.getByTestId("SelectedSubject-1")).toBeInTheDocument();
    expect(screen.getByText(expectedDescription)).toBeInTheDocument();
  });

  // titlu cursului este afisat corect
  test("renders course title", () => {
    const title = "Test Course Title";
    const description = "Test Course Description";
    render(
      <Course
        title={title}
        description={description}
        modalShow={false}
        setModalShow={() => {}}
        setDescription={() => {}}
        subject={{}}
      />
    );
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  // imaginea este afisata din sursa corecta
  test("write src picture", async () => {
    render(
      <Router>
        <SelectedSubject />
      </Router>
    );
    const image = screen.getByTestId("image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://blog.planview.com/wp-content/uploads/2020/01/Top-6-Software-Development-Methodologies.jpg"
    );
  });

  // butonul "view full description" deschide modalul

  test("clicking 'View Full Description' shows the modal", async () => {
    const title = "Test Course Title";
    const description = "Test Course Description";
    const setModalShow = jest.fn();

    render(
      <Course
        title={title}
        description={description}
        modalShow={false}
        setModalShow={setModalShow}
        setDescription={() => {}}
        subject={{}}
      />
    );
    const button = screen.getByText("View Full Description");
    fireEvent.click(button);
    expect(setModalShow).toHaveBeenCalledWith(true);
  });
});
