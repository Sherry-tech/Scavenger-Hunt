// components/locations/CreateNewLocationModal.jsx
import React, { useState, useEffect } from 'react';
import {
 Dialog,
 DialogTitle,
 DialogContent,
 TextField,
 Select,
 MenuItem,
 Button,
 IconButton,
 Typography,
 Box,
 FormControl,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Ensure @mui/x-date-pickers is installed
import dayjs from 'dayjs';

const CreateNewLocationModal = ({ open, onClose, locationData }) => {
 const [name, setName] = useState('');
 const [address, setAddress] = useState('');
 const [associatedHunts, setAssociatedHunts] = useState([]);
 const [description, setDescription] = useState('');
 const [startDate, setStartDate] = useState(null); // Using dayjs
 const [endDate, setEndDate] = useState(null);
 const [contactNumber, setContactNumber] = useState('');

 useEffect(() => {
  if (locationData) {
   setName(locationData.name || '');
   setAddress(locationData.address || '');
   setAssociatedHunts(locationData.associatedHunts || []);
   setDescription(locationData.description || '');
   setStartDate(locationData.startDate ? dayjs(locationData.startDate) : null);
   setEndDate(locationData.endDate ? dayjs(locationData.endDate) : null);
   setContactNumber(locationData.contactNumber || '');
  } else {
   // Reset form fields when creating new location
   setName('');
   setAddress('');
   setAssociatedHunts([]);
   setDescription('');
   setStartDate(null);
   setEndDate(null);
   setContactNumber('');
  }
 }, [locationData]);

 const handleSave = () => {
  if (locationData) {
   // Update existing location
   console.log('Updating location:', {
    name,
    address,
    associatedHunts,
    description,
    startDate,
    endDate,
    contactNumber,
   });
  } else {
   // Create new location
   console.log('Creating new location:', {
    name,
    address,
    associatedHunts,
    description,
    startDate,
    endDate,
    contactNumber,
   });
  }
  onClose();
 };

 const handleChooseFromMap = () => {
  // Implement map selection logic here
  console.log('Opening map to choose location');
 };

 const handleAddPoints = () => {
  // Implement add points logic here
  console.log('Adding points');
 };

 return (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
   {/* Dialog Header */}
   <DialogTitle
    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
   >
    <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
     {locationData ? 'Edit Location' : 'Create New Location'}
    </Typography>
    <IconButton onClick={onClose}>
     <CloseIcon />
    </IconButton>
   </DialogTitle>

   <DialogContent dividers>
    {/* Choose from Map Section */}
    <Box
     sx={{
      border: '2px dashed #888888',
      padding: '32px',
      textAlign: 'center',
      marginBottom: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200px',
      cursor: 'pointer',
      position: 'relative',
     }}
     onClick={handleChooseFromMap}
    >
     <>
      <img
       src="/upload-icon.svg"
       alt="Upload Icon"
       style={{ width: '50px', marginBottom: '8px' }}
      />
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: 2 }}>
       Choose from Map
      </Typography>
     </>
    </Box>

    {/* Location Name and Address Fields */}
    <Box sx={{ display: 'flex', gap: 2 }}>
     <Box sx={{ width: '100%' }}>
      <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
       Location Name
      </Typography>
      <TextField
       fullWidth
       placeholder="Add Location Name"
       variant="outlined"
       value={name}
       onChange={(e) => setName(e.target.value)}
       sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}
       inputProps={{
        style: { fontFamily: 'Poppins, sans-serif' },
       }}
      />
     </Box>

     <Box sx={{ width: '100%' }}>
      <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
       Address
      </Typography>
      <TextField
       fullWidth
       placeholder="Add Address"
       variant="outlined"
       value={address}
       onChange={(e) => setAddress(e.target.value)}
       sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}
       inputProps={{
        style: { fontFamily: 'Poppins, sans-serif' },
       }}
      />
     </Box>
    </Box>

    {/* Add Points */}
    <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
     Add Points
    </Typography>
    <TextField
     fullWidth
     placeholder="Add Points"
     variant="outlined"
     value={contactNumber}
     onChange={(e) => setContactNumber(e.target.value)}
     sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}
     inputProps={{
      style: { fontFamily: 'Poppins, sans-serif' },
     }}
    />

    {/* Description Field */}
    <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
     Description
    </Typography>
    <TextField
     fullWidth
     placeholder="Add Description"
     variant="outlined"
     multiline
     rows={3}
     value={description}
     onChange={(e) => setDescription(e.target.value)}
     sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}
     inputProps={{
      style: { fontFamily: 'Poppins, sans-serif' },
     }}
    />

    {/* Associated Hunts Dropdown */}
    <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
     Associated Hunts
    </Typography>
    <Select
     fullWidth
     displayEmpty
     value={associatedHunts}
     onChange={(e) => setAssociatedHunts(e.target.value)}
     multiple
     renderValue={(selected) => {
      if (selected.length === 0) {
       return 'Add Associated Hunts';
      }
      return selected.join(', ');
     }}
     sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}
    >
     <MenuItem value="Hunt 1" sx={{ fontFamily: 'Poppins, sans-serif' }}>
      Hunt 1
     </MenuItem>
     <MenuItem value="Hunt 2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
      Hunt 2
     </MenuItem>
     <MenuItem value="Hunt 3" sx={{ fontFamily: 'Poppins, sans-serif' }}>
      Hunt 3
     </MenuItem>
    </Select>

    {/* Additional Details Heading */}
    <Typography
     sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}
    >
     Additional Details
    </Typography>

    {/* Start Date and End Date Fields */}
    <Box sx={{ display: 'flex', gap: 2 }}>
     <Box sx={{ width: '100%' }}>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
       <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
        Start Date
       </Typography>
       <DatePicker
        value={startDate}
        onChange={(newValue) => setStartDate(newValue)}
        renderInput={(params) => (
         <TextField
          {...params}
          sx={{ fontFamily: 'Poppins, sans-serif' }}
          inputProps={{
           ...params.inputProps,
           placeholder: 'Select Start Date',
           style: { fontFamily: 'Poppins, sans-serif' },
          }}
         />
        )}
       />
      </FormControl>
     </Box>

     <Box sx={{ width: '100%' }}>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
       <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
        End Date
       </Typography>
       <DatePicker
        value={endDate}
        onChange={(newValue) => setEndDate(newValue)}
        renderInput={(params) => (
         <TextField
          {...params}
          sx={{ fontFamily: 'Poppins, sans-serif' }}
          inputProps={{
           ...params.inputProps,
           placeholder: 'Select End Date',
           style: { fontFamily: 'Poppins, sans-serif' },
          }}
         />
        )}
       />
      </FormControl>
     </Box>
    </Box>

    {/* Contact Number Field */}
    <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
     Contact Number
    </Typography>
    <TextField
     fullWidth
     placeholder="Add Contact Number"
     variant="outlined"
     value={contactNumber}
     onChange={(e) => setContactNumber(e.target.value)}
     sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}
     inputProps={{
      style: { fontFamily: 'Poppins, sans-serif' },
     }}
    />

    {/* Modal Action Buttons */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
     <Button
      variant="outlined"
      onClick={onClose}
      sx={{
       width: '48%',
       fontFamily: 'Poppins, sans-serif',
       backgroundColor: '#999999',
       color: '#FFFFFF',
       '&:hover': { backgroundColor: '#777777' },
      }}
     >
      Cancel
     </Button>
     <Button
      variant="contained"
      onClick={handleSave}
      sx={{
       width: '48%',
       backgroundColor: '#000000',
       color: '#FFFFFF',
       fontFamily: 'Poppins, sans-serif',
       '&:hover': { backgroundColor: '#333333' },
      }}
     >
      {locationData ? 'Save Changes' : 'Save Location'}
     </Button>
    </Box>
   </DialogContent>
  </Dialog>
 );
};

export default CreateNewLocationModal;
