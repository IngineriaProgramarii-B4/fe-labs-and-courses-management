import { render, fireEvent, screen } from "@testing-library/react";
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
    const { getByText } = render(
      <PhotoUpload
        title="Upload Photo"
        fileList={[]}
        setFileList={setFileList}
        upFile={null}
        setUpFile={setUpFile}
      />
    );

    expect(screen.getByText("Upload Photo")).toBeInTheDocument();
  });

  it("should call onPreview when a picture is clicked", () => {
    window.open = jest.fn();
    const { getByText } = render(<PhotoUpload {...props} />);
    fireEvent.click(screen.getByText("test.png"));
    expect(window.open).toHaveBeenCalled();
  });
  /***************************************************************************************************/
  const props2 = {
    title: "Upload your photo",
    fileList: [],
    setFileList: jest.fn(),
    upFile: null,
    setUpFile: jest.fn(),
  };
  /*
  it("should render with a title and upload button", () => {
    const { getByText } = render(<PhotoUpload {...props2} />);
    expect(screen.getByText(props2.title)).toBeInTheDocument();
    expect(screen.getByText("Upload Photo")).toBeInTheDocument();
  });
*/
  it("should allow the user to select and upload a file", async () => {
    const { getByTestId } = render(<PhotoUpload {...props2} />);
    const file = new File(["file contents"], "test.png", {
      type: "image/png",
    });
    const input = screen
      .getByTestId("upload-input")
      .querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });
    expect(props2.setFileList).toHaveBeenCalledWith([{ originFileObj: file }]);
    expect(props2.setUpFile).toHaveBeenCalledWith(file);
  });
  /*
  it("should allow the user to preview an uploaded file", async () => {
    const file = {
      uid: "123",
      name: "test.png",
      status: "done",
      url: "data:image/png;base64,...",
    };
    const { getByTestId, getByRole } = render(
      <PhotoUpload {...props2} fileList={[file]} />
    );
    const uploadCard = screen
      .getByTestId("upload-input")
      .querySelector(".ant-upload-list-item") as HTMLElement;
    fireEvent.click(uploadCard);
    const previewImage = screen.getByRole("img") as HTMLImageElement;
    expect(previewImage.src).toEqual(file.url);
  });
  */
});
