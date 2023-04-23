import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserInfoModal, { ModalTitle } from "./UserInfoModal";
import { BrowserRouter } from "react-router-dom";

describe("ModalTitle", () => {
  test("should render properly when not in edit mode", () => {
    render(<ModalTitle isEditing={false} setIsEditing={() => {}} />);

    expect(screen.getByText("User Profile")).toBeInTheDocument();
    const pencilIcon = screen.getByTestId("pencil-icon");
    expect(pencilIcon).toBeInTheDocument();
    expect(pencilIcon).toHaveClass("fa-solid", "fa-pencil");
  });

  test("should not render a pencil icon when in edit mode", () => {
    render(<ModalTitle isEditing={true} setIsEditing={() => {}} />);

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

describe("UserInfoModal", () => {
  test("should render the user icon properly", () => {
    // render(
    //   <BrowserRouter>
    //     <UserInfoModal />
    //   </BrowserRouter>
    // );
    // const userAvatar = screen.getByTestId("user-avatar");
    // fireEvent.click(userAvatar);
    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();
    // expect(screen.queryByText("User Profile")).not.toBeInTheDocument();
  });
});
