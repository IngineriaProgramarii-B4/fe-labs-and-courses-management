import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home", () => {
  test("renders Home component", () => {
    render(<Home />);
    expect(screen.getByText("uniManager")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Unlock your academic potential with our all-in-one university app. Connect, learn, and thrive in one seamless platform!"
      )
    ).toBeInTheDocument();
  });

  test("renders image", () => {
    render(<Home />);
    const imageElement = screen.getByAltText("Students");
    expect(imageElement).toBeInTheDocument();
  });
});
