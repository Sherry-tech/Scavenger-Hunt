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
 FormControl,
 InputLabel,
 Select,
 MenuItem,
 TextField,
 Button,
 Box,
 IconButton,
} from '@mui/material';
import {
 CustomPaginationActions,
 StyledPaginationContainer,
} from '../common/CustomPagination';
import { VisibilityOutlined, EditOutlined, DeleteOutlined } from '@mui/icons-material';
import CreateNewHuntModal from './CreateNewHuntModal';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { useDeleteHuntMutation } from '../../slices/huntApiSlice';

// Mappings
const modeMapping = {
 Training: 100,
 Easy: 101,
 Medium: 102,
 Difficult: 103,
 Hard: 104,
};

const modeReverseMapping = {
 100: 'Training',
 101: 'Easy',
 102: 'Medium',
 103: 'Difficult',
 104: 'Hard',
};

const typeMapping = {
 Puzzle: 200,
 Adventure: 201,
 AR: 202,
};

const typeReverseMapping = {
 200: 'Puzzle',
 201: 'Adventure',
 202: 'AR',
};

const playTypeMapping = {
 'Play Hunt Individually': 300,
 'Play Hunt with Team': 301,
};

const playTypeReverseMapping = {
 300: 'Play Hunt Individually',
 301: 'Play Hunt with Team',
};

// HuntTable Component
const HuntTable = ({
 data,
 onPageChange,
 onRowsPerPageChange,
 totalItems,
 page,
 rowsPerPage,
 searchByName,
 setSearchByName,
}) => {
 const navigate = useNavigate();
 const [selectedMode, setSelectedMode] = useState('');
 const [isModalOpen, setModalOpen] = useState(false);
 const [selectedHuntData, setSelectedHuntData] = useState(null);
 const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
 const [huntToDelete, setHuntToDelete] = useState(null);

 const [deleteHunt, { isLoading: isDeleting }] = useDeleteHuntMutation();
 // Handlers for modal
 const handleOpenModal = () => setModalOpen(true);

 // Close the modal and reset selected hunt data
 const handleCloseModal = () => {
  setModalOpen(false);
  setSelectedHuntData(null);
 };

 // Handle delete confirmation
 const handleConfirmDelete = async () => {
  try {
   await deleteHunt(huntToDelete.id).unwrap();
   console.log('Hunt deleted:', huntToDelete);
   setDeleteModalOpen(false);
   setHuntToDelete(null);
  } catch (err) {
   console.error('Failed to delete hunt:', err);
  }
 };

 // Extract unique modes for filtering
 const modes = useMemo(() => {
  const modeSet = new Set();
  data.forEach((item) => {
   const modeName = modeReverseMapping[item.mode];
   if (modeName) {
    modeSet.add(modeName);
   }
  });
  return Array.from(modeSet);
 }, [data]);

 // Filtering data based on search query and selected mode
 const filteredData = useMemo(() => {
  return data.filter((item) => {
   const modeName = modeReverseMapping[item.mode];
   const modeMatch = selectedMode ? modeName === selectedMode : true;
   const nameMatch = item.title.toLowerCase().includes(searchByName.toLowerCase());
   return modeMatch && nameMatch;
  });
 }, [data, selectedMode, searchByName]);

 return (
  <>
   <TableContainer
    component={Paper}
    sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#DCDCDC' }}
   >
    {/* Table Header */}
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 2,
      backgroundColor: '#CDCDCD',
     }}
    >
     <Typography
      variant="h6"
      sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}
     >
      All Hunts
     </Typography>
     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {/* Filter by Mode */}
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
       <InputLabel>Filter by Mode</InputLabel>
       <Select
        value={selectedMode}
        onChange={(e) => setSelectedMode(e.target.value)}
        label="Filter by Mode"
       >
        <MenuItem value="">
         <em>All Modes</em>
        </MenuItem>
        {modes.map((mode) => (
         <MenuItem key={mode} value={mode}>
          {mode}
         </MenuItem>
        ))}
       </Select>
      </FormControl>
      {/* Search by Name */}
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
       sx={{ fontFamily: 'Poppins, sans-serif', padding: '8px 16px' }}
      />
      {/* Create New Hunt Button */}
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
       onClick={handleOpenModal}
      >
       Create New Hunt
      </Button>
     </Box>
    </Box>

    {/* Table */}
    <MuiTable sx={{ backgroundColor: '#DCDCDC' }}>
     {/* Table Head */}
     <TableHead>
      <TableRow>
       {[
        'Hunt Name',
        'Description',
        'Start Date',
        'End Date',
        'Participants',
        'Mode',
        'Type',
        'Game Type',
        'Status',
        'Actions',
       ].map((header) => (
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
       ))}
      </TableRow>
     </TableHead>
     {/* Table Body */}
     <TableBody>
      {filteredData.length === 0 ? (
       <TableRow>
        <TableCell colSpan={10} align="center">
         No hunts found.
        </TableCell>
       </TableRow>
      ) : (
       filteredData.map((row, index) => (
        <TableRow
         key={index}
         sx={{ backgroundColor: index % 2 ? '#E0E0E0' : 'inherit' }}
        >
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.title}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.description || 'N/A'}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.startDate}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.endDate}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.noParticipants}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {modeReverseMapping[row.mode] || 'N/A'}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {typeReverseMapping[row.huntType] || 'N/A'}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {playTypeReverseMapping[row.gameType] || 'N/A'}
         </TableCell>
         <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {row.status}
         </TableCell>
         {/* Actions */}
         <TableCell>
          <Box sx={{ display: 'flex', gap: 1 }}>
           <IconButton
            onClick={() =>
             navigate(`/view-hunt/${row.id}`, { state: { hunt: row } })
            }
           >
            <VisibilityOutlined />
           </IconButton>
           <IconButton
            onClick={() => {
             setSelectedHuntData(row);
             handleOpenModal();
            }}
           >
            <EditOutlined />
           </IconButton>
           <IconButton
            onClick={() => {
             setHuntToDelete(row);
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
     {/* Table Footer */}
     <TableFooter>
      <TableRow>
       <TableCell colSpan={10} sx={{ padding: 0 }}>
        <StyledPaginationContainer>
         {/* Left: Items per page selector */}
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
           Items per page:
          </Typography>
          <Select
           value={rowsPerPage}
           onChange={(e) => onRowsPerPageChange(e.target.value)}
           sx={{
            fontFamily: 'Poppins, sans-serif',
            backgroundColor: 'white',
            borderRadius: '4px',
            height: '40px',
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
           count={totalItems}
           page={page - 1} // Adjusting page index for zero-based pagination
           rowsPerPage={rowsPerPage}
           onPageChange={(event, newPage) => onPageChange(newPage + 1)}
          />
         </Box>
        </StyledPaginationContainer>
       </TableCell>
      </TableRow>
     </TableFooter>
    </MuiTable>
   </TableContainer>

   {/* Modals */}
   <CreateNewHuntModal
    open={isModalOpen}
    onClose={handleCloseModal}
    huntData={selectedHuntData}
   />
   <DeleteConfirmationModal
    open={isDeleteModalOpen}
    onClose={() => setDeleteModalOpen(false)}
    onConfirmDelete={handleConfirmDelete}
    title="Delete Hunt"
    message="Are you sure you want to delete this hunt?"
   />
  </>
 );
};

export default HuntTable;
