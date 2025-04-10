// pages/ViewLocationPage.jsx
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
import CreateNewLocationModal from '../locations/CreateNewLocationModal';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';

const ViewLocationPage = () => {
 const navigate = useNavigate();
 const location = useLocation();

 const locationData = location.state?.location || {}; // Retrieve location data from the route's state

 // State variables for modals
 const [isEditModalOpen, setEditModalOpen] = useState(false);
 const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

 // Handlers for modals
 const handleOpenEditModal = () => setEditModalOpen(true);
 const handleCloseEditModal = () => setEditModalOpen(false);

 const handleOpenDeleteModal = () => setDeleteModalOpen(true);
 const handleCloseDeleteModal = () => setDeleteModalOpen(false);

 // Handle delete confirmation
 const handleConfirmDelete = () => {
  // Implement your delete logic here
  console.log('Deleting location:', locationData);
  setDeleteModalOpen(false);
  // After deletion, navigate back or show a success message
  navigate('/location');
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
    <Header title="Location" />

    {/* Location Details View */}
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
         {locationData.name || 'Location Name'}
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

      {/* Description */}
      <Typography variant="body1" sx={{ fontFamily: 'Poppins', marginBottom: 2 }}>
       {locationData.description || 'No description available.'}
      </Typography>

      {/* Location Details in a Single Line with Dividers */}
      <Box
       sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 3,
        borderTop: '1px solid #DBDBDB',
        borderBottom: '1px solid #DBDBDB',
        paddingY: 2,
        overflowX: 'auto',
       }}
      >
       {/* Address */}
       <Box
        sx={{
         flex: 'none',
         display: 'flex',
         alignItems: 'center',
         marginRight: 2,
        }}
       >
        <Typography
         sx={{
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          marginRight: 0.5,
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
         }}
        >
         Address:
        </Typography>
        <Typography
         sx={{
          fontFamily: 'Poppins',
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
         }}
        >
         {locationData.address || 'No address available.'}
        </Typography>
       </Box>
       {/* Divider */}
       <Divider
        orientation="vertical"
        flexItem
        sx={{
         backgroundColor: '#DBDBDB',
         width: '1px',
         marginX: 2,
         alignSelf: 'stretch',
        }}
       />
       {/* Start Date */}
       <Box
        sx={{
         flex: 'none',
         display: 'flex',
         alignItems: 'center',
        }}
       >
        <Typography
         sx={{
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          marginRight: 0.5,
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
         }}
        >
         Start Date:
        </Typography>
        <Typography
         sx={{
          fontFamily: 'Poppins',
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
         }}
        >
         {locationData.startDate || 'N/A'}
        </Typography>
       </Box>
       {/* Divider */}
       <Divider
        orientation="vertical"
        flexItem
        sx={{
         backgroundColor: '#DBDBDB',
         width: '1px',
         marginX: 2,
         alignSelf: 'stretch',
        }}
       />
       {/* End Date */}
       <Box
        sx={{
         flex: 'none',
         display: 'flex',
         alignItems: 'center',
        }}
       >
        <Typography
         sx={{
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          marginRight: 0.5,
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
         }}
        >
         End Date:
        </Typography>
        <Typography
         sx={{
          fontFamily: 'Poppins',
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
         }}
        >
         {locationData.endDate || 'N/A'}
        </Typography>
       </Box>
       {/* Divider */}
       <Divider
        orientation="vertical"
        flexItem
        sx={{
         backgroundColor: '#DBDBDB',
         width: '1px',
         marginX: 2,
         alignSelf: 'stretch',
        }}
       />
       {/* Contact Number */}
       <Box
        sx={{
         flex: 'none',
         display: 'flex',
         alignItems: 'center',
        }}
       >
        <Typography
         sx={{
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          marginRight: 0.5,
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
         }}
        >
         Contact Number:
        </Typography>
        <Typography
         sx={{
          fontFamily: 'Poppins',
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
         }}
        >
         {locationData.contactNumber || 'N/A'}
        </Typography>
       </Box>
      </Box>

      {/* Associated Hunts on a New Line */}
      <Box sx={{ marginTop: 2 }}>
       <Typography
        sx={{
         fontWeight: 'bold',
         fontFamily: 'Poppins',
         marginBottom: 0.5,
         fontSize: '0.875rem',
        }}
       >
        Associated Hunts:
       </Typography>
       {locationData.hunts && locationData.hunts.length > 0 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
         {locationData.hunts.map((hunt, index) => (
          <Box
           key={index}
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
           <Typography sx={{ color: 'white', fontFamily: 'Poppins' }}>
            {hunt}
           </Typography>
          </Box>
         ))}
        </Box>
       ) : (
        <Typography sx={{ fontFamily: 'Poppins' }}>N/A</Typography>
       )}
      </Box>
     </Box>

     {/* Modals */}
     <CreateNewLocationModal
      open={isEditModalOpen}
      onClose={handleCloseEditModal}
      locationData={locationData} // Pass the current location data for editing
     />
     <DeleteConfirmationModal
      open={isDeleteModalOpen}
      onClose={handleCloseDeleteModal}
      onConfirmDelete={handleConfirmDelete}
      message="Are you sure you want to delete this location?"
     />
    </div>
   </div>
  </div>
 );
};

export default ViewLocationPage;
