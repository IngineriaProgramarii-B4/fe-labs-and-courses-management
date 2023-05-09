import axios from "axios";
import {fireEvent, render, screen} from "@testing-library/react";
import PieChart from "../PieChart";

jest.mock("axios");

describe("PieChart component", () => {
    const mockedData = [
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
        setIsModified: jest.fn()
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

        (axios.get as jest.Mock).mockResolvedValue({data: mockedData});

        render(<PieChart {...props1}/>);

        const pieChartElement = screen.getByTestId("pie-chart");
        expect(pieChartElement).toBeInTheDocument();
        
    });

    
});