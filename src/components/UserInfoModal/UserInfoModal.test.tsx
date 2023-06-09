import React from "react";
import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import UserInfoModal, {
  ModalFooter,
  ModalTitle,
  UserProfileAvatar,
} from "./UserInfoModal";
import { BrowserRouter } from "react-router-dom";
import axios, { AxiosInstance } from "axios";
import UserContextProvider from "../UserContext/UserContext";
import { toast } from "react-toastify";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));
const axiosInstanceMock = axios as jest.Mocked<typeof axios>;
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Use actual for all non-hook parts
  useNavigate: jest.fn(),
}));
const noop = () => {};

describe("ModalTitle", () => {
  test("should render properly when not in edit mode", () => {
    render(<ModalTitle isEditing={false} setIsEditing={noop} />);

    expect(screen.getByText("User Profile")).toBeInTheDocument();
    const pencilIcon = screen.getByTestId("pencil-icon");
    expect(pencilIcon).toBeInTheDocument();
    expect(pencilIcon).toHaveClass("fa-solid", "fa-pen-to-square");
  });

  test("should not render a pencil icon when in edit mode", () => {
    render(<ModalTitle isEditing={true} setIsEditing={noop} />);

    const pencilIcon = screen.queryByTestId("pencil-icon");
    expect(pencilIcon).not.toBeInTheDocument();
  });

  test("should go into edit mode on icon click", () => {
    const mockSetIsEditing = jest.fn();
    render(<ModalTitle isEditing={false} setIsEditing={mockSetIsEditing} />);

    const pencilIcon = screen.getByTestId("pencil-icon");
    fireEvent.click(pencilIcon);
    expect(mockSetIsEditing).toHaveBeenCalledTimes(1);
    expect(mockSetIsEditing).toHaveBeenCalledWith(true);
  });
}); //done

describe("ModalFooter", () => {
  test("should render properly when in edit mode", () => {
    render(
      <ModalFooter
        isEditing={true}
        onLogout={noop}
        onCancel={noop}
        onSave={noop}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    const saveButton = screen.getByText("Save");

    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  test("should render properly when not in edit mode", () => {
    render(
      <ModalFooter
        isEditing={false}
        onLogout={noop}
        onCancel={noop}
        onSave={noop}
      />
    );

    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();
  });

  test("should call onSave when save button is clicked", () => {
    const mockedOnSave = jest.fn();
    render(
      <ModalFooter
        isEditing={true}
        onLogout={noop}
        onCancel={noop}
        onSave={mockedOnSave}
      />
    );

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockedOnSave).toHaveBeenCalledTimes(1);
  });

  test("should call onCancel when cancel button is clicked", () => {
    const mockedOnCancel = jest.fn();
    render(
      <ModalFooter
        isEditing={true}
        onLogout={noop}
        onCancel={mockedOnCancel}
        onSave={noop}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockedOnCancel).toHaveBeenCalledTimes(1);
  });

  test("should call onLogout when logout button is clicked", () => {
    const mockedOnLogout = jest.fn();
    render(
      <ModalFooter
        isEditing={false}
        onLogout={mockedOnLogout}
        onCancel={noop}
        onSave={noop}
      />
    );

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockedOnLogout).toHaveBeenCalledTimes(1);
  });
});

describe("UserProfileAvatar", () => {
  const setNewAvatar = jest.fn();
  const setAvatar = jest.fn();

  test("should render properly when not editing and with an avatar", () => {
    const userAvatar = "someImage.png";
    render(
      <UserProfileAvatar
        isEditing={false}
        newAvatar={null}
        avatar={userAvatar}
        setNewAvatar={noop}
        id={"id"}
        setAvatar={noop}
      />
    );

    const userImage = screen.getByAltText("avatar");
    expect(userImage).toBeInTheDocument();
    expect(userImage).toHaveAttribute("src", userAvatar);
  });

  test("should render properly when not editing and without an avatar", () => {
    render(
      <UserProfileAvatar
        isEditing={false}
        newAvatar={null}
        avatar={"img.src"}
        setNewAvatar={noop}
        id={"id"}
        setAvatar={noop}
      />
    );

    const uploadText = screen.queryByText("Upload avatar");
    expect(uploadText).not.toBeInTheDocument();
  });

  test("should convert selected file to base64 when done uploading", async () => {
    const fakeFile = new File(["(⌐□_□)"], "avatar.png", { type: "image/png" });

    const { getByTestId } = render(
      <UserProfileAvatar
        isEditing={true}
        newAvatar={null}
        avatar={undefined}
        setNewAvatar={setNewAvatar}
        id={"id"}
        setAvatar={setAvatar}
      />
    );

    const input = getByTestId("avatar-upload").querySelector("input");
    if (input) {
      const fileSelectionEvent = createEvent.change(input, {
        target: { files: [fakeFile] },
      });
      Object.defineProperty(fileSelectionEvent, "target", {
        writable: true,
        value: { files: [fakeFile] },
      });

      fireEvent(input, fileSelectionEvent);

      // wait for FileReader to finish
      await waitFor(() => expect(setNewAvatar).toBeCalled());
      expect(setAvatar).toBeCalledWith(
        expect.stringContaining("data:image/png;base64")
      );
    }
  });

  test("should reject non-image file before uploading", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const fakeFile = new File(["(⌐□_□)"], "avatar.txt", { type: "text/plain" });

    const { getByTestId } = render(
      <UserProfileAvatar
        isEditing={true}
        newAvatar={null}
        avatar={undefined}
        setNewAvatar={() => {}}
        id={"id"}
        setAvatar={() => {}}
      />
    );

    const input = getByTestId("avatar-upload").querySelector("input");
    if (input) {
      const fileSelectionEvent = createEvent.change(input, {
        target: { files: [fakeFile] },
      });
      Object.defineProperty(fileSelectionEvent, "target", {
        writable: true,
        value: { files: [fakeFile] },
      });

      fireEvent(input, fileSelectionEvent);

      // since the upload process is rejected, these functions should not be called
      await waitFor(() => expect(setNewAvatar).not.toBeCalled());
      expect(setAvatar).not.toBeCalled();
      // check if console.error is called
      expect(consoleErrorSpy).toBeCalledWith(
        "You can only upload JPG/PNG file!"
      );
    }

    consoleErrorSpy.mockRestore();
  });
});

describe("UserInfoModal", () => {
  function createMockedAxiosInstance(): jest.Mocked<AxiosInstance> {
    const instance = axios.create();
    return {
      ...instance,
      get: jest.fn(),
      put: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;
  }

  let axiosInstance: jest.Mocked<AxiosInstance>;
  beforeEach(() => {
    axiosInstance = createMockedAxiosInstance();

    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.get.mockResolvedValue({
      data: [
        {
          firstName: "John",
          lastName: "Doe",
          username: "johndoe",
          email: "john.doe@example.com",
          id: "91b37ec0-4b38-41b7-be36-e229cbe86370",
          roles: [
            {
              id: 1,
              name: "ADMIN",
            },
          ],
        },
      ],
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });

    (axios.get as jest.Mock).mockResolvedValue({
      data: new Blob(),
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });

    axiosInstance.post.mockResolvedValueOnce({ data: { username: "john" } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should update admin(1) profile on save", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.patch.mockResolvedValue({ status: 200 });
    axiosInstance.get.mockResolvedValue({
      data: [
        {
          firstName: "John",
          lastName: "Doe",
          username: "johndoe",
          email: "john.doe@example.com",
          roles: [
            {
              id: 1,
              name: "ADMIN",
            },
          ],
        },
      ],
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });

    render(
      <BrowserRouter>
        <UserContextProvider>
          <UserInfoModal />
        </UserContextProvider>
      </BrowserRouter>
    );

    const userAvatar = screen.getByTestId("user-avatar");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(userAvatar);
    });

    await waitFor(() => expect(axiosInstance.post).toHaveBeenCalled());

    fireEvent.click(screen.getByTestId("pencil-icon"));
    fireEvent.click(screen.getByText("Save"));
    expect(axiosInstance.patch).toHaveBeenCalledTimes(1);
  });

  test("should update teacher(2) profile on save", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.patch.mockResolvedValue({ status: 200 });
    axiosInstance.get.mockResolvedValue({
      data: [
        {
          firstName: "John",
          lastName: "Doe",
          username: "johndoe",
          email: "john.doe@example.com",
          roles: [
            {
              id: 2,
              name: "TEACHER",
            },
          ],
        },
      ],
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });

    render(
      <BrowserRouter>
        <UserContextProvider>
          <UserInfoModal />
        </UserContextProvider>
      </BrowserRouter>
    );

    const userAvatar = screen.getByTestId("user-avatar");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(userAvatar);
    });

    await waitFor(() => expect(axiosInstance.post).toHaveBeenCalled());

    fireEvent.click(screen.getByTestId("pencil-icon"));
    fireEvent.click(screen.getByText("Save"));
    expect(axiosInstance.patch).toHaveBeenCalledTimes(1);
  });

  test("should update student(3) profile on save", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.patch.mockResolvedValue({ status: 200 });
    axiosInstance.get.mockResolvedValue({
      data: [
        {
          firstName: "John",
          lastName: "Doe",
          username: "johndoe",
          email: "john.doe@example.com",
          roles: [
            {
              id: 3,
              name: "STUDENT",
            },
          ],
        },
      ],
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });

    render(
      <BrowserRouter>
        <UserContextProvider>
          <UserInfoModal />
        </UserContextProvider>
      </BrowserRouter>
    );

    const userAvatar = screen.getByTestId("user-avatar");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(userAvatar);
    });

    await waitFor(() => expect(axiosInstance.post).toHaveBeenCalled());

    fireEvent.click(screen.getByTestId("pencil-icon"));
    fireEvent.click(screen.getByText("Save"));
    expect(axiosInstance.patch).toHaveBeenCalledTimes(1);
  });

  test("should not update user profile on cancel", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.patch.mockResolvedValue({ status: 200 });

    render(
      <BrowserRouter>
        <UserContextProvider>
          <UserInfoModal />
        </UserContextProvider>
      </BrowserRouter>
    );

    const userAvatar = screen.getByTestId("user-avatar");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(userAvatar);
    });

    await waitFor(() => expect(axiosInstance.post).toHaveBeenCalled());

    fireEvent.click(screen.getByTestId("pencil-icon"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.getByTestId("pencil-icon")).toBeInTheDocument();
  });

  test("should redirect on logout", async () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.patch.mockResolvedValue({ status: 200 });

    render(
      <BrowserRouter>
        <UserContextProvider>
          <UserInfoModal />
        </UserContextProvider>
      </BrowserRouter>
    );

    const userAvatar = screen.getByTestId("user-avatar");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(userAvatar);
    });

    await waitFor(() => expect(axiosInstance.post).toHaveBeenCalled());

    fireEvent.click(screen.getByText("Logout"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("should close the modal on cancel", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);
    axiosInstance.patch.mockResolvedValue({ status: 200 });

    render(
      <BrowserRouter>
        <UserContextProvider>
          <UserInfoModal />
        </UserContextProvider>
      </BrowserRouter>
    );

    const userAvatar = screen.getByTestId("user-avatar");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(userAvatar);
    });

    await waitFor(() => expect(axiosInstance.post).toHaveBeenCalled());

    fireEvent.click(screen.getByRole("button", { name: /Close/ }));
    expect(screen.queryByText("User Profile")).not.toBeInTheDocument();
  });
});
