import { Button } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import { columnNames } from "../utils/projectColumns";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const CustomToolbar = () => {
  const apiRef = useGridApiContext();

  const getRows = () => {
    const filterModel = apiRef.current.state.filter;
    const sortModel = apiRef.current.state.sorting;

    const filteredRowIds = Object.keys(filterModel.filteredRowsLookup).filter(
      (id) => filterModel.filteredRowsLookup[id] === true
    );

    const filteredSortedRows = sortModel.sortedRows
      .filter((id) => filteredRowIds.includes(id.toString()))
      .map((id) => apiRef.current.getRow(id));

    return filteredSortedRows;
  };

  const handleCSVExport = () => {
    const filteredSortedRows = getRows();

    const csv = [
      Object.keys(columnNames)
        .map((key) => `"${key}"`)
        .join(","),
      ...filteredSortedRows.map((row) => {
        return Object.values(columnNames)
          .map((value) => {
            return `"${row[value] ?? ""}"`;
          })
          .join(",");
      }),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "projects.csv");
  };

  const handleExcelExport = () => {
    const filteredSortedRows = getRows();

    const worksheet = XLSX.utils.json_to_sheet(
      filteredSortedRows.map((row) => {
        return Object.entries(columnNames).reduce((acc, [key, value]) => {
          acc[key] = Array.isArray(row[value])
            ? row[value].join(", ")
            : row[value] ?? "";
          return acc;
        }, {});
      }),
      { header: Object.keys(columnNames) }
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "projects.xlsx");
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <Button onClick={handleCSVExport}>Export to Csv</Button>
      <Button onClick={handleExcelExport}>Export to Excel</Button>
      <GridToolbarFilterButton />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
