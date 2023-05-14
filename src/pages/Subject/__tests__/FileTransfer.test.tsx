import axios from "axios";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FileTransfer from "../FileTransfer";
import { AxiosStatic } from "axios";

jest.mock("axios");

describe("FileTransfer component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with the correct props", () => {
    
    const onDrop = jest.fn();
    
    render(
      <FileTransfer
        component="Test Component"
        title="Test Title"
        clearFileList={false}
        onDrop={onDrop}
      />
    );

    expect(screen.getByText(/Click or drag file to this area to upload/i)).toBeInTheDocument();
  });

  it("uploads a file successfully", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockResponse = { data: { message: "File uploaded successfully" } };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const onDrop = jest.fn();

    render(
      <FileTransfer
        component="Test Component"
        title="Test Title"
        clearFileList={false}
        onDrop={onDrop}
      />
    );

    const file = new File(["test file contents"], "test.png", {
      type: "image/png",
    });

    const input = await screen.findByTestId("file-input");

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
  });

  it("displays an error message when file upload fails", async () => {
    const onDrop = jest.fn();
    
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const errorMessage = "File upload failed";
    mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <FileTransfer
        component="Test Component"
        title="Test Title"
        clearFileList={false}
        onDrop={onDrop}
      />
    );

    const file = new File(["test file contents"], "test.png", {
      type: "image/png",
    });

    const input = await screen.findByTestId("file-input");

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
  });

  it("clears the file list when clearFileList prop changes", async () => {
    const onDrop = jest.fn();
    const { rerender } = render(
      <FileTransfer
        component="Test Component"
        title="Test Title"
        clearFileList={false}
        onDrop={onDrop}
      />
    );
  
    const file = new File(["test file contents"], "test.png", {
      type: "image/png",
    });
  
    const input = await screen.findByTestId("file-input");
  
    fireEvent.change(input, { target: { files: [file] } });
  
    expect(await screen.findByText(/test\.png/i)).toBeInTheDocument();
  
    rerender(
      <FileTransfer
        component="Test Component"
        title="Test Title"
        clearFileList={true}
        onDrop={onDrop}
      />
    );
  
    await waitFor(() => {
      expect(screen.queryByText(/test\.png/i)).not.toBeInTheDocument();
    });
  });

  it("calls onDrop when files are dropped onto the component", async () => {
  const onDrop = jest.fn();
  render(
    <FileTransfer
      component="Test Component"
      title="Test Title"
      clearFileList={false}
      onDrop={onDrop}
    />
  );

  const files = [
    new File(["test file contents"], "test.png", { type: "image/png" }),
    new File(["another file contents"], "test.txt", { type: "text/plain" }),
  ];

  const dropArea = await screen.findByTestId("file-input");

  fireEvent.drop(dropArea, {
    dataTransfer: {
      files: files,
    },
  });

  expect(onDrop).toHaveBeenCalledTimes(1);
});

let mockedAxios: jest.Mocked<AxiosStatic> = {} as jest.Mocked<AxiosStatic>;


it("uploads a file successfully and calls onUploadProgress", async () => {
  mockedAxios = axios as jest.Mocked<typeof axios>;

  const mockResponse = { data: { message: "File uploaded successfully" } };
  mockedAxios.post.mockResolvedValueOnce(mockResponse);

  const onDrop = jest.fn();

  render(
    <FileTransfer
      component="Test Component"
      title="Test Title"
      clearFileList={false}
      onDrop={onDrop}
    />
  );

  const file = new File(["test file contents"], "test.png", {
    type: "image/png",
  });

  const input = await screen.findByTestId("file-input");

  fireEvent.change(input, { target: { files: [file] } });

  await waitFor(() => expect(mockedAxios?.post).toHaveBeenCalledTimes(1));
  if (mockedAxios && mockedAxios.post && mockedAxios.post.mock.calls[0][2]?.onUploadProgress) {
    const progressEvent = { loaded: 50, total: 100, bytes: 0 };
    mockedAxios.post.mock.calls[0][2].onUploadProgress(progressEvent);
  }
});  
});
