/* eslint-disable jest/no-conditional-expect */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NetworkCard, { UserDataType } from "./NetworkCard";
import UserHeader, { UserHeaderProps } from "./UserHeader";
import UserInfoFields from "./UserInfoFields";

describe("UserHeader", () => {
  const userData = {
    username: "dianacuzic",
    firstname: "Diana",
    lastname: "Cuzic",
  };

  test("should render properly", () => {
    render(
      <UserHeader
        username={userData.username}
        firstname={userData.firstname}
        lastname={userData.lastname}
      />
    );

    expect(screen.getByText("@" + userData.username)).toBeInTheDocument();
    expect(
      screen.getByText(`${userData.firstname} ${userData.lastname}`)
    ).toBeInTheDocument();
  });
});

describe("NetworkCard dummy", () => {
  const networkData = [
    {
      email: "diana.cuzic@gmail.com",
      firstName: "Diana",
      lastName: "Cuzic",
      username: "dianacuzic",
      office: "P1",
      department: "Secretary",
    },
    {
      email: "stefan.ciobaca@uaic.com",
      firstName: "Stefan",
      lastName: "Ciobaca",
      username: "stefan.ciobaca",
      title: "Prof",
      taughtSubjects: ["PA", "PF", "Logica"],
    },
    {
      email: "florin.eugen@uaic.ro",
      firstName: "Florin",
      lastName: "Rotaru",
      username: "florin02",
      year: 2,
      semester: 4,
      registrationNumber: "123FAKE92929",
      enrolledCourses: ["IP", "PA", "SGBD", "TW", "SE"],
    },
  ];

  test("should render properly", () => {
    render(<NetworkCard />);

    networkData.forEach((data) => {
      expect(screen.getByText(data.email)).toBeInTheDocument();
      expect(screen.getByText(data.firstName)).toBeInTheDocument();
      expect(screen.getByText(data.lastName)).toBeInTheDocument();
      data.year && expect(screen.getByText(data.year)).toBeInTheDocument();
      data.semester &&
        expect(screen.getByText(data.semester)).toBeInTheDocument();
      data.registrationNumber &&
        expect(screen.getByText(data.registrationNumber)).toBeInTheDocument();
      data.enrolledCourses &&
        data.enrolledCourses[0] &&
        expect(
          screen.getByText(new RegExp(data.enrolledCourses[0], "i"))
        ).toBeInTheDocument();
    });
  });
});
