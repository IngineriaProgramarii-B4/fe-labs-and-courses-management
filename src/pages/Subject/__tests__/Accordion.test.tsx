import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Accordion from "../Accordion";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Form, Select } from "antd";

jest.mock("axios");

const mock = new MockAdapter(axios);

// Mock props
const props = {
  components: ["Seminar"],
  title: "Some title",
  isModified: false,
  setIsModified: jest.fn(),
  role:"TEACHER",
};

describe("Accordion", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should render Acoordion component", async () => {
    //axiosInstanceMock.create.mockReturnValue(axiosInstance);
    render(
      <Accordion
        components={["Seminar"]}
        title={"Maths"}
        isModified={false}
        setIsModified={jest.fn}
        role={"TEACHER"}
      />
    );
    //screen.debug();
    //await waitFor(() => expect(axiosInstance.get).toHaveBeenCalled());
    const accordionElement = screen.getByTestId("accordion-1");
    expect(accordionElement).toBeInTheDocument();
  });

  // Test showAddModal function
  it("should open the add modal when add button is clicked", async () => {
    render(<Accordion {...props} />);
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
  });

  // Test hideAddModal function
  it("should close the add modal when cancel button is clicked", async () => {
    render(<Accordion {...props} />);
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    /*
    await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
    */
  });

  // Test saveComponent function
  it("should save the new component and update the state when form is submitted", async () => {
    axios.post(
      `http://localhost:8082/api/v1/subjects/${props.title}/components`
    );
    axios.post(
      `http://localhost:8082/api/v1/subjects/${props.title}/evaluationMethods`
    );
    render(<Accordion {...props} />);
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    const typeInput = screen.getByLabelText("Component Type");
    fireEvent.change(typeInput, { target: { value: "New Component" } });
    const numberInput = screen.getByLabelText("Number of Weeks");
    fireEvent.change(numberInput, { target: { value: 2 } });
    const percentageInput = screen.getByLabelText("Percentage of Final Grade");
    fireEvent.change(percentageInput, { target: { value: 50 } });
    const descriptionInput = screen.getByLabelText("Evaluation Description");
    fireEvent.change(descriptionInput, {
      target: { value: "Some description" },
    });

    const submitButton = screen.getByText("Add");
    fireEvent.click(submitButton);

    /* await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeVisible();
    });
    */
    //expect(props.setIsModified).toHaveBeenCalledWith(true);
  });

  test("renders the Accordion component with the correct props", () => {
    const components = ["Course"];
    const title = "Maths";
    render(
      <Accordion
        components={components}
        title={title}
        isModified={false}
        setIsModified={jest.fn}
        role={"TEACHER"}
      />
    );
  });

  test("should  open the modal for the new component", async () => {
    render(
      <Accordion
        components={["Course"]}
        title={"Maths"}
        isModified={false}
        setIsModified={jest.fn}
        role={"TEACHER"}
      />
    );
    const addComponent = screen.getByTestId("add-button");
    fireEvent.click(addComponent);
    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });

  // deleter a component
  /*
  it("should delete the component when trash button is clicked", async () => {
    render(<Accordion {...props} />);
    const component = screen.getByText("Seminar");
    fireEvent.click(component);
    const deletebutton = screen.getByTestId("delete");
    fireEvent.click(deletebutton);
    expect(component).not.toBeInTheDocument();
  });
  */

  /*
  test("should  open the modal for the new resource", async () => {
    render(<Accordion components={["Course"]} title={"Maths"} />);
    const addComponent = screen.getByTestId("add-button");
    fireEvent.click(addComponent);
    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });
  */
  /*
  test("renders delete modal when the 'Delete' button is clicked", async () => {
    const { getByTestId } = render(
      <Accordion
        components={["Course", "Seminar"]}
        title="My title"
        isModified={false}
        setIsModified={() => {}}
      />
    );
    const component = screen.getByText("Course");
    fireEvent.click(component);
    const deleteButton = screen.getAllByTestId("delete")[0];
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
    });
  });
  */
  /*
  test("calls the 'setIsModified' function when a new component is added", async () => {
    const setIsModifiedMock = jest.fn();
    const { getByTestId } = render(
      <Accordion
        components={["Course", "Seminar"]}
        title="My title"
        isModified={false}
        setIsModified={setIsModifiedMock}
      />
    );
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    const typeInput = screen.getByTestId("type-input");
    fireEvent.change(typeInput, { target: { value: "Laboratory" } });
    const numberOfWeeksInput = screen.getByTestId("number-of-weeks-input");
    fireEvent.change(numberOfWeeksInput, { target: { value: 5 } });
    const addButtonModal = screen.getByTestId("add-button-modal");
    fireEvent.click(addButtonModal);
    await waitFor(() => {
      expect(setIsModifiedMock).toHaveBeenCalledTimes(1);
    });
  });
  */
  /*
  test("calls the 'setIsModified' function when a component is deleted", async () => {
    const setIsModifiedMock = jest.fn();
    const { getByTestId } = render(
      <Accordion
        components={["Course", "Seminar"]}
        title="My title"
        isModified={false}
        setIsModified={setIsModifiedMock}
      />
    );
    const deleteButton = screen.getAllByTestId("delete")[0];
    fireEvent.click(deleteButton);
    const deleteButtonModal = screen.getByTestId("delete-button-modal");
    fireEvent.click(deleteButtonModal);
    await waitFor(() => {
      expect(setIsModifiedMock).toHaveBeenCalledTimes(1);
    });
  });
  */
});

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
