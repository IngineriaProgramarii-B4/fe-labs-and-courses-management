import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserAvatar from "./UserAvatar";

describe("UserAvatar", () => {
  test("should render the user placeholder icon", () => {
    render(<UserAvatar onClick={() => {}} />);
    const userAvatar = screen.getByTestId("user-placeholder-avatar");

    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveClass("fa-solid", "fa-user");
  });

  test("should render a custom user avatar", () => {
    render(<UserAvatar avatar={"testImage"} onClick={() => {}} />);
    const userAvatar = screen.getByAltText("Avatar");

    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveAttribute("src", "testImage");
  });

  test("should call the onClick function when clicked", () => {
    const mockOnClick = jest.fn();
    render(<UserAvatar onClick={mockOnClick} />);
    const userAvatar = screen.getByTestId("user-avatar");
    fireEvent.click(userAvatar);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
