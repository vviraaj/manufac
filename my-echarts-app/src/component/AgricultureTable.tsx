import { Table } from "@mantine/core";
import { data, type CropData } from "../data/data";

interface newAgricultureData {
  year: string;
  maxCrop: string;
  minCrop: string;
}

const trimYear = (year: string) =>
  year.replace("Financial Year (Apr - Mar), ", "").trim();

const newAgricultureDataSaturated = (data: CropData[]) => {
  const yearMap: Record<string, CropData[]> = {};

  data.forEach((item) => {
    const year = trimYear(item.Year);
    if (!yearMap[year]) {
      yearMap[year] = [];
    } else {
      yearMap[year].push(item);
    }
  });

  const results: newAgricultureData[] = [];

  Object.entries(yearMap).forEach(([year, crops]) => {
    const validCrops = crops.filter(
      (crop) => typeof crop.CropProductionTonnes === "number"
    );

    if (validCrops.length === 0) return;

    const maxCrop = [...validCrops].sort(
      (a, b) =>
        (b.CropProductionTonnes as number) - (a.CropProductionTonnes as number)
    )[0].CropName;

    const minCrop = [...validCrops].sort(
      (a, b) =>
        (a.CropProductionTonnes as number) - (b.CropProductionTonnes as number)
    )[0].CropName;

    results.push({
      year,
      maxCrop,
      minCrop,
    });
  });

  return results;
};

const AgricultureTable = () => {
  const newAgricultureDatas = newAgricultureDataSaturated(data);

  return (
    <Table
      withColumnBorders
      style={{
        border: "1px solid #ccc",
        borderCollapse: "collapse",
        width: "100%",
      }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ border: "1px solid #ccc" }}>Year</Table.Th>
          <Table.Th style={{ border: "1px solid #ccc" }}>
            Crop with Max Production
          </Table.Th>
          <Table.Th style={{ border: "1px solid #ccc" }}>
            Crop with Min Production
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {newAgricultureDatas.map((row) => (
          <Table.Tr key={row.year}>
            <Table.Td style={{ border: "1px solid #ccc" }}>{row.year}</Table.Td>
            <Table.Td style={{ border: "1px solid #ccc" }}>{row.maxCrop}</Table.Td>
            <Table.Td style={{ border: "1px solid #ccc" }}>{row.minCrop}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default AgricultureTable;
