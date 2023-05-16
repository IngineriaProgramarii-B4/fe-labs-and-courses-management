import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import AddSubjectCard from "../AddSubjectCard";

test("clicking on the add card button calls setSubjectModal with true", () => {
  const setSubjectModal = jest.fn();

  const setIsModified = jest.fn();
  render(<AddSubjectCard isModified={false} setIsModified={setIsModified} role={"TEACHER"}/>);
  const addCardButton = screen.getByTestId("add-card-button-card");
  fireEvent.click(addCardButton);
  expect(setSubjectModal).toHaveBeenCalledWith(true);
});
