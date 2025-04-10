// components/locations/LocationTable.jsx
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
 Typography,
 Box,
 IconButton,
 Select,
 MenuItem,
 TextField,
 Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomPaginationActions } from '../common/CustomPagination';
import { VisibilityOutlined, EditOutlined, DeleteOutlined } from '@mui/icons-material';
import CreateNewLocationModal from './CreateNewLocationModal';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';


const LocationTable = ({ data }) => {
 const navigate = useNavigate();
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(5);
 const [searchQuery, setSearchQuery] = useState('');

 // State variables for modals
 const [openModal, setOpenModal] = useState(false);
 const [selectedLocationData, setSelectedLocationData] = useState(null);
 const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
 const [locationToDelete, setLocationToDelete] = useState(null);

 // Handlers for modals
 const handleOpenModal = () => setOpenModal(true);

 const handleCloseModal = () => {
  setOpenModal(false);
  setSelectedLocationData(null);
 };

 const handleConfirmDelete = () => {
  // Implement your delete logic here
  console.log('Deleting location:', locationToDelete);
  setDeleteModalOpen(false);
  setLocationToDelete(null);
 };

 const handleChangePage = (event, newPage) => setPage(newPage);
 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
 };

 const filteredData = useMemo(() => {
  return data.filter((row) =>
   row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
 }, [data, searchQuery]);

 const paginatedData = useMemo(() => {
  const start = page * rowsPerPage;
  return filteredData.slice(start, start + rowsPerPage);
 }, [filteredData, page, rowsPerPage]);

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
    {/* View Buttons and Search and Filter Bar */}
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 2,
      fontFamily: 'Poppins, sans-serif',
     }}
    >
     {/* Left side: List View and Map View buttons */}
     <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
       variant="contained"
       sx={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        fontFamily: 'Poppins, sans-serif',
        textTransform: 'none',
        '&:hover': { backgroundColor: '#333333' },
        padding: '8px 16px',
       }}
      >
       List View
      </Button>
      <Button
       variant="contained"
       sx={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        fontFamily: 'Poppins, sans-serif',
        textTransform: 'none',
        '&:hover': { backgroundColor: '#333333' },
        padding: '8px 16px',
       }}
      >
       Map View
      </Button>
     </Box>

     {/* Right side: Sort By, Filter By, Search Input, Add New Location Button */}
     <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Select
       defaultValue=""
       displayEmpty
       sx={{ width: 150, fontFamily: 'Poppins, sans-serif' }}
      >
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="">
        Sort By
       </MenuItem>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="name">
        Name
       </MenuItem>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="status">
        Status
       </MenuItem>
      </Select>
      <Select
       defaultValue=""
       displayEmpty
       sx={{ width: 150, fontFamily: 'Poppins, sans-serif' }}
      >
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="">
        Filter By
       </MenuItem>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="active">
        Active
       </MenuItem>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="inactive">
        Inactive
       </MenuItem>
      </Select>
      <TextField
       variant="outlined"
       placeholder="Search By Name..."
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
       sx={{ width: 300, fontFamily: 'Poppins, sans-serif' }}
      />
      <Button
       variant="contained"
       onClick={() => {
        setSelectedLocationData(null); // Ensure no pre-filled data
        handleOpenModal();
       }}
       sx={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        fontFamily: 'Poppins, sans-serif',
        textTransform: 'none',
        '&:hover': { backgroundColor: '#333333' },
        padding: '8px 16px',
       }}
      >
       Add New Location
      </Button>
     </Box>
    </Box>

    <MuiTable sx={{ backgroundColor: '#DCDCDC' }}>
     <TableHead>
      <TableRow>
       {[
        'Location Name',
        'Address',
        'Associated Hunts',
        'Status',
        'Actions',
       ].map((header) => (
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
     <TableBody>
      {paginatedData.map((row, index) => (
       <TableRow key={index}>
        <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
         {row.name}
        </TableCell>
        <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
         {row.address}
        </TableCell>
        <TableCell>
         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {row.hunts.map((hunt, i) => (
           <Box
            key={i}
            sx={{
             display: 'flex',
             alignItems: 'center',
             backgroundColor: '#888888',
             borderRadius: '4px',
             padding: '4px 8px',
            }}
           >
            <Box
             sx={{
              width: 10,
              height: 10,
              backgroundColor: 'white',
              borderRadius: '50%',
              marginRight: '8px',
             }}
            />
            <Typography sx={{ color: 'white' }}>{hunt}</Typography>
           </Box>
          ))}
         </Box>
        </TableCell>
        <TableCell>
         <Box
          sx={{
           backgroundColor: '#888888',
           borderRadius: '4px',
           display: 'inline-block',
           padding: '4px 8px',
          }}
         >
          <Typography
           sx={{ color: 'white', fontFamily: 'Poppins, sans-serif' }}
          >
           {row.status}
          </Typography>
         </Box>
        </TableCell>
        {/* Actions */}
        <TableCell>
         <Box sx={{ display: 'flex', gap: 1 }}>
          {/* View Location */}
          <IconButton
           onClick={() =>
            navigate(`/view-location/${row.id}`, {
             state: { location: row },
            })
           }
          >
           <VisibilityOutlined />
          </IconButton>
          {/* Edit Location */}
          <IconButton
           onClick={() => {
            setSelectedLocationData(row);
            handleOpenModal();
           }}
          >
           <EditOutlined />
          </IconButton>
          {/* Delete Location */}
          <IconButton
           onClick={() => {
            setLocationToDelete(row);
            setDeleteModalOpen(true);
           }}
          >
           <DeleteOutlined />
          </IconButton>
         </Box>
        </TableCell>
       </TableRow>
      ))}
     </TableBody>
     <TableFooter>
      <TableRow>
       <TableCell colSpan={5}>
        <Box
         sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
         }}
        >
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography>Items per page:</Typography>
          <Select
           value={rowsPerPage}
           onChange={handleChangeRowsPerPage}
           sx={{ backgroundColor: 'white', borderRadius: '4px' }}
          >
           {[2, 5, 10, 25].map((option) => (
            <MenuItem key={option} value={option}>
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

   {/* Create New Location Modal */}
   <CreateNewLocationModal
    open={openModal}
    onClose={handleCloseModal}
    locationData={selectedLocationData}
   />

   {/* Delete Confirmation Modal */}
   <DeleteConfirmationModal
    open={isDeleteModalOpen}
    onClose={() => setDeleteModalOpen(false)}
    onConfirmDelete={handleConfirmDelete}
    message="Are you sure you want to delete this location?"
   />
  </>
 );
};

export default LocationTable;
