import  React, { useEffect } from "react";
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
    console.log("fetching data");
    const response = await axios.get(
      `http://127.0.0.1:8090/api/v1/subjects/${props.title}/evaluationMethods`
    );

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
    <div className="flex justify-evenly">
      <Chart
        width={"600px"}
        height={"400px"}
        chartType="PieChart"
        data={data}
        options={options}
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 1) {
                const [selectedItem] = selection;
                const dataTable = chartWrapper.getDataTable();
                if (dataTable === null) return;
                const { row } = selectedItem;
                const component: string | undefined = dataTable
                  .getValue(row, 0)
                  ?.toString();
                if (component === undefined) return;
                const value: number = Number(dataTable.getValue(row, 1));
                if (value === undefined) return;
                setValue(value);
                setSelectedComponent(component);
              }
            },
          },
        ]}
      />
      {selectedComponent !== "" && (
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <Space>
            <h1
              style={{ fontWeight: 600, fontSize: 20 }}
            >{`${selectedComponent}'s description`}</h1>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => {
                setResetFields(resetFields ? false : true);
                showModal();
              }}
            />
          </Space>
          <p className="max-w-sm">{descriptions[selectedComponent]}</p>
          <EvaluationEdit
            subjectTitle={props.title}
            title={selectedComponent}
            description={descriptions[selectedComponent]}
            value={value}
            isVisible={isModalOpen}
            setIsVisible={setIsModalOpen}
            isModified={props.isModified}
            setIsModified={props.setIsModified}
            resetFields={resetFields}
            setResetFields={setResetFields}
          />
        </div>
      )}
    </div>
  );
};

export default PieChart;
