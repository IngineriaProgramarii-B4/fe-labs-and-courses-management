import  React from "react";
import axios from "axios";
import {Chart} from "react-google-charts";
import { useState, useEffect } from "react";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

const options = {
  pieHole: 0.5,
  is3D: false,
  backgroundColor: '',
  pieSliceTextStyle: {
    color: 'black'
  },
  legend: {
    position: 'left',
    textStyle: {
      color: 'black',
      fontSize: 16
    }
  },
};

interface PieChartProps {
  title : string;

}

const PieChart: React.FC<PieChartProps> = (props) => {
  const [data, setData] = React.useState<any>([]);
  const [descriptions, setDescriptions] = React.useState<any>({});
  const [selectedComponent, setSelectedComponent] = React.useState<string>('');
 
   const fetchData = async () => {
     const response = await axios.get(`http://127.0.0.1:8090/api/v1/subjects/${props.title}/evaluationMethods`);
 
     const allData = response.data;
     const formattedData = allData.map((item: any) => {
       setDescriptions((prev: any) => {
         return {
           ...prev,
           [item.component]: item.description
         }
       })
       return [item.component, item.value]
     });
     formattedData.unshift(['Component', 'Value']);
     setData(formattedData);
   }


 
   useEffect(() => {
     fetchData();
   }, [props.title]);
 
   return (
     <div className="flex justify-evenly">
       <Chart 
         width={'500px'}
         height={'300px'}
         chartType='PieChart'
         data={data}
         options={options}
         chartEvents={[
           {
             eventName: 'select',
             callback: ({chartWrapper}) => {
               const chart = chartWrapper.getChart();
               const selection = chart.getSelection();
               if (selection.length === 1) {
                 const [selectedItem] = selection;
                 const dataTable = chartWrapper.getDataTable();
                 if(dataTable === null) return;
                 const {row} = selectedItem;
                 const component: string|undefined = dataTable.getValue(row, 0)?.toString();
                 if(component === undefined) return;
                 setSelectedComponent(component);
               }
             }
 
           }
         ]}
       />
       {
          selectedComponent !== '' && (
       <div className="flex flex-col justify-center items-center">
        <h1 style={{ fontWeight: 600, fontSize: 20 }}>{`${selectedComponent}'s description`}</h1>
        <p>{descriptions[selectedComponent]}</p>
       </div>)
      }
       {/* { <MyVerticallyCenteredModal
          title={} } */}
     </div>
   );
 }

// function EvalPieChart(props: any) {
//   const colors = ["#0000ff", "#000099", "#000033"];
//   function createPieChartData(
//     evaluationsArray: { component: string; value: number }[]
//   ) {
//     let evalData = [];
//     for (let i = 0; i < evaluationsArray.length; i++) {
//       evalData.push({
//         title: evaluationsArray[i].component,
//         value: evaluationsArray[i].value,
//         color: colors[i],
//       });
//     }
//     return evalData;
//   }

//   const [selectedSegment, setSelectedSegment] = useState<{
//     component: string;
//     value: number;
//     description: string;
//   } | null>(null);
//   function handleSegmentClick(index: number) {
//     const clickedEvaluation = evaluationsArray[index];
//     setSelectedSegment(clickedEvaluation);
//   }

//   return (
//     //<div className="evaluation-body">
//     <div className="grid justify-center items-center grid-row-1 gap-5 grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2">
//       <PieChart
//         data={createPieChartData(evaluationsArray)}
//         lineWidth={25}
//         paddingAngle={3}
//         label={({ dataEntry }) => dataEntry.value}
//         labelStyle={(index) => ({
//           fill: colors[index],
//           fontSize: "0.35rem",
//           fontFamily: "sans-serif",
//         })}
//         radius={25}
//         labelPosition={110}
//         totalValue={1}
//         animate={true}
//         animationDuration={400}
//         background="#00000"
//         onClick={(_, index) => {
//           //afiseaza descrierea componentei
//           console.log(`Selected index: ${index}`);
//           console.log(evaluationsArray);
//           handleSegmentClick(index);
//           console.log(selectedSegment);
//         }}
//       />
//       <div //className="evaluation-description"
//       >
//         {selectedSegment ? (
//           <p>{selectedSegment.description}</p>
//         ) : (
//           <p className="items-center text-base text-center">
//             Select a segment to view its description
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

export default PieChart;
