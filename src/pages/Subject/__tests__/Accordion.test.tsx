import { render, screen, waitFor } from "@testing-library/react";
import Accordion from "../Accordion";
import axios, { AxiosInstance } from "axios";

//  jest.mock("axios");
//  const axiosInstanceMock = axios as jest.Mocked<typeof axios>;

describe("Accordion", () => {
  // function createMockedAxiosInstance(): jest.Mocked<AxiosInstance> {
  //   const instance = axios.create();
  //   return {
  //     ...instance,
  //     get: jest.fn(),
  //     put: jest.fn(),
  //   } as unknown as jest.Mocked<AxiosInstance>;
  // }

  // let axiosInstance: jest.Mocked<AxiosInstance>;
  // beforeEach(() => {
  //   axiosInstance = createMockedAxiosInstance();

  //   axiosInstanceMock.create.mockReturnValue(axiosInstance);
  //   axiosInstance.get.mockResolvedValue({
  //     data: [
  //       {
  //         title:"Course Title",

  //       },
  //     ],
  //     status: 200,
  //     statusText: "OK",
  //     config: {},
  //     headers: {},
  //   });
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  test("should render Acoordion component", async () => {
    //axiosInstanceMock.create.mockReturnValue(axiosInstance);
    render(<Accordion components={["Course"]} title={"Maths"} />);
    //screen.debug();
    //await waitFor(() => expect(axiosInstance.get).toHaveBeenCalled());
    const accordionElement = screen.getByTestId("accordion-1");
    expect(accordionElement).toBeInTheDocument();
  });

  it("renders the Accordion component with the correct props", () => {
    const components = ["Course"];
    const title = "Maths";
    const { getByTestId } = render(
      <Accordion components={components} title={title} />
    );
  });
});

// import React from "react";
// import { shallow, ShallowWrapper } from "enzyme";
// import axios from "axios";
// import { Collapse, Button, Modal, Input, Form, Select, Popconfirm } from "antd";
// import Accordion, { AccordionProps } from "../Accordion";

// jest.mock("axios");

// describe("Accordion", () => {
//   let wrapper: ShallowWrapper<AccordionProps>;

//   const props: AccordionProps = {
//     components: ["Course", "Seminar", "Laboratory"],
//     title: "Some Title",
//   };

//   beforeEach(() => {
//     wrapper = shallow(<Accordion {...props} />);
//   });

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   describe("Rendering", () => {
//     it("renders without crashing", () => {
//       expect(wrapper).toHaveLength(1);
//     });

//     it("renders the main accordion", () => {
//       expect(wrapper.find(Collapse).hasClass("main-accordion")).toBe(true);
//     });

//     it("renders a button to add a component if there are less than 3 components", () => {
//       const addButton = wrapper.find(Button);
//       expect(addButton.prop("children")).toEqual("Add Component");
//     });

//     it("does not render a button to add a component if there are 3 components", () => {
//       wrapper.setProps({ components: ["Course", "Seminar", "Laboratory"] });
//       const addButton = wrapper.find(Button);
//       expect(addButton.exists()).toBe(false);
//     });

//     it("renders a modal to add a component when the add component button is clicked", () => {
//       wrapper.find(Button).simulate("click");
//       expect(wrapper.find(Modal).prop("title")).toEqual("Add Component");
//     });
//   });
