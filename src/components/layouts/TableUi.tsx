"use client";

import * as React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { SafeTableRow, TableUIProps, Column, HistoryData } from "@/types";

/* -----------------------------
   EXPANDABLE ROW
------------------------------*/

function isHistoryData(value: unknown): value is HistoryData {
  return (
    typeof value === "object" &&
    value !== null &&
    "columns" in value &&
    "rows" in value
  );
}

function ExpandableRow<T extends SafeTableRow>({
  row,
  tableHeaders,
}: {
  row: T;
  tableHeaders: Column<T>[];
}) {
  const [open, setOpen] = React.useState(false);

  const history = row.history;

  if (!isHistoryData(history)) {
    return null;
  }

  return (
    <>
      {row.history && (
        <React.Fragment>
          <TableRow
            sx={{
              "& > .MuiTableCell-root": {
                borderBottom: "unset",
              },
            }}
          >
            <TableCell>
              <IconButton size="small" onClick={() => setOpen((prev) => !prev)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>

            {tableHeaders.map((col) => (
              <TableCell key={String(col.key)}>
                {row[col.key] as React.ReactNode}
              </TableCell>
            ))}
          </TableRow>

          {/* Expanded Content */}
          <TableRow>
            <TableCell
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={tableHeaders.length + 1}
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    History
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        {history.columns.map((column) => (
                          <TableCell key={column.key}>{column.label}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {history.rows.map((historyRow, index) => (
                        <TableRow key={index}>
                          {history.columns.map((column) => (
                            <TableCell key={column.key}>
                              {String(
                                historyRow[
                                  column.key as keyof typeof historyRow
                                ]
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      )}
    </>
  );
}

/* -----------------------------
   MAIN TABLE
------------------------------*/

export default function TableUi<T extends SafeTableRow>({
  tableHeaders,
  tableBody,
}: TableUIProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* Expand Button Column */}
            <TableCell />

            {tableHeaders.map((col) => (
              <TableCell key={String(col.key)}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tableBody.map((row) => (
            <ExpandableRow key={row.id} row={row} tableHeaders={tableHeaders} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
