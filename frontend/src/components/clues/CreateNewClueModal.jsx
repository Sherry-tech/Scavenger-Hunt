import React, { useState, useEffect } from 'react';
import {
 Dialog,
 DialogTitle,
 DialogContent,
 TextField,
 FormControl,
 Select,
 MenuItem,
 Button,
 Typography,
 Box,
 CircularProgress,
} from '@mui/material';
import {
 useAddClueMutation,
 useUpdateClueMutation,
 useGetClueLocationsQuery,
} from '../../slices/clueApiSlice';

const CreateNewClueModal = ({ open, onClose, clueData }) => {
 const [clue, setClue] = useState('');
 const [points, setPoints] = useState('');
 const [hint, setHint] = useState('');
 const [locationId, setLocationId] = useState('');

 const [addClue, { isLoading: isAdding, isError: isAddError, error: addError }] = useAddClueMutation();
 const [updateClue, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] = useUpdateClueMutation();

 const { data: locationsData, isLoading: isLocationsLoading } = useGetClueLocationsQuery();

 const locations = locationsData?.data || [];

 useEffect(() => {
  if (clueData) {
   setClue(clueData.clue || '');
   setPoints(clueData.points || '');
   setHint(clueData.hint || '');
   setLocationId(clueData.locationId || '');
  } else {
   setClue('');
   setPoints('');
   setHint('');
   setLocationId('');
  }
 }, [clueData]);

 const handleSave = async () => {
  const cluePayload = {
   clue,
   points: parseInt(points, 10),
   hint,
   locationId,
  };

  try {
   if (clueData) {
    await updateClue({ id: clueData.id, ...cluePayload }).unwrap();
   } else {
    await addClue(cluePayload).unwrap();
   }
   onClose();
  } catch (err) {
   console.error('Failed to save clue:', err);
  }
 };

 return (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
   <DialogTitle
    sx={{
     fontFamily: 'Poppins, sans-serif',
     fontWeight: 'bold',
    }}
   >
    {clueData ? 'Edit Clue' : 'Add New Clue'}
   </DialogTitle>
   <DialogContent dividers>
    {(isAdding || isUpdating || isLocationsLoading) && (
     <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <CircularProgress />
     </Box>
    )}
    {(isAddError || isUpdateError) && (
     <Typography color="error" sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}>
      {(addError?.data?.message || updateError?.data?.message) || 'Failed to save clue'}
     </Typography>
    )}

    {/* Form Fields */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
     <Box sx={{ display: 'flex', gap: 2 }}>
      {/* Clue Field */}
      <Box sx={{ flex: 1 }}>
       <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
        Clue
       </Typography>
       <TextField
        fullWidth
        placeholder="Enter Clue"
        value={clue}
        onChange={(e) => setClue(e.target.value)}
        variant="outlined"
        inputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
       />
      </Box>

      {/* Points Field */}
      <Box sx={{ flex: 1 }}>
       <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
        Points
       </Typography>
       <TextField
        fullWidth
        placeholder="Enter Points"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        variant="outlined"
        inputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
       />
      </Box>
     </Box>

     {/* Hint Field */}
     <Box>
      <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
       Hint
      </Typography>
      <TextField
       fullWidth
       placeholder="Enter Hint"
       value={hint}
       onChange={(e) => setHint(e.target.value)}
       variant="outlined"
       inputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
      />
     </Box>

     {/* Location Dropdown */}
     <Box>
      <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
       Location
      </Typography>
      <FormControl fullWidth variant="outlined">
       <Select
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
        displayEmpty
        inputProps={{
         'aria-label': 'Location',
         style: { fontFamily: 'Poppins, sans-serif' },
        }}
       >
        <MenuItem value="" disabled>
         Select Location
        </MenuItem>
        {locations.map((location) => (
         <MenuItem key={location.id} value={location.id} sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {location.name}
         </MenuItem>
        ))}
       </Select>
      </FormControl>
     </Box>
    </Box>

    {/* Action Buttons */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
     <Button
      onClick={onClose}
      variant="outlined"
      sx={{
       width: '48%',
       color: '#999999',
       borderColor: '#999999',
       fontFamily: 'Poppins, sans-serif',
      }}
     >
      {clueData ? 'Cancel' : 'Discard'}
     </Button>
     <Button
      onClick={handleSave}
      variant="contained"
      sx={{
       width: '48%',
       backgroundColor: '#000000',
       color: '#FFFFFF',
       fontFamily: 'Poppins, sans-serif',
       '&:hover': {
        backgroundColor: '#333333',
       },
      }}
      disabled={isAdding || isUpdating || isLocationsLoading}
     >
      {clueData ? 'Save Changes' : 'Add Clue'}
     </Button>
    </Box>
   </DialogContent>
  </Dialog>
 );
};

export default CreateNewClueModal;
