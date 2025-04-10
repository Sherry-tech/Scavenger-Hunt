// components/experiences/ExperienceTable.jsx
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
import CreateNewExperienceModal from './CreateNewExperienceModal';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';
import { useDeleteExperienceMutation } from '../../slices/experienceApiSlice';

const ExperienceTable = ({
 data,
 searchByName,
 setSearchByName,
 page,
 setPage,
 limit,
 setLimit,
 totalItems,
}) => {
 const navigate = useNavigate();

 // State variables for modals
 const [openModal, setOpenModal] = useState(false);
 const [selectedExperienceData, setSelectedExperienceData] = useState(null);
 const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
 const [experienceToDelete, setExperienceToDelete] = useState(null);

 const [deleteExperience, { isLoading: deleting, isError: deleteError }] = useDeleteExperienceMutation();

 // Handlers for modals
 const handleOpenModal = () => setOpenModal(true);

 const handleCloseModal = () => {
  setOpenModal(false);
  setSelectedExperienceData(null);
 };

 const handleConfirmDelete = async () => {
  if (!experienceToDelete?.id) return;
  try {
   await deleteExperience(experienceToDelete.id).unwrap();
   console.log('Experience deleted successfully');
  } catch (err) {
   console.error('Failed to delete experience:', err);
  }
  setDeleteModalOpen(false);
  setExperienceToDelete(null);
 };


 const handleChangePage = (event, newPage) => setPage(newPage + 1); // Adjust for zero-based index
 const handleChangeRowsPerPage = (event) => {
  setLimit(parseInt(event.target.value, 10));
  setPage(1); // Reset to first page when limit changes
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
      padding: 2,
      fontFamily: 'Poppins, sans-serif',
     }}
    >
     <TextField
      variant="outlined"
      placeholder="Search By Name..."
      value={searchByName}
      onChange={(e) => setSearchByName(e.target.value)}
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
     <Box sx={{ display: 'flex', gap: 2, fontFamily: 'Poppins, sans-serif' }}>
      <Select
       defaultValue=""
       displayEmpty
       sx={{ width: 150, fontFamily: 'Poppins, sans-serif' }}
      >
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="">
        Sort By
       </MenuItem>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="title">
        Title
       </MenuItem>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="status">
        Status
       </MenuItem>
      </Select>
      <Select defaultValue="" displayEmpty sx={{ width: 150 }}>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="">
        Filter By Status
       </MenuItem>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="active">
        Active
       </MenuItem>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="inactive">
        Inactive
       </MenuItem>
      </Select>
      <Select defaultValue="" displayEmpty sx={{ width: 150 }}>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="">
        Filter By Type
       </MenuItem>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="AR">
        AR
       </MenuItem>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="Puzzle">
        Puzzle
       </MenuItem>
       <MenuItem sx={{ fontFamily: 'Poppins, sans-serif' }} value="Text">
        Text
       </MenuItem>
      </Select>
      {/* Sort and Filter Options (Implement as needed) */}
      {/* Create New Experience Button */}
      <Button
       variant="contained"
       onClick={() => {
        setSelectedExperienceData(null); // Ensure no pre-filled data
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
       Create New Experience
      </Button>
     </Box>
    </Box>

    <MuiTable sx={{ backgroundColor: '#DCDCDC' }}>
     <TableHead>
      <TableRow>
       {[
        'Title',
        'Description',
        'Type',
        'Status',
        'Associated Locations',
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
      {data.length === 0 ? (
       <TableRow>
        <TableCell colSpan={6} align="center">
         No experiences found.
        </TableCell>
       </TableRow>
      ) : (
       data.map((row, index) => (
        <TableRow key={index}>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.title}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.description}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.type}
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
         <TableCell>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
           {row.locations.map((location, i) => (
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
             <Typography sx={{ color: 'white' }}>{location.name}</Typography>
            </Box>
           ))}
          </Box>
         </TableCell>
         {/* Actions */}
         <TableCell>
          <Box sx={{ display: 'flex', gap: 1 }}>
           {/* View Experience */}
           <IconButton
            onClick={() =>
             navigate(`/view-experience/${row.id}`, {
              state: { experience: row },
             })
            }
           >
            <VisibilityOutlined />
           </IconButton>
           {/* Edit Experience */}
           <IconButton
            onClick={() => {
             setSelectedExperienceData(row);
             handleOpenModal();
            }}
           >
            <EditOutlined />
           </IconButton>
           {/* Delete Experience */}
           <IconButton
            onClick={() => {
             setExperienceToDelete(row);
             setDeleteModalOpen(true);
            }}
           >
            <DeleteOutlined />
           </IconButton>
          </Box>
         </TableCell>
        </TableRow>
       ))
      )}
     </TableBody>
     <TableFooter>
      <TableRow>
       <TableCell colSpan={6}>
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
           value={limit}
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
          count={totalItems}
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

   {/* Create New Experience Modal */}
   <CreateNewExperienceModal
    open={openModal}
    onClose={handleCloseModal}
    experienceData={selectedExperienceData}
   />

   {/* Delete Confirmation Modal */}
   <DeleteConfirmationModal
    open={isDeleteModalOpen}
    onClose={() => setDeleteModalOpen(false)}
    onConfirmDelete={handleConfirmDelete}
    message={
     deleteError
      ? 'Failed to delete experience. Please try again.'
      : 'Are you sure you want to delete this experience?'
    }
   />
  </>
 );
};

export default ExperienceTable;
