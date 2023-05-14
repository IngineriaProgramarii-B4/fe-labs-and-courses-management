import axios from "axios";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubjectAlex from "../SubjectAlex";
import SubjectCard from "../SubjectCard";

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
    const card1 = await screen.findByText("Math");
    const card2 = await screen.findByText("Science");

    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
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

  test("'no' button doesn't delete the card", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedData });

    render(<SubjectAlex />);
    const deleteButton = await screen.findAllByText("Delete");
    fireEvent.click(deleteButton[0]);

    expect(
      await screen.findByText("Are you sure you wish to delete this subject?")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("You can't revert your actions")
    ).toBeInTheDocument();

    const noButton = await screen.findByText("No");
    const yesButton = await screen.findByText("Yes");

    expect(noButton).toBeInTheDocument;
    expect(yesButton).toBeInTheDocument;

    fireEvent.click(noButton);

    const card1 = await screen.findByText("Math");
    expect(card1).toBeInTheDocument();
  });

  test("delete button trigger axios.delete", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedData });
    (axios.delete as jest.Mock).mockResolvedValue({});

    render(<SubjectAlex />);
    const deleteButton = await screen.findAllByText("Delete");
    fireEvent.click(deleteButton[0]);

    const yesButton = await screen.findByText("Yes");

    expect(yesButton).toBeInTheDocument;

    fireEvent.click(yesButton);

    expect(axios.delete).toHaveBeenCalledTimes(1);
  });

  test("edit button opens form", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedData });

    render(<SubjectAlex />);
    const editButton = await screen.findAllByText("Edit");
    expect(editButton[0]).toBeInTheDocument;
    fireEvent.click(editButton[0]);

    const formTitle = await screen.findByText("Edit Subject");
    expect(formTitle).toBeInTheDocument;
  });
});
