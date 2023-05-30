import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserAvatar from "./UserAvatar";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UserAvatar", () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "fake_token"),
        setItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    // Mock URL.createObjectURL
    global.URL.createObjectURL = jest.fn();

    mockedAxios.create.mockReturnThis();
    mockedAxios.post.mockResolvedValue({
      data: { email: "john.doe@example.com" },
    });

    mockedAxios.get.mockImplementation((url) => {
      if (url.includes("/users")) {
        return Promise.resolve({
          data: [{ id: "123", email: "john.doe@example.com" }],
        });
      }

      if (url.includes("/profile/download")) {
        return Promise.resolve({
          data: new ArrayBuffer(8),
        });
      }

      return Promise.reject(new Error("Not found"));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the user placeholder icon", () => {
    render(<UserAvatar onClick={() => {}} setAvatar={jest.fn} />);
    const userAvatar = screen.getByTestId("user-placeholder-avatar");

    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveClass("fa-solid", "fa-user");
  });

  test("should render a custom user avatar", () => {
    render(
      <UserAvatar avatar={"testImage"} onClick={() => {}} setAvatar={jest.fn} />
    );
    const userAvatar = screen.getByAltText("Avatar");

    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveAttribute("src", "testImage");
  });

  test("should call the onClick function when clicked", () => {
    const mockOnClick = jest.fn();
    render(<UserAvatar onClick={mockOnClick} setAvatar={jest.fn} />);
    const userAvatar = screen.getByTestId("user-avatar");
    fireEvent.click(userAvatar);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("should call setAvatar with correct image URL", async () => {
    const mockSetAvatar = jest.fn();

    await act(async () => {
      render(<UserAvatar onClick={() => {}} setAvatar={mockSetAvatar} />);
    });

    expect(mockSetAvatar).toHaveBeenCalledWith(expect.any(String));
  });

  test("should call setAvatar with correct image URL for no image", async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes("/users")) {
        return Promise.resolve({
          data: [{ id: "123", email: "john.doe@example.com" }],
        });
      }

      if (url.includes("/profile/download")) {
        return Promise.resolve({});
      }

      return Promise.reject(new Error("Not found"));
    });
    const mockSetAvatar = jest.fn();

    await act(async () => {
      render(<UserAvatar onClick={() => {}} setAvatar={mockSetAvatar} />);
    });

    expect(mockSetAvatar).toHaveBeenCalledWith(expect.any(String));
  });
});
