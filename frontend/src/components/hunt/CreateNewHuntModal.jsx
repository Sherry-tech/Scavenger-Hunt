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
 Checkbox,
 FormControlLabel,
 Grid,
 Box,
 Typography,
 CircularProgress,
 ListItemText
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled } from '@mui/system';
import { useCreateHuntMutation, useGetLocationsQuery } from '../../slices/huntApiSlice';
import { format } from 'date-fns';

// Mappings
const modeMapping = {
 Training: 100,
 Easy: 101,
 Medium: 102,
 Difficult: 103,
 Hard: 104,
};

const typeMapping = {
 Puzzle: 200,
 Adventure: 201,
 AR: 202,
};

const playTypeMapping = {
 'Play Hunt Individually': 300,
 'Play Hunt with Team': 301,
};

// Styled components for consistent UI
const UploadBox = styled(Box)({
 border: '2px dashed #D3D3D3',
 borderRadius: '8px',
 height: '100%',
 width: '100%',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 cursor: 'pointer',
 position: 'relative',
});

const UploadImage = styled('img')({
 maxHeight: '100%',
 maxWidth: '100%',
 borderRadius: '8px',
 objectFit: 'cover',
});

const CancelButton = styled(Button)({
 backgroundColor: '#E0E0E0',
 color: 'black',
 fontFamily: 'Poppins, sans-serif',
 width: '48%',
 '&:hover': {
  backgroundColor: '#D6D6D6',
 },
});

const CreateButton = styled(Button)({
 backgroundColor: '#000000',
 color: '#FFFFFF',
 fontFamily: 'Poppins, sans-serif',
 width: '48%',
 '&:hover': {
  backgroundColor: '#333333',
 },
});

// Modal Component
const CreateNewHuntModal = ({ open, onClose, huntData }) => {
 const [huntName, setHuntName] = useState('');
 const [description, setDescription] = useState('');
 const [startDate, setStartDate] = useState(null);
 const [endDate, setEndDate] = useState(null);
 const [country, setCountry] = useState('');
 const [status, setStatus] = useState('');
 const [mode, setMode] = useState('');
 const [type, setType] = useState('');
 const [playIndividually, setPlayIndividually] = useState(true);
 const [playWithTeam, setPlayWithTeam] = useState(false);
 // const [location, setLocation] = useState('');
 const [locationIds, setLocationIds] = useState([]);
 const [uploadedImage, setUploadedImage] = useState(null);
 const [uploadedImageFile, setUploadedImageFile] = useState(null);
 const [code, setCode] = useState('');
 const [codeDescription, setCodeDescription] = useState('');

 // Import the mutation hook
 const [createHunt, { isLoading, isError, error }] = useCreateHuntMutation();
 const { data: locationsData, isLoading: locationsLoading, isError: locationsError } = useGetLocationsQuery();
 console.log('locationsData:', locationsData);

 useEffect(() => {
  if (huntData) {
   setHuntName(huntData.title || '');
   setDescription(huntData.description || '');
   setStartDate(huntData.startDate ? new Date(huntData.startDate) : null);
   setEndDate(huntData.endDate ? new Date(huntData.endDate) : null);
   setCountry(huntData.county || '');
   setStatus(huntData.status || '');

   // Map mode numeric code back to name
   const modeName = Object.keys(modeMapping).find(
    (key) => modeMapping[key] === huntData.mode
   );
   setMode(modeName || '');

   // Map type numeric code back to name
   const typeName = Object.keys(typeMapping).find(
    (key) => typeMapping[key] === huntData.huntType
   );
   setType(typeName || '');

   // Map gameType code to playIndividually and playWithTeam
   if (huntData.gameType === 300) {
    setPlayIndividually(true);
    setPlayWithTeam(false);
   } else if (huntData.gameType === 301) {
    setPlayIndividually(false);
    setPlayWithTeam(true);
   } else {
    setPlayIndividually(false);
    setPlayWithTeam(false);
   }

   // Set location IDs
   setLocationIds(
    huntData.locationIds
     ? huntData.locationIds.split(',').map((id) => parseInt(id, 10))
     : []
   );

   setCode(huntData.accessCode || '');
   setCodeDescription(huntData.accessCodeDescription || '');

   // For editing, display existing image if available
   if (huntData.huntImage) {
    setUploadedImage(huntData.huntImage);
   }
  } else {
   // Reset state variables when creating a new hunt
   setHuntName('');
   setDescription('');
   setStartDate(null);
   setEndDate(null);
   setCountry('');
   setStatus('');
   setMode('');
   setType('');
   setPlayIndividually(true);
   setPlayWithTeam(false);
   setLocationIds([]);
   setCode('');
   setCodeDescription('');
   setUploadedImage(null);
  }

  return () => {
   // Cleanup the blob URL when the component unmounts
   if (uploadedImage && typeof uploadedImage !== 'string') {
    URL.revokeObjectURL(uploadedImage);
   }
  };
 }, [huntData]);


 // Format date to 'dd-MM-yyyy'
 const formatDate = (date) => {
  return format(date, 'dd-MM-yyyy');
 };

 const handleCreate = async () => {
  // Create a FormData object
  const formData = new FormData();
  formData.append('title', huntName);
  formData.append('description', description);
  formData.append('startDate', startDate ? formatDate(startDate) : '');
  formData.append('endDate', endDate ? formatDate(endDate) : '');
  formData.append('county', country);
  formData.append('status', status);

  // Map mode and type to their numeric codes
  const modeCode = modeMapping[mode];
  const typeCode = typeMapping[type];
  formData.append('mode', modeCode);
  formData.append('huntType', typeCode);

  formData.append('accessCode', code);
  formData.append('accessCodeDescription', codeDescription);

  // Map play type to gameType code
  let gameTypeCode = '';
  if (playIndividually) {
   gameTypeCode = 300;
  } else if (playWithTeam) {
   gameTypeCode = 301;
  }
  formData.append('gameType', gameTypeCode);

  // Append locationIds (keeping the field name as is)
  formData.append('locationIds', locationIds.join(','));

  // Append the image file
  if (uploadedImageFile) {
   formData.append('huntImage', uploadedImageFile);
  }

  try {
   await createHunt(formData).unwrap();
   // On success
   onClose();
  } catch (err) {
   console.error('Failed to create hunt:', err);
  }
 };

 const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
   // Revoke the old object URL if it exists
   if (uploadedImage && typeof uploadedImage !== 'string') {
    URL.revokeObjectURL(uploadedImage);
   }

   const newImageUrl = URL.createObjectURL(file);
   setUploadedImageFile(file); // Store the file object directly
   setUploadedImage(newImageUrl); // Display the image preview using a blob URL
  }
 };

 return (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
   <DialogTitle sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
    {huntData ? 'Edit Hunt' : 'Create New Hunt'}
   </DialogTitle>
   <DialogContent>
    {/* Show loading indicator */}
    {isLoading && (
     <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <CircularProgress />
     </Box>
    )}
    {/* Show error message */}
    {isError && (
     <Typography color="error" sx={{ mb: 2 }}>
      {error?.data?.message || 'Failed to create hunt'}
     </Typography>
    )}
    <Grid container spacing={2}>
     {/* Left Side Content */}
     <Grid item xs={8}>
      {/* Hunt Name */}
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>Title</Typography>
      <TextField
       fullWidth
       value={huntName}
       onChange={(e) => setHuntName(e.target.value)}
       inputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
       sx={{ marginBottom: 2 }}
      />

      {/* Description */}
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>Description</Typography>
      <TextField
       fullWidth
       value={description}
       onChange={(e) => setDescription(e.target.value)}
       inputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
       sx={{ marginBottom: 2 }}
      />

      {/* Start Date, End Date, Type */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
       <Grid item xs={4}>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>Start Date</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
         <DatePicker
          value={startDate}
          onChange={(newDate) => setStartDate(newDate)}
          renderInput={(params) => (
           <TextField
            {...params}
            inputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
            fullWidth
           />
          )}
         />
        </LocalizationProvider>
       </Grid>
       <Grid item xs={4}>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>End Date</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
         <DatePicker
          value={endDate}
          onChange={(newDate) => setEndDate(newDate)}
          renderInput={(params) => (
           <TextField
            {...params}
            inputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
            fullWidth
           />
          )}
         />
        </LocalizationProvider>
       </Grid>
       <Grid item xs={4}>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>Type</Typography>
        <FormControl fullWidth>
         <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Type', style: { fontFamily: 'Poppins, sans-serif' } }}
         >
          <MenuItem value="" disabled>
           Select Type
          </MenuItem>
          <MenuItem value="Puzzle">Puzzle</MenuItem>
          <MenuItem value="Adventure">Adventure</MenuItem>
          <MenuItem value="AR">AR</MenuItem>
         </Select>
        </FormControl>
       </Grid>
      </Grid>

      {/* Status, Mode, Country */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
       <Grid item xs={4}>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>Status</Typography>
        <FormControl fullWidth>
         <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Status', style: { fontFamily: 'Poppins, sans-serif' } }}
         >
          <MenuItem value="" disabled>
           Select Status
          </MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
         </Select>
        </FormControl>
       </Grid>
       <Grid item xs={4}>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>Mode</Typography>
        <FormControl fullWidth>
         <Select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Mode', style: { fontFamily: 'Poppins, sans-serif' } }}
         >
          <MenuItem value="" disabled>
           Select Mode
          </MenuItem>
          <MenuItem value="Training">Training</MenuItem>
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Difficult">Difficult</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
         </Select>
        </FormControl>
       </Grid>
       <Grid item xs={4}>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>Country</Typography>
        <FormControl fullWidth>
         <Select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Country', style: { fontFamily: 'Poppins, sans-serif' } }}
         >
          <MenuItem value="" disabled>
           Select County
          </MenuItem>
          <MenuItem value="Bristol">Bristol</MenuItem>
          <MenuItem value="Newport">Newport</MenuItem>
         </Select>
        </FormControl>
       </Grid>
      </Grid>
     </Grid>

     {/* Right Side Image Upload */}
     <Grid item xs={4} display="flex" justifyContent="center" alignItems="flex-start">
      <UploadBox component="label">
       {uploadedImage ? (
        <UploadImage src={uploadedImage} alt="Uploaded Preview" />
       ) : (
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center' }}>
         <img src="/upload-icon.svg" alt="Upload" style={{ marginRight: '8px', width: '24px' }} />
         Upload Image
        </Typography>
       )}
       <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
       />
      </UploadBox>
     </Grid>
    </Grid>

    {/* Checkboxes */}
    <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
     <FormControlLabel
      control={
       <Checkbox
        checked={playIndividually}
        onChange={(e) => {
         setPlayIndividually(e.target.checked);
         if (e.target.checked) {
          setPlayWithTeam(false);
         }
        }}
        sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
       />
      }
      label="Play Hunt Individually"
      sx={{ fontFamily: 'Poppins, sans-serif' }}
     />
     <FormControlLabel
      control={
       <Checkbox
        checked={playWithTeam}
        onChange={(e) => {
         setPlayWithTeam(e.target.checked);
         if (e.target.checked) {
          setPlayIndividually(false);
         }
        }}
        sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
       />
      }
      label="Play Hunt with Team"
      sx={{ fontFamily: 'Poppins, sans-serif' }}
     />
    </Box>

    {/* Code and Description */}
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
     <Grid item xs={4}>
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>Code</Typography>
      <TextField
       fullWidth
       value={code}
       onChange={(e) => setCode(e.target.value)}
       inputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
      />
     </Grid>
     <Grid item xs={8}>
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>
       Description (How to use)
      </Typography>
      <TextField
       fullWidth
       value={codeDescription}
       onChange={(e) => setCodeDescription(e.target.value)}
       inputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
      />
     </Grid>
    </Grid>

    {/* Location and Task Detail */}
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
     <Grid item xs={12}>
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>Location</Typography>
      <FormControl fullWidth>
       <Select
        multiple
        value={locationIds}
        onChange={(e) => setLocationIds(e.target.value)}
        renderValue={(selected) =>
         selected
          .map((id) => {
           const location = locationsData?.data.find((loc) => loc.id === id);
           return location ? location.name : '';
          })
          .join(', ')
        }
        inputProps={{
         'aria-label': 'Location',
         style: { fontFamily: 'Poppins, sans-serif' },
        }}
        disabled={locationsLoading || locationsError}
       >
        {locationsLoading ? (
         <MenuItem disabled>Loading...</MenuItem>
        ) : locationsError ? (
         <MenuItem disabled>Error loading locations</MenuItem>
        ) : (
         locationsData?.data.map((location) => (
          <MenuItem key={location.id} value={location.id}>
           <Checkbox
            checked={locationIds.indexOf(location.id) > -1}
            sx={{
             color: 'black',
             '&.Mui-checked': {
              color: 'black',
             },
            }}
           />
           <ListItemText primary={location.name} />
          </MenuItem>
         ))
        )}
       </Select>
      </FormControl>
     </Grid>
    </Grid>

    {/* Buttons */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
     <CancelButton onClick={onClose}>Discard</CancelButton>
     <CreateButton onClick={handleCreate}>Save Changes</CreateButton>
    </Box>
   </DialogContent>
  </Dialog>
 );
};

export default CreateNewHuntModal;
