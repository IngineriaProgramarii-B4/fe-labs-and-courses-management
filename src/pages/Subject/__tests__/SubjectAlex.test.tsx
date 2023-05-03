import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubjectAlex from "../SubjectAlex";

jest.mock("axios");

describe("SubjectAlex component", () => {
  const mockedData = [
    {
      id: 1,
      title: "Math",
      description: "Lorem ipsum",
      year: 2022,
      semester: 1,
      credits: 5,
    },
    {
      id: 2,
      title: "Science",
      description: "Dolor sit amet",
      year: 2022,
      semester: 2,
      credits: 4,
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  
  test("renders the component", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedData });

    render(<SubjectAlex />);
    const test1 = await screen.findByText("Math");
    const test2 = await screen.findByText("Science");

    expect(test2).toBeInTheDocument();
    expect(test1).toBeInTheDocument();
  });
  

  test("fetches the data from the API", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedData });

    render(<SubjectAlex />);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8090/api/v1/subjects"
    );

    expect(await screen.findByText("Math")).toBeInTheDocument();
    expect(await screen.findByText("Science")).toBeInTheDocument();
  });
});
