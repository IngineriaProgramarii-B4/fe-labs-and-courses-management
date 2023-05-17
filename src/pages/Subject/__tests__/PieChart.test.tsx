import axios from "axios";
import {fireEvent, render, screen, act} from "@testing-library/react";
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
        ['Component', 'Value'],
        ['Component 1', 10],
        ['Component 2', 20],
      ];

      const mockedData1 = [
        {
            title: "Course",
            isModified: false,
            setIsModified: jest.fn()
        },
        {
            title: "Seminar",
            isModified: false,
            setIsModified: jest.fn()
        }
    ];

    const props1 = {
        title: "Course",
        isModified: false,
        setIsModified: jest.fn(),
        role: "TEACHER"
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    
    test("renders PieChart component", async () => {
        const props2 = {
            title: "Seminar",
            isModified: false,
            setIsModified: jest.fn()
        };

        (axios.get as jest.Mock).mockResolvedValue({data: mockedData1});

        render(<PieChart {...props1}/>);

        const pieChartElement = screen.getByTestId("pie-chart");
        expect(pieChartElement).toBeInTheDocument();
        
    });

    test("fetches the data from the API", async () => {
        (axios.get as jest.Mock).mockResolvedValue({data: mockedData1});

        render (<PieChart {...props1}/>);

        expect(axios.get).toHaveBeenCalledWith(
            "http://127.0.0.1:8082/api/v1/subjects/Course/evaluationMethods", {"headers": {"Authorization": "Bearer null"}});
    });

    test("clicking on one segment of the pieChart opens the description of that component", async () => {
        (axios.get as jest.Mock).mockResolvedValue({data: mockedData1});

        render(<PieChart {...props1}/>);
        
    });

    test("clicking on the description button opens the description of that component", async () => {
        (axios.get as jest.Mock).mockResolvedValue({data: mockedData1});

        render(<PieChart {...props1}/>);
    });
});