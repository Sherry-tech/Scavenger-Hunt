// components/users/UserManagement.jsx
import React, { useState, useMemo } from 'react';
import {
 TableContainer,
 Paper,
 Box,
 Button,
 TextField,
 InputAdornment,
 IconButton,
 Typography,
 Table as MuiTable,
 TableHead,
 TableRow,
 TableCell,
 TableBody,
 TableFooter,
 Select,
 MenuItem,
} from '@mui/material';
import { CustomPaginationActions } from '../common/CustomPagination';
import { VisibilityOutlined, EditOutlined, DeleteOutlined, LockOutlined } from '@mui/icons-material';


const UserManagement = () => {
 const [selectedTab, setSelectedTab] = useState('user');
 const [searchQuery, setSearchQuery] = useState('');
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(5);

 // Sample data for users
 const userData = [
  { userName: 'Alice Smith', userEmail: 'alice@example.com', creationDate: '2021-01-01', role: 'User' },
  { userName: 'Bob Johnson', userEmail: 'bob@example.com', creationDate: '2021-02-01', role: 'User' },
  { userName: 'Charlie Brown', userEmail: 'charlie@example.com', creationDate: '2021-03-01', role: 'User' },
  { userName: 'Dana White', userEmail: 'dana@example.com', creationDate: '2021-04-01', role: 'User' },
  { userName: 'Evan Davis', userEmail: 'evan@example.com', creationDate: '2021-05-01', role: 'User' },
 ];

 // Sample data for creators
 const creatorData = [
  { creatorName: 'Grace Hopper', userEmail: 'grace@example.com', creationDate: '2021-01-15', permission: 'Admin', status: 'Active' },
  { creatorName: 'Henry Ford', userEmail: 'henry@example.com', creationDate: '2021-02-15', permission: 'Editor', status: 'Inactive' },
  { creatorName: 'Irene Adler', userEmail: 'irene@example.com', creationDate: '2021-03-15', permission: 'Viewer', status: 'Active' },
  { creatorName: 'Jack Sparrow', userEmail: 'jack@example.com', creationDate: '2021-04-15', permission: 'Editor', status: 'Active' },
  { creatorName: 'Karen Page', userEmail: 'karen@example.com', creationDate: '2021-05-15', permission: 'Admin', status: 'Inactive' },
 ];

 // Handler for tab switch
 const handleTabChange = (tab) => {
  setSelectedTab(tab);
  setSearchQuery('');
  setPage(0);
 };

 // Pagination handlers
 const handleChangePage = (event, newPage) => setPage(newPage);
 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
 };

 // Filtering data based on search query
 const filteredData = useMemo(() => {
  const data = selectedTab === 'user' ? userData : creatorData;
  return data.filter((row) =>
   (selectedTab === 'user' ? row.userName : row.creatorName).toLowerCase().includes(searchQuery.toLowerCase())
  );
 }, [selectedTab, searchQuery]);

 // Paginating the filtered data
 const paginatedData = useMemo(() => {
  const start = page * rowsPerPage;
  return filteredData.slice(start, start + rowsPerPage);
 }, [filteredData, page, rowsPerPage]);

 // Table headers
 const headers = selectedTab === 'user'
  ? ['User Name', 'User Email', 'Creation Date', 'Role', 'Actions']
  : ['Creator Name', 'User Email', 'Creation Date', 'Permission', 'Status', 'Actions'];

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
   {/* Header with Tabs and Controls */}
   <Box
    sx={{
     display: 'flex',
     alignItems: 'center',
     gap: 2,
     fontFamily: 'Poppins, sans-serif',
     padding: 2,
    }}
   >
    {/* Left Side: Tab Buttons */}
    <Box sx={{ display: 'flex', gap: 2 }}>
     <Button
      variant={selectedTab === 'user' ? 'contained' : 'text'}
      onClick={() => handleTabChange('user')}
      sx={{
       width: 130,
       height: 43,
       backgroundColor: selectedTab === 'user' ? '#000000' : 'rgba(104, 104, 104, 0.3)',
       color: selectedTab === 'user' ? '#FFFFFF' : '#000000',
       fontFamily: 'Poppins, sans-serif',
       textTransform: 'none',
       '&:hover': {
        backgroundColor: selectedTab === 'user' ? '#333333' : 'rgba(104, 104, 104, 0.3)',
       },
      }}
     >
      Users
     </Button>
     <Button
      variant={selectedTab === 'creator' ? 'contained' : 'text'}
      onClick={() => handleTabChange('creator')}
      sx={{
       width: 130,
       height: 43,
       backgroundColor: selectedTab === 'creator' ? '#000000' : 'rgba(104, 104, 104, 0.3)',
       color: selectedTab === 'creator' ? '#FFFFFF' : '#000000',
       fontFamily: 'Poppins, sans-serif',
       textTransform: 'none',
       '&:hover': {
        backgroundColor: selectedTab === 'creator' ? '#333333' : 'rgba(104, 104, 104, 0.3)',
       },
      }}
     >
      Creators
     </Button>
    </Box>


    {/* Right Side: Search and Add New User Button */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
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

     {/* Add New User Button */}
     <Button
      variant="contained"
      // onClick={() => setOpenModal(true)}
      sx={{
       backgroundColor: '#000000',
       color: '#FFFFFF',
       fontFamily: 'Poppins, sans-serif',
       textTransform: 'none',
       '&:hover': { backgroundColor: '#333333' },
       padding: '8px 16px',
      }}
     >
      Add New User
     </Button>
    </Box>
   </Box>

   {/* Table */}
   <MuiTable sx={{ backgroundColor: '#DCDCDC' }}>
    {/* Table Head */}
    <TableHead>
     <TableRow>
      {headers.map((header) => (
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
       {selectedTab === 'user' ? (
        <>
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
        </>
       ) : (
        <>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.creatorName}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.userEmail}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.creationDate}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.permission}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.status}
         </TableCell>
        </>
       )}
       {/* Actions */}
       <TableCell>
        <Box sx={{ display: 'flex', gap: 1 }}>
         <IconButton>
          <VisibilityOutlined />
         </IconButton>
         <IconButton>
          <EditOutlined />
         </IconButton>
         <IconButton>
          <DeleteOutlined />
         </IconButton>
         <IconButton>
          <LockOutlined />
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
      <TableCell colSpan={selectedTab === 'user' ? 5 : 6}>
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

export default UserManagement;
