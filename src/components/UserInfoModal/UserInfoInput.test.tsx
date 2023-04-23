import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserInfoInput from "./UserInfoInput";

describe("UserInfoInput", () => {
  test("should render properly", () => {
    render(<UserInfoInput title={"title"} value={"value"} />);

    expect(screen.getByText("title:")).toBeInTheDocument();
    expect(screen.getByText("value")).toBeInTheDocument();
  });

  test("should be editable", () => {
    const setValueMock = jest.fn();
    render(
      <UserInfoInput
        title={"title"}
        value={"value"}
        isEditing={true}
        setValue={setValueMock}
      />
    );
    const inputField = screen.getByRole("textbox");
    expect(inputField).toBeInTheDocument();

    fireEvent.change(inputField, { target: { value: "test value" } });
    expect(setValueMock).toHaveBeenCalledTimes(1);
    expect(setValueMock).toHaveBeenCalledWith("test value");
  });
});
