import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { data, type CropData } from "../data/data";

interface AverageChartProps {
  colorScheme: "light" | "dark";
}

const AverageChart: React.FC<AverageChartProps> = ({ colorScheme }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  const averageProduction = (data: CropData[]) => {
    const cropMap: Record<string, { total: number; count: number }> = {};

    data.forEach(({ CropName, CropProductionTonnes }) => {
      if (typeof CropProductionTonnes === "number") {
        if (!cropMap[CropName]) {
          cropMap[CropName] = { total: 0, count: 0 };
        }
        cropMap[CropName].total += CropProductionTonnes;
        cropMap[CropName].count += 1;
      }
    });

    const crops = Object.keys(cropMap);
    const averages = crops.map(
      (crop) => cropMap[crop].total / cropMap[crop].count
    );

    return { crops, averages };
  };

  const renderChart = () => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    chartInstance.current = echarts.init(chartRef.current);

    const { crops, averages } = averageProduction(data);

    const textColor = colorScheme === "dark" ? "#ffffff" : "#000000";
    const barColor = colorScheme === "dark" ? "#ffffff" : "#000000";

    const option: echarts.EChartsOption = {
      backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
      title: {
        text: "Average Crop Production by Crop Name",
        left: "center",
        textStyle: {
          color: textColor,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      xAxis: {
        type: "category",
        data: crops,
        axisLabel: {
          rotate: 30,
          interval: 0,
          color: textColor,
        },
        axisLine: {
          lineStyle: {
            color: textColor,
          },
        },
      },
      yAxis: {
        type: "value",
        name: "Avg Production (Tonnes)",
        axisLabel: {
          color: textColor,
        },
        axisLine: {
          lineStyle: {
            color: textColor,
          },
        },
        splitLine: {
          lineStyle: {
            color: colorScheme === "dark" ? "#333" : "#ccc",
          },
        },
      },
      series: [
        {
          data: averages,
          type: "bar",
          itemStyle: {
            color: barColor,
          },
          barMaxWidth: "40%",
        },
      ],
    };

    chartInstance.current.setOption(option);
  };

  useEffect(() => {
    renderChart();

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [colorScheme]);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: 400, marginTop: 20 }}
      aria-label="Bar chart of average crop production"
    />
  );
};

export default AverageChart;
