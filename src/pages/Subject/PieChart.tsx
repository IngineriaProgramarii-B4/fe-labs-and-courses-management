import {PieChart} from 'react-minimal-pie-chart';

function EvalPieChart() {

  const dataMock = [
      { title: 'One', value: 10, color: '#0000ff' },
      { title: 'Two', value: 15, color: '#000099' },
      { title: 'Three', value: 20, color: '#000033' },
  ];


  return (
    <PieChart
      data={dataMock}
      lineWidth={25}
      paddingAngle={5}
      label={({ dataEntry }) => dataEntry.value}
      labelStyle={(index) => ({
        fill: dataMock[index].color,
        fontSize: '5px',
        fontFamily: 'sans-serif',
      })}
      radius={42}
      labelPosition={112}
    />
  );
}

export default EvalPieChart;