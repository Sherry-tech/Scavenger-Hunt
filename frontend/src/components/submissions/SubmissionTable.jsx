import React, { useState, useMemo } from 'react';
import {
 TableContainer,
 Table as MuiTable,
 TableHead,
 TableRow,
 TableCell,
 TableBody,
 TableFooter,
 Avatar,
 Paper,
 Typography,
 TablePagination,
 Box,
 IconButton,
 ToggleButton,
 ToggleButtonGroup,
 TextField,
 MenuItem,
 Select,
} from '@mui/material';
import {
 CustomPaginationActions,
 StyledPaginationContainer,
} from '../common/CustomPagination';
import ViewSubmission from './ViewSubmission';


// SubmissionTable Component
const SubmissionTable = ({ data }) => {
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(5);
 const [viewType, setViewType] = useState('userSubmission');
 const [searchQuery, setSearchQuery] = useState('');
 const [isViewModalOpen, setViewModalOpen] = useState(false);

 const handleChangePage = (event, newPage) => setPage(newPage);
 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
 };

 const handleViewChange = (event, newView) => {
  if (newView !== null) setViewType(newView);
 };

 const filteredData = useMemo(() => {
  return data.filter((row) =>
   row.huntName.toLowerCase().includes(searchQuery.toLowerCase())
  );
 }, [data, searchQuery]);

 const paginatedData = useMemo(() => {
  const start = page * rowsPerPage;
  return filteredData.slice(start, start + rowsPerPage);
 }, [filteredData, page, rowsPerPage]);

 const handleOpenViewModal = () => setViewModalOpen(true); // Open modal
 const handleCloseViewModal = () => setViewModalOpen(false); // Close modal

 return (
  <TableContainer
   component={Paper}
   sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#DCDCDC' }}
  >
   {/* Toggle Buttons and Search Bar */}
   <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
    <ToggleButtonGroup
     value={viewType}
     exclusive
     onChange={handleViewChange}
     aria-label="View type"
    >
     <ToggleButton
      value="userSubmission"
      sx={{ fontFamily: 'Poppins, sans-serif', padding: '8px 16px', borderRadius: 0 }}
     >
      User Submission
     </ToggleButton>
     <ToggleButton
      value="rolandRequests"
      sx={{ fontFamily: 'Poppins, sans-serif', padding: '8px 16px', borderRadius: 0 }}
     >
      Roland Requests
     </ToggleButton>
    </ToggleButtonGroup>

    <TextField
     variant="outlined"
     placeholder="Search by"
     value={searchQuery}
     onChange={(e) => setSearchQuery(e.target.value)}
     InputProps={{
      endAdornment: (
       <IconButton>
        <img
         width="22px"
         height="22px"
         src="/vuesaxlinearsearchnormal.svg"
         alt="Search Icon"
        />
       </IconButton>
      ),
     }}
     sx={{ fontFamily: 'Poppins, sans-serif', width: '300px' }}
    />
   </Box>

   <MuiTable sx={{ backgroundColor: '#DCDCDC' }}>
    <TableHead>
     <TableRow>
      {['Hunt Name', 'Participant', 'Location', 'Submission Date', 'Points', 'Actions'].map(
       (header) => (
        <TableCell
         key={header}
         sx={{
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#DCDCDC',
         }}
        >
         {header}
        </TableCell>
       )
      )}
     </TableRow>
    </TableHead>
    <TableBody>
     {paginatedData.map((row, index) => (
      <TableRow key={index}>
       <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
         <Avatar sx={{ width: 40, height: 40, marginRight: 2 }} alt={row.participant} />
         <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.huntName}
         </Typography>
        </Box>
       </TableCell>
       <TableCell>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.participant}</Typography>
       </TableCell>
       <TableCell>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.location}</Typography>
       </TableCell>
       <TableCell>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.submissionDate}</Typography>
       </TableCell>
       <TableCell>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.points}</Typography>
       </TableCell>
       <TableCell>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', cursor: 'pointer' }} onClick={handleOpenViewModal}>
         View
        </Typography>
       </TableCell>
      </TableRow>
     ))}
    </TableBody>
    <TableFooter>
     <TableRow>
      <TableCell colSpan={6} sx={{ padding: 0 }}>
       <StyledPaginationContainer>
        {/* Left: Items per page selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
         <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>Items per page:</Typography>
         <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          sx={{
           fontFamily: 'Poppins, sans-serif',
           backgroundColor: 'white',
           borderRadius: '4px',
          }}
         >
          {[2, 5, 10, 25].map((option) => (
           <MenuItem key={option} value={option}>
            {option}
           </MenuItem>
          ))}
         </Select>
        </Box>

        {/* Right: Pagination Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
         <CustomPaginationActions
          count={filteredData.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
         />
        </Box>
       </StyledPaginationContainer>
      </TableCell>
     </TableRow>
    </TableFooter>
   </MuiTable>
   <ViewSubmission
    open={isViewModalOpen}
    handleClose={handleCloseViewModal}
   // submission={selectedSubmission}
   />
  </TableContainer>


 );
};

export default SubmissionTable;
