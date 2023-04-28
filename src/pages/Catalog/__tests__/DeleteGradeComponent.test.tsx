import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteGrade from "../components/DeleteGrade";

describe("DeleteGrade component", () => {
  const props = {
    id: 1,
    fetchGrades: jest.fn(),
  };

  test("clicking delete button shows confirmation modal", () => {
    render(<DeleteGrade {...props} />);

    fireEvent.click(screen.getByTestId("trash_img"));

    expect(screen.getByText("Delete Grade")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete this grade?")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  test("clicking delete button and confirming should delete grade and close modal", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    render(<DeleteGrade {...props} />);

    fireEvent.click(screen.getByTestId("trash_img"));
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(props.fetchGrades).toHaveBeenCalledTimes(1);
    });
  });
});
