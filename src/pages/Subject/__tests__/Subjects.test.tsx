import axios from "axios";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Subjects} from "../Subjects";
import SubjectCard from "../SubjectCard";
import CardGrid from "../CardGrid";
import { extractToken } from "../Subjects";

jest.mock("axios");

describe("Subjects component", () => {
  const mockedData = [
    {
      id: 1,
      title: "Math",
      description: "Lorem ipsum",
      year: 2022,
      semester: 1,
      credits: 5,
      hoursOfStudy: 40
    },
    {
      id: 2,
      title: "Science",
      description: "Dolor sit amet",
      year: 2022,
      semester: 2,
      credits: 4,
      hoursOfStudy: 38
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders the component", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedData });

    render(<Subjects />);
    const card1 = await screen.findByText("Math");
    const card2 = await screen.findByText("Science");
    await waitFor(() => {
      expect(card1).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(card2).toBeInTheDocument();
    });
  });

  /************************************************** */
  beforeEach(() => {
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValue("token");
  });

  afterEach(() => {
    jest.spyOn(window.localStorage.__proto__, "getItem").mockRestore();
  });

  it("should return the token from local storage", () => {
    render(<Subjects />);

    expect(extractToken()).toBe("token");
  });

  it("should return null when no token is found in local storage", () => {
    jest.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue(null);
    render(<Subjects />);
    expect(extractToken()).toBeNull();
  });
});
