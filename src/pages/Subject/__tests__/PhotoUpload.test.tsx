import { render, fireEvent, screen } from "@testing-library/react";
import PhotoUpload from "../PhotoUpload";
import { UploadFile } from "antd/es/upload/interface";

describe("PhotoUpload component", () => {
  const file: File = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
  const fileList: UploadFile[] = [
    { uid: "1", name: "test.png", status: "done", url: "http://localhost/test.png" },
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
  const fileList : UploadFile[] = [];
  const { getByText } = render(
    <PhotoUpload
      title="Test Title"
      fileList={fileList}
      setFileList={() => {}}
      upFile={null}
      setUpFile={() => {}}
    />
  );

  const uploadPhotoText = getByText("Upload Photo");
  expect(uploadPhotoText).toBeInTheDocument();
  });

  it("renders an upload button with text when fileList is empty", () => {
    const { getByText } = render(
      <PhotoUpload
        title="Upload Photo"
        fileList={[]}
        setFileList={setFileList}
        upFile={null}
        setUpFile={setUpFile}
      />
    );

    expect(getByText("Upload Photo")).toBeInTheDocument();
  });

  it("should call onPreview when a picture is clicked", () => {
    window.open = jest.fn();
    const { getByText } = render(<PhotoUpload {...props} />);
    fireEvent.click(getByText("test.png"));
    expect(window.open).toHaveBeenCalled();
  });
});