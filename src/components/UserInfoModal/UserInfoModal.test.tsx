import React from "react";
import {
  act,
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

jest.mock("axios");
const axiosInstanceMock = axios as jest.Mocked<typeof axios>;
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
  test("should render properly when not editing and with an avatar", () => {
    const userAvatar = "someImage.png";
    render(
      <UserProfileAvatar
        isEditing={false}
        newAvatar={null}
        avatar={userAvatar}
        setNewAvatar={noop}
      />
    );

    const userImage = screen.getByAltText("avatar");
    expect(userImage).toBeInTheDocument();
    expect(userImage).toHaveAttribute("src", userAvatar);
  });

  test("should render properly when editing and with an uploaded avatar", () => {
    const uploadedAvatar = "someImage.png";

    render(
      <UserProfileAvatar
        isEditing={true}
        newAvatar={uploadedAvatar}
        avatar={undefined}
        setNewAvatar={noop}
      />
    );

    const userImage = screen.getByAltText("avatar");
    expect(userImage).toBeInTheDocument();
    expect(userImage).toHaveAttribute("src", uploadedAvatar);
  });
});

describe("UserInfoModal", () => {
  function createMockedAxiosInstance(): jest.Mocked<AxiosInstance> {
    const instance = axios.create();
    return {
      ...instance,
      get: jest.fn(),
      put: jest.fn(),
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
          type: 1,
        },
      ],
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the user icon properly", async () => {
    axiosInstanceMock.create.mockReturnValue(axiosInstance);

    render(
      <BrowserRouter>
        <UserInfoModal />
      </BrowserRouter>
    );
    const userAvatar = screen.getByTestId("user-avatar");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(userAvatar);
    });

    await waitFor(() => expect(axiosInstance.post).toHaveBeenCalled());
    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();
    expect(screen.getByText("User Profile")).toBeInTheDocument();
  });
});
