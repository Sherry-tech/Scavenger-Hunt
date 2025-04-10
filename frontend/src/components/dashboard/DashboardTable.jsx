import React from "react";
import {
 TableContainer,
 Table as MuiTable,
 TableHead,
 TableRow,
 TableCell,
 TableBody,
 Avatar,
 Paper,
 Typography,
} from "@mui/material";

// Common styles object for table cells and headers
const tableCellStyles = {
 fontWeight: 600,
 fontSize: 14,
 color: "#636363",
 fontFamily: "Poppins, sans-serif",
 backgroundColor: "#DCDCDC",
};

const tableHeaderStyles = {
 ...tableCellStyles,
 color: "black", // Header text color
 backgroundColor: "#CDCDCD", // Header background color
};

const approvedButtonStyles = {
 backgroundColor: "#898989",
 color: "white",
 borderRadius: 4,
 padding: "4px 8px",
 textAlign: "center",
 fontFamily: "Poppins, sans-serif",
};

const tableData = [
 {
  huntName: "Burr's Hill - Royal Pokan...",
  participant: "John Smith",
  location: "Bristol",
  status: "Approved",
 },
 {
  huntName: "Another Hunt Name...",
  participant: "Jane Doe",
  location: "Newport",
  status: "Approved",
 },
 {
  huntName: "Hunt in Kent",
  participant: "John Smith",
  location: "Kent",
  status: "Approved",
 },
 {
  huntName: "Washington Hunt",
  participant: "John Smith",
  location: "Washington",
  status: "Approved",
 },
 {
  huntName: "Washington Hunt",
  participant: "John Smith",
  location: "Washington",
  status: "Approved",
 },
 {
  huntName: "Washington Hunt",
  participant: "John Smith",
  location: "Washington",
  status: "Approved",
 },
 {
  huntName: "Washington Hunt",
  participant: "John Smith",
  location: "Washington",
  status: "Approved",
 },
];

const DashboardTable = () => {
 return (
  <TableContainer
   component={Paper}
   sx={{
    backgroundColor: "#DCDCDC",
    borderRadius: 2,
    boxShadow: 3,
    overflow: "hidden",
   }}
  >
   <MuiTable>
    {/* Table Header */}
    <TableHead>
     <TableRow>
      <TableCell sx={tableHeaderStyles}>Hunt Name</TableCell>
      <TableCell sx={tableHeaderStyles}>Participants</TableCell>
      <TableCell sx={tableHeaderStyles}>Location</TableCell>
      <TableCell sx={tableHeaderStyles}>Status</TableCell>
     </TableRow>
    </TableHead>

    {/* Table Body */}
    <TableBody>
     {tableData.map((row, index) => (
      <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#E0E0E0" } }}>
       <TableCell sx={tableCellStyles}>
        <div style={{ display: "flex", alignItems: "center" }}>
         <Avatar
          sx={{ width: 40, height: 40, marginRight: 2 }}
          alt={row.huntName}
          src=""
         />
         <Typography variant="body2" sx={{ textTransform: "capitalize", fontFamily: "Poppins, sans-serif", color: "black" }}>
          {row.huntName}
         </Typography>
        </div>
       </TableCell>
       <TableCell sx={tableCellStyles}>
        <Typography variant="body2" sx={{ textTransform: "capitalize", fontFamily: "Poppins, sans-serif", color: "black" }}>
         {row.participant}
        </Typography>
       </TableCell>
       <TableCell sx={tableCellStyles}>
        <Typography variant="body2" sx={{ textTransform: "capitalize", fontFamily: "Poppins, sans-serif", color: "black" }}>
         {row.location}
        </Typography>
       </TableCell>
       <TableCell>
        <div style={approvedButtonStyles}>{row.status}</div>
       </TableCell>
      </TableRow>
     ))}
    </TableBody>
   </MuiTable>
  </TableContainer>
 );
};

export default DashboardTable;