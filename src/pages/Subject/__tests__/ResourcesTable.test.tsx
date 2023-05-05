import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResourcesTable from "../ResourcesTable";
import Course from "../Course";
import MyVerticallyCenteredModal from "../MyVerticallyCenteredModal";
import userEvent from "@testing-library/user-event";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

jest.mock("axios");
beforeEach(() => {
  (axios.get as jest.Mock).mockResolvedValueOnce({
    data: [
      { key: "key1", title: "file1.pdf", timeStamp: "2022-01-01", type: "pdf" },
      { key: "key2", title: "file2.jpg", timeStamp: "2022-01-02", type: "jpg" },
    ],
  });
});

describe("ResourcesTable component", () => {
  test("renders table with resource titles", async () => {
    render(<ResourcesTable title="test" component="test" />);
    const resourceTitle1 = await screen.findByText("file1.pdf");
    const resourceTitle2 = await screen.findByText("file2.jpg");
    expect(resourceTitle1).toBeInTheDocument();
    expect(resourceTitle2).toBeInTheDocument();
  });

  /*  it("calls delete API when 'Delete' button is clicked", async () => {
    render(<ResourcesTable title="test" component="test" />);
    const deleteButton = await screen.findByTestId("delete-button");
    fireEvent.click(deleteButton);
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:8090/api/v1/subjects/test/components/test/resources/title=file1.pdf"
    );
  });

  it("opens a new window when a resource title is clicked", async () => {
    global.URL.createObjectURL = jest.fn();
    render(<ResourcesTable title="test" component="test" />);
    const resourceTitle = await screen.findByText("file1.pdf");
    fireEvent.click(resourceTitle);
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
  });
  */

  it("opens a modal when 'Add resource' button is clicked", async () => {
    render(<ResourcesTable title="test" component="test" />);
    const addButton = await screen.findByTestId("add-button");
    await waitFor(() => expect(addButton).toBeVisible());
    fireEvent.click(addButton);
    const modal = await screen.findByTestId("modal");
    expect(modal).toBeInTheDocument();
  });
  /*
  it("Close the modal when 'Ok' button is clicked", async () => {
    render(<ResourcesTable title="test" component="test" />);
    const addButton = await screen.findByTestId("add-button");
    fireEvent.click(addButton);
    const modal = await screen.findByTestId("modal");
    const okbutton = await screen.findByTestId("ok-add-button");
    fireEvent.click(okbutton);
    expect(modal).not.toBeInTheDocument();
  });
  */
});
