import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import PhotoUpload from "../PhotoUpload";
import { UploadFile } from "antd/es/upload/interface";

describe("PhotoUpload component", () => {
  const file: File = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
  const fileList: UploadFile[] = [
    {
      uid: "1",
      name: "test.png",
      status: "done",
      url: "http://localhost/test.png",
    },
  ];

  const setFileList = jest.fn();
  const setUpFile = jest.fn();

  const props = {
    title: "Test Title",
    fileList: fileList,
    setFileList: setFileList,
    upFile: null,
    setUpFile: setUpFile,
  };

  it("should render the component", () => {
    const fileList: UploadFile[] = [];
    const { getByText } = render(
      <PhotoUpload
        title="Test Title"
        fileList={fileList}
        setFileList={() => {}}
        upFile={null}
        setUpFile={() => {}}
      />
    );

    const uploadPhotoText = screen.getByText("Upload Photo");
    expect(uploadPhotoText).toBeInTheDocument();
  });

  it("renders an upload button with text when fileList is empty", () => {
    render(<PhotoUpload {...props} fileList={[]} />);

    expect(screen.getByText("Upload Photo")).toBeInTheDocument();
  });

  it("should call onPreview when a picture is clicked", () => {
    window.open = jest.fn();
    render(<PhotoUpload {...props} />);
    fireEvent.click(screen.getByText("test.png"));
    expect(window.open).toHaveBeenCalled();
  });

  const props2 = {
    title: "Upload your photo",
    fileList: [],
    setFileList: jest.fn(),
    upFile: null,
    setUpFile: jest.fn(),
  };

  it("should allow the user to select and upload a file", async () => {
    const setFileListMock = jest.fn();
    const { container } = render(
      <PhotoUpload
        title="Upload your photo"
        fileList={[]}
        setFileList={setFileListMock}
        upFile={null}
        setUpFile={jest.fn()}
      />
    );
    const file = new File(["file contents"], "test.png", {
      type: "image/png",
    });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, "files", {
      value: [file],
    });
    fireEvent.change(input);
    await waitFor(() => {
      expect(setFileListMock).toHaveBeenCalled();
    });
  });
});
