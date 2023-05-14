import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import ResourcesTable from "../ResourcesTable";

jest.mock("axios");

describe("ResourcesTable", () => {
  beforeEach(() => {
    (axios.delete as jest.Mock).mockResolvedValue({});
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });
  });

  test("renders the component", async () => {
    render(<ResourcesTable component="Course" title="example" />);
    const modal_ = await screen.findByTestId("add-button");
    const addButton = await screen.findByTestId("add-button");
    expect(modal_).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();

    const modal = screen.queryByTestId("modal");
    expect(modal).toBeNull();

    fireEvent.click(addButton);
    await waitFor(() => {
      const modal = screen.getByTestId("modal");
      expect(modal).toBeInTheDocument();
    });

    const okButton = screen.getByTestId("ok-add-button");
    expect(okButton).toBeInTheDocument();

    fireEvent.click(okButton);

    await waitFor(() => {
      const modal = screen.queryByTestId("modal");
      expect(modal).toEqual([]);
    });
  });

  test("deletes a resource on button click", async () => {
    const data = [
      {
        key: "1",
        title: "Resource 1",
        timeStamp: "2023-05-10",
        type: "pdf",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data });

    render(<ResourcesTable component="example" title="example" />);
    await waitFor(() => {
      expect(screen.getByText("Resource 1")).toBeInTheDocument();
    });

    // Mock the window.open method
    window.open = jest.fn();

    const deleteButton = screen.getByTestId("delete-icon");
    fireEvent.click(deleteButton);

    expect(
      screen.getByText("Are you sure you wish to delete this resource?")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Yes"));

    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:8090/api/v1/subjects/example/components/example/resources/title=Resource 1"
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.queryByText("Resource 1")).not.toBeInTheDocument();
    });
  });

  test("opens the file on resource link click", async () => {
    const data = [
      {
        key: "1",
        title: "Resource 1",
        timeStamp: "2023-05-10",
        type: "pdf",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data });

    render(<ResourcesTable component="example" title="example" />);
    await waitFor(() => {
      expect(screen.getByText("Resource 1")).toBeInTheDocument();
    });

    // Mock the window.open method
    window.open = jest.fn();

    fireEvent.click(screen.getByText("Resource 1"));

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8090/api/v1/subjects/example/components/example/resources/file=Resource 1",
      { responseType: "arraybuffer" }
    );
    //expect(window.open).toHaveBeenCalled();
  });
});
