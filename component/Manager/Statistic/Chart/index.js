import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "./styles";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const Chart = (props) => {
  const turnover = props.turnover
  const moneyData = []
  for(let i = 0; i<12; i++)moneyData.push(turnover[i].money)
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };
  return (
    <View style={styles.chart}>
      <LineChart
        data={{
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          datasets: [
            {
              data: moneyData,
            },
          ],
        }}
        width={600} // from react-native
        height={220}
        yAxisSuffix="₫"
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Chart;
