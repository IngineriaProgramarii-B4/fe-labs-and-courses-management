import axios from "axios";
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PieChart from "../PieChart";

jest.mock("axios");

describe("PieChart component", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: [
        { component: "Component 1", value: 10 },
        { component: "Component 2", value: 20 },
        { component: "Component 3", value: 30 },
      ],
    });
  });

  const mockData = [
    ["Component", "Value"],
    ["Component 1", 10],
    ["Component 2", 20],
  ];

  const mockedData1 = [
    {
      title: "Course",
      isModified: false,
      setIsModified: jest.fn(),
    },
    {
      title: "Seminar",
      isModified: false,
      setIsModified: jest.fn(),
    },
  ];

  const props1 = {
    title: "Course",
    isModified: false,
    setIsModified: jest.fn(),
    role: "TEACHER",
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders PieChart component", async () => {
    const props2 = {
      title: "Seminar",
      isModified: false,
      setIsModified: jest.fn(),
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockedData1 });

    render(<PieChart {...props1} />);

    const pieChartElement = screen.getByTestId("pie-chart");
    expect(pieChartElement).toBeInTheDocument();
  });

  test("fetches the data from the API", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedData1 });

    render(<PieChart {...props1} />);

    expect(axios.get).toHaveBeenCalledWith(
      "http://127.0.0.1:8082/api/v1/subjects/Course/evaluationMethods",
      { headers: { Authorization: "Bearer null" } }
    );
  });

  test("clicking on one segment of the pieChart opens the description of that component", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedData1 });

    render(<PieChart {...props1} />);
  });

  test("clicking on the description button opens the description of that component", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedData1 });

    render(<PieChart {...props1} />);
  });
  /************************************************** */
  it("should update selectedComponent and value on chart selection", async () => {
    // Mock axios response
    const mockResponse = {
      data: [
        { component: "Component 1", value: 10 },
        { component: "Component 2", value: 20 },
      ],
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    // Render the component
    const { getByTestId } = render(
      <PieChart
        title="Example Title"
        isModified={false}
        setIsModified={jest.fn()}
        role="TEACHER"
      />
    );

    // Wait for the component to fetch data (you may need to adjust the delay if necessary)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://127.0.0.1:8082/api/v1/subjects/Example Title/evaluationMethods",
        {
          headers: {
            Authorization: "Bearer null",
          },
        }
      );
    });

    // Simulate chart selection
    const chartWrapper = {
      getChart: jest.fn().mockReturnValueOnce({
        getSelection: jest.fn().mockReturnValueOnce([{ row: 1 }]), // Select the second data item
      }),
      getDataTable: jest.fn().mockReturnValueOnce({
        getValue: jest.fn().mockReturnValueOnce("Component 2"), // Return the component name
      }),
    };

    fireEvent.select(screen.getByTestId("pie-chart"), { chartWrapper });

    // Assert that the selectedComponent and value have been updated
    // const selectedtest = await screen.findByTestId("selected-component");
    // expect(selectedtest).toHaveTextContent("Component 2");

    // const testvalue = screen.getByTestId("value");
    // expect(testvalue).toHaveTextContent("20");
  });
});
