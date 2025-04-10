// pages/ViewHuntPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
 Typography,
 Button,
 Box,
 IconButton,
 Divider,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Menu from '../layout/SideMenu';
import Header from '../layout/Header';
import CreateNewHuntModal from './CreateNewHuntModal';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';
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

const ViewHuntPage = () => {
 const navigate = useNavigate();
 const location = useLocation();

 const huntData = location.state?.hunt || {}; // Retrieve hunt data from the route's state

 const [deleteHunt, { isLoading: isDeleting }] = useDeleteHuntMutation();

 // Dummy associated locations data
 const associatedLocations = [
  {
   name: 'Warren Concept',
   description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
   name: 'Downtown Square',
   description: 'Explore the hidden gems in the heart of the city.',
  },
 ];

 // State variables for modals
 const [isEditModalOpen, setEditModalOpen] = useState(false);
 const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

 // Handlers for modals
 const handleOpenEditModal = () => setEditModalOpen(true);
 const handleCloseEditModal = () => setEditModalOpen(false);

 const handleOpenDeleteModal = () => setDeleteModalOpen(true);
 const handleCloseDeleteModal = () => setDeleteModalOpen(false);

 // Handle delete confirmation
 const handleConfirmDelete = async () => {
  try {
   await deleteHunt(huntData.id).unwrap();
   console.log('Hunt deleted:', huntData);
   setDeleteModalOpen(false);
   // After deletion, navigate back or show a success message
   navigate('/hunt');
  } catch (err) {
   console.error('Failed to delete hunt:', err);
  }
 };

 return (
  <div className="flex min-h-screen text-darkslategray-200">
   {/* Sidebar Menu */}
   <div className="w-64 bg-[#DCDCDC] shadow-md">
    <Menu />
   </div>

   {/* Main Content */}
   <div className="flex-1 flex flex-col p-6 space-y-6 font-poppins">
    {/* Header */}
    <Header title="Hunts" />

    {/* Hunt Details View */}
    <div className="bg-[#DCDCDC] rounded-lg p-5 h-full">
     <Box sx={{ backgroundColor: '#FFFFFF', padding: 2 }}>
      {/* Back Button and Action Buttons */}
      <Box
       sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
       }}
      >
       <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate(-1)}>
         <ArrowBack />
        </IconButton>
        <Typography
         variant="h6"
         sx={{ marginLeft: 1, fontWeight: 'bold', fontFamily: 'Poppins' }}
        >
         {huntData.title || 'Hunt Name'}
        </Typography>
       </Box>

       <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
         variant="outlined"
         sx={{
          borderColor: '#000',
          color: '#000',
          width: 137,
          height: 43,
          fontFamily: 'Poppins',
          textTransform: 'none',
         }}
         onClick={handleOpenDeleteModal}
        >
         Delete
        </Button>
        <Button
         variant="contained"
         sx={{
          backgroundColor: '#000',
          color: '#FFF',
          width: 137,
          height: 43,
          fontFamily: 'Poppins',
          textTransform: 'none',
         }}
         onClick={handleOpenEditModal}
        >
         Edit
        </Button>
       </Box>
      </Box>

      {/* Hunt Description */}
      <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
       {huntData.description || 'No description available.'}
      </Typography>

      {/* Hunt Details in a Single Line with Dividers */}
      <Box
       sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 3,
        borderTop: '1px solid #DBDBDB',
        borderBottom: '1px solid #DBDBDB',
        position: 'relative',
       }}
      >
       {[
        { label: 'Start Date', value: huntData.startDate || 'N/A' },
        { label: 'End Date', value: huntData.endDate || 'N/A' },
        { label: 'Status', value: huntData.status || 'N/A' },
        { label: 'Mode', value: modeReverseMapping[huntData.mode] || 'N/A' },
        { label: 'Type', value: typeReverseMapping[huntData.huntType] || 'N/A' },
        { label: 'Game Type', value: playTypeReverseMapping[huntData.gameType] || 'N/A' },
        { label: 'Points', value: huntData.points || 'N/A' },
        { label: 'No. of Participants', value: huntData.noOfParticipants || 'N/A' },
       ].map((item, index, array) => (
        <Box
         key={index}
         sx={{
          flex: 1,
          textAlign: 'center',
          paddingY: 2,
          position: 'relative',
         }}
        >
         <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
          {item.label}
         </Typography>
         <Typography sx={{ fontFamily: 'Poppins' }}>{item.value}</Typography>
         {index < array.length - 1 && (
          <Divider
           orientation="vertical"
           flexItem
           sx={{
            backgroundColor: '#DBDBDB',
            height: '60%',
            position: 'absolute',
            right: 0,
            top: '20%',
           }}
          />
         )}
        </Box>
       ))}
      </Box>
     </Box>

     <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Poppins', marginY: 3 }}>
      Associated Locations
     </Typography>
     {/* Associated Locations Section */}
     <Box sx={{ backgroundColor: '#FFFFFF', padding: 2 }}>
      {associatedLocations.map((location, index) => (
       <Box
        key={index}
        sx={{
         paddingY: 2,
         borderBottom: '1px solid #DBDBDB',
        }}
       >
        <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
         {location.name}
        </Typography>
        <Typography sx={{ fontFamily: 'Poppins' }}>
         {location.description}
        </Typography>
       </Box>
      ))}
     </Box>
    </div>
   </div>

   {/* Modals */}
   <CreateNewHuntModal
    open={isEditModalOpen}
    onClose={handleCloseEditModal}
    huntData={huntData} // Pass the current hunt data for editing
   />
   <DeleteConfirmationModal
    open={isDeleteModalOpen}
    onClose={handleCloseDeleteModal}
    onConfirmDelete={handleConfirmDelete}
   />
  </div>
 );
};

export default ViewHuntPage;
