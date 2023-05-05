import { PieChart } from "react-minimal-pie-chart";
import { evaluationsArray } from "./SubjectAna";
import { useState } from "react";

function EvalPieChart(props: any) {
  const colors = ["#0000ff", "#000099", "#000033"];
  function createPieChartData(
    evaluationsArray: { component: string; value: number }[]
  ) {
    let evalData = [];
    for (let i = 0; i < evaluationsArray.length; i++) {
      evalData.push({
        title: evaluationsArray[i].component,
        value: evaluationsArray[i].value,
        color: colors[i],
      });
    }
    return evalData;
  }

  const [selectedSegment, setSelectedSegment] = useState<{
    component: string;
    value: number;
    description: string;
  } | null>(null);
  function handleSegmentClick(index: number) {
    const clickedEvaluation = evaluationsArray[index];
    setSelectedSegment(clickedEvaluation);
  }

  return (
    //<div className="evaluation-body">
    <div className="grid justify-center items-center grid-row-1 gap-5 grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2">
      <PieChart
        data={createPieChartData(evaluationsArray)}
        lineWidth={25}
        paddingAngle={3}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={(index) => ({
          fill: colors[index],
          fontSize: "0.35rem",
          fontFamily: "sans-serif",
        })}
        radius={25}
        labelPosition={110}
        totalValue={1}
        animate={true}
        animationDuration={400}
        background="#00000"
        onClick={(_, index) => {
          //afiseaza descrierea componentei
          console.log(`Selected index: ${index}`);
          console.log(evaluationsArray);
          handleSegmentClick(index);
          console.log(selectedSegment);
        }}
      />
      <div //className="evaluation-description"
      >
        {selectedSegment ? (
          <p>{selectedSegment.description}</p>
        ) : (
          <p className="items-center text-base text-center">
            Select a segment to view its description
          </p>
        )}
      </div>
    </div>
  );
}

export default EvalPieChart;
