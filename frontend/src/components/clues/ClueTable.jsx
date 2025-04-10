// components/clues/ClueTable.jsx
import React, { useState } from 'react';
import {
 TableContainer,
 Table as MuiTable,
 TableHead,
 TableRow,
 TableCell,
 TableBody,
 TableFooter,
 Paper,
 Typography,
 Box,
 IconButton,
 Select,
 MenuItem,
 TextField,
 Button,
 InputAdornment,
} from '@mui/material';
import { CustomPaginationActions } from '../common/CustomPagination';
import { EditOutlined } from '@mui/icons-material';
import CreateNewClueModal from './CreateNewClueModal';

const ClueTable = ({
 data,
 searchQuery,
 setSearchQuery,
 page,
 setPage,
 limit,
 setLimit,
 totalPages,
}) => {
 // State variables
 const [openModal, setOpenModal] = useState(false);
 const [selectedClueData, setSelectedClueData] = useState(null);

 // Handle modal close
 const handleCloseModal = () => {
  setOpenModal(false);
  setSelectedClueData(null);
 };

 // Handle page change
 const handleChangePage = (event, newPage) => {
  setPage(newPage + 1); // Adjust for zero-based index
 };

 // Handle rows per page change
 const handleChangeRowsPerPage = (event) => {
  setLimit(parseInt(event.target.value, 10));
  setPage(1);
 };

 return (
  <>
   <TableContainer
    component={Paper}
    sx={{
     borderRadius: 2,
     boxShadow: 3,
     backgroundColor: '#DCDCDC',
     fontFamily: 'Poppins, sans-serif',
    }}
   >
    {/* Search and Filter Bar */}
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 2,
      fontFamily: 'Poppins, sans-serif',
     }}
    >
     {/* Left Side: All Clues Text */}
     <Typography variant="h5" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
      All Clues
     </Typography>

     {/* Right Side: Filters and Actions */}
     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {/* Search Input with Search Icon */}
      <TextField
       variant="outlined"
       placeholder="Search By Name..."
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       sx={{ fontFamily: 'Poppins, sans-serif' }}
       InputProps={{
        endAdornment: (
         <InputAdornment position="end">
          <IconButton>
           <img src="/search.svg" alt="Search" />
          </IconButton>
         </InputAdornment>
        ),
       }}
      />

      {/* Add New Clue Button */}
      <Button
       variant="contained"
       onClick={() => setOpenModal(true)}
       sx={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        fontFamily: 'Poppins, sans-serif',
        textTransform: 'none',
        '&:hover': { backgroundColor: '#333333' },
        padding: '8px 16px',
       }}
      >
       Add New Clue
      </Button>
     </Box>
    </Box>

    {/* Table */}
    <MuiTable sx={{ backgroundColor: '#DCDCDC' }}>
     {/* Table Head */}
     <TableHead>
      <TableRow>
       {['Clues', 'Location Name', 'Points', 'Hint', 'Actions'].map((header) => (
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
      {data.length === 0 ? (
       <TableRow>
        <TableCell colSpan={5} align="center">
         No clues found.
        </TableCell>
       </TableRow>
      ) : (
       data.map((row, index) => (
        <TableRow key={index}>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.clue}</TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.locationName}</TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.points}</TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.hint}</TableCell>
         <TableCell>
          <Box sx={{ display: 'flex', gap: 1 }}>
           <IconButton
            onClick={() => {
             setSelectedClueData(row);
             setOpenModal(true);
            }}
           >
            <EditOutlined />
           </IconButton>
          </Box>
         </TableCell>
        </TableRow>
       ))
      )}
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
          <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>Items per page:</Typography>
          <Select
           value={limit}
           onChange={handleChangeRowsPerPage}
           sx={{
            backgroundColor: 'white',
            borderRadius: '4px',
            fontFamily: 'Poppins, sans-serif',
           }}
          >
           {[2, 5, 10, 25].map((option) => (
            <MenuItem key={option} value={option} sx={{ fontFamily: 'Poppins, sans-serif' }}>
             {option}
            </MenuItem>
           ))}
          </Select>
         </Box>
         <CustomPaginationActions
          count={totalPages * limit}
          page={page - 1}
          rowsPerPage={limit}
          onPageChange={handleChangePage}
         />
        </Box>
       </TableCell>
      </TableRow>
     </TableFooter>
    </MuiTable>
   </TableContainer>

   {/* Create New Clue Modal */}
   <CreateNewClueModal
    open={openModal}
    onClose={handleCloseModal}
    clueData={selectedClueData}
   />
  </>
 );
};

export default ClueTable;
