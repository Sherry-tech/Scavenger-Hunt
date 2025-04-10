// components/users/UserTable.jsx
import React, { useState, useMemo } from 'react';
import {
 TableContainer,
 Table as MuiTable,
 TableHead,
 TableRow,
 TableCell,
 TableBody,
 TableFooter,
 Paper,
 Box,
 Typography,
 IconButton,
 Select,
 MenuItem,
} from '@mui/material';
import { CustomPaginationActions } from '../common/CustomPagination';
import { Edit } from '@mui/icons-material';

const UserTable = ({ data, searchQuery }) => {
 // State variables
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(5);

 // Pagination handlers
 const handleChangePage = (event, newPage) => setPage(newPage);
 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
 };

 // Filtering data based on search query
 const filteredData = useMemo(() => {
  return data.filter((row) =>
   row.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
 }, [data, searchQuery]);

 // Paginating the filtered data
 const paginatedData = useMemo(() => {
  const start = page * rowsPerPage;
  return filteredData.slice(start, start + rowsPerPage);
 }, [filteredData, page, rowsPerPage]);

 return (
  <TableContainer
   component={Paper}
   sx={{
    borderRadius: 2,
    boxShadow: 3,
    backgroundColor: '#DCDCDC',
    fontFamily: 'Poppins, sans-serif',
   }}
  >
   <MuiTable sx={{ backgroundColor: '#DCDCDC' }}>
    {/* Table Head */}
    <TableHead>
     <TableRow>
      {['User Name', 'User Email', 'Creation Date', 'Role', 'Actions'].map((header) => (
       <TableCell
        key={header}
        sx={{
         fontWeight: 'bold',
         backgroundColor: '#DCDCDC',
         fontFamily: 'Poppins, sans-serif',
        }}
       >
        {header}
       </TableCell>
      ))}
     </TableRow>
    </TableHead>

    {/* Table Body */}
    <TableBody>
     {paginatedData.map((row, index) => (
      <TableRow key={index}>
       <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
        {row.userName}
       </TableCell>
       <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
        {row.userEmail}
       </TableCell>
       <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
        {row.creationDate}
       </TableCell>
       <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
        {row.role}
       </TableCell>
       <TableCell>
        <Box sx={{ display: 'flex', gap: 1 }}>
         <IconButton>
          <Edit />
         </IconButton>
         {/* Add other action icons if needed */}
        </Box>
       </TableCell>
      </TableRow>
     ))}
    </TableBody>

    {/* Table Footer with Pagination */}
    <TableFooter>
     <TableRow>
      <TableCell colSpan={5}>
       <Box
        sx={{
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         fontFamily: 'Poppins, sans-serif',
        }}
       >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
         <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
          Items per page:
         </Typography>
         <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          sx={{
           backgroundColor: 'white',
           borderRadius: '4px',
           fontFamily: 'Poppins, sans-serif',
          }}
         >
          {[2, 5, 10, 25].map((option) => (
           <MenuItem
            key={option}
            value={option}
            sx={{ fontFamily: 'Poppins, sans-serif' }}
           >
            {option}
           </MenuItem>
          ))}
         </Select>
        </Box>
        <CustomPaginationActions
         count={filteredData.length}
         page={page}
         rowsPerPage={rowsPerPage}
         onPageChange={handleChangePage}
        />
       </Box>
      </TableCell>
     </TableRow>
    </TableFooter>
   </MuiTable>
  </TableContainer>
 );
};

export default UserTable;
