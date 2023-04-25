import React from "react";
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import NetworkCard, { UserDataType } from './NetworkCard';
import UserHeader, {UserHeaderProps} from "./UserHeader";
import UserInfoFields from "./UserInfoFields";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("UserHeader", () =>{
  const userData = {
    username:"dianacuzic",
    firstname:"Diana",
    lastname:"Cuzic"
  };

  test("should render properly", () =>{
    render(
      <UserHeader
      username={userData.username}
      firstname={userData.firstname}
      lastname={userData.lastname}
      />
    );

    expect(screen.getByText("@" + userData.username)).toBeInTheDocument();  
    expect(screen.getByText(`${userData.firstname} ${userData.lastname}`)).toBeInTheDocument();  

  });
});

describe("NetworkCard dummy", () =>{
  const networkData = [
    {
      email: "diana.cuzic@gmail.com",
      firstName: "Diana",
      lastName: "Cuzic",
      username: "dianacuzic",
      office: "P1",
      department: "Secretary"
    },
    {
      email: "stefan.ciobaca@uaic.com",
      firstName: "Stefan",
      lastName: "Ciobaca",
      username: "stefan.ciobaca",
      title: "Prof",
      taughtSubjects: ["PA", "PF", "Logica"]
    },
    {
      email: "florin.eugen@uaic.ro",
      firstName: "Florin",
      lastName: "Rotaru",
      username: "florin02",
      year: 2,
      semester: 4,
      registrationNumber: "123FAKE92929",
      enrolledCourses: ["IP", "PA", "SGBD", "TW", "SE"]
    }
  ];

  test("should render properly", () => {
    render(
      <NetworkCard
        email={networkData[0].email}
        firstname={networkData[0].firstName}
        lastname={networkData[0].lastName}
        year={networkData[0].year}
        semester={networkData[0].semester}
        registrationNumber={networkData[0].registrationNumber}
        enrolledCourses={networkData[0].enrolledCourses}
      />
    );

    expect(screen.getByText(networkData[0].email)).toBeInTheDocument();  
    expect(screen.getByText(networkData[0].firstName)).toBeInTheDocument();  
    expect(screen.getByText(networkData[0].lastName)).toBeInTheDocument();  
    expect(screen.getByText(networkData[0].year)).toBeInTheDocument();  
    expect(screen.getByText(networkData[0].semester)).toBeInTheDocument();  
    expect(screen.getByText(networkData[0].registrationNumber)).toBeInTheDocument();  
    expect(screen.getByText(networkData[0].enrolledCourses[0])).toBeInTheDocument();  
  });
});

// describe("NetworkCard fetch", () =>{
//   const networkData = {
//     username: "string",
//     firstname: "string",
//     lastname: "string"
//   };

//   test("should render properly", () =>{
//     render(
//       <UserHeader
//       username={networkData.username}
//       firstname={networkData.firstname}
//       lastname={networkData.lastname}
//       />
//     );

//     expect(screen.getByText(networkData.username)).toBeInTheDocument();  
//     expect(screen.getByText(networkData.firstname)).toBeInTheDocument();  
//     expect(screen.getByText(networkData.lastname)).toBeInTheDocument();  

//   });
// });