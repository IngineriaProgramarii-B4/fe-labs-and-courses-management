import React, { useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EvaluationEdit from "./EvaluationEdit";

const options = {
  pieHole: 0.4,
  is3D: false,
  backgroundColor: "",
  pieSliceTextStyle: {
    color: "black",
  },
  legend: {
    position: "left",
    textStyle: {
      color: "black",
      fontSize: 16,
    },
  },
};

interface PieChartProps {
  title: string;
  isModified: boolean;
  setIsModified: (isModified: boolean) => void;
  role: String;
}

const PieChart: React.FC<PieChartProps> = (props) => {
  const [data, setData] = React.useState<any>([]);
  const [descriptions, setDescriptions] = React.useState<any>({});
  const [selectedComponent, setSelectedComponent] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(0);
  const [resetFields, setResetFields] = React.useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchData = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8082/api/v1/subjects/${props.title}/evaluationMethods`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
      setSelectedComponent("");
    const allData = response.data;
    const formattedData = allData.map((item: any) => {
      setDescriptions((prev: any) => {
        return {
          ...prev,
          [item.component]: item.description,
        };
      });
      return [item.component, item.value];
    });
    formattedData.unshift(["Component", "Value"]);
    setData(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, [props.isModified]);
  return (
    <div className="flex justify-evenly" data-testid="pie-chart">
      <Chart
      // ...
      />
      {selectedComponent !== "" && (
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <Space>
            <h1
              style={{ fontWeight: 600, fontSize: 20 }}
              data-testid="selected-component"
            >{`${selectedComponent}'s description`}</h1>
            {/* ... */}
          </Space>
          {/* ... */}
        </div>
      )}
      {selectedComponent !== "" && (
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <Space>{/* ... */}</Space>
          <p className="max-w-sm" data-testid="value">
            {descriptions[selectedComponent]}
          </p>
          {/* ... */}
        </div>
      )}
    </div>
  );
};

export default PieChart;
