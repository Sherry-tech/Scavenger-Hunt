// components/experience/CreateNewExperienceModal.jsx
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
 CircularProgress,
 Checkbox,
 ListItemText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
 useGetExperienceLocationsDropDownQuery, useAddExperienceMutation, useEditExperienceMutation
} from '../../slices/experienceApiSlice';

const CreateNewExperienceModal = ({ open, onClose, experienceData }) => {
 const isEditMode = Boolean(experienceData?.id);

 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [associatedLocations, setAssociatedLocations] = useState([]);
 const [type, setType] = useState('');
 const [status, setStatus] = useState('');
 const [uploadedMedia, setUploadedMedia] = useState(null);
 const [uploadedMediaFile, setUploadedMediaFile] = useState(null);

 // Queries and mutations
 const { data: locationsData, isLoading: locationsLoading, isError: locationsError } = useGetExperienceLocationsDropDownQuery();
 const [addExperience, { isLoading: addingExperience, isError: addError, error: addErrData }] = useAddExperienceMutation();
 const [editExperience, { isLoading: editingExperience, isError: editError, error: editErrData }] = useEditExperienceMutation();

 useEffect(() => {
  if (experienceData) {
   setTitle(experienceData.title || '');
   setDescription(experienceData.description || '');
   // associatedLocations might be a comma-separated string or an array of IDs.
   // Adjust this parsing based on your actual data structure.
   const locs = experienceData.associatedLocations
    ? experienceData.associatedLocations.split(',').map((loc) => loc.trim())
    : [];
   setAssociatedLocations(locs);
   setType(experienceData.type || '');
   setStatus(experienceData.status || '');
   if (experienceData.experienceImage) {
    setUploadedMedia(experienceData.experienceImage);
   }
   setUploadedMediaFile(null); // Clear the file so we don't accidentally upload an old one
  } else {
   // Reset form fields for new experience
   setTitle('');
   setDescription('');
   setAssociatedLocations([]);
   setType('');
   setStatus('');
   setUploadedMedia(null);
   setUploadedMediaFile(null);
  }

  // Cleanup any old object URLs
  return () => {
   if (uploadedMedia && typeof uploadedMedia !== 'string') {
    URL.revokeObjectURL(uploadedMedia);
   }
  };
 }, [experienceData]);

 const handleMediaUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
   if (uploadedMedia && typeof uploadedMedia !== 'string') {
    URL.revokeObjectURL(uploadedMedia);
   }
   const newImageUrl = URL.createObjectURL(file);
   setUploadedMediaFile(file);
   setUploadedMedia(newImageUrl);
  }
 };

 const handleSave = async () => {
  // Construct FormData
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('type', type);
  formData.append('status', status);
  formData.append('associatedLocations', associatedLocations.join(','));

  if (uploadedMediaFile) {
   // Use 'experienceImage' field name as per the backend requirement
   formData.append('experienceImage', uploadedMediaFile);
  }

  try {
   if (isEditMode) {
    // Edit experience
    formData.append('id', experienceData.id);
    await editExperience(formData).unwrap();
   } else {
    // Add new experience
    await addExperience(formData).unwrap();
   }
   onClose();
  } catch (err) {
   console.error('Failed to save experience:', err);
  }
 };

 return (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
   <DialogTitle
    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
   >
    <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
     {isEditMode ? 'Edit Experience' : 'Create New Experience'}
    </Typography>
    <IconButton onClick={onClose}>
     <CloseIcon />
    </IconButton>
   </DialogTitle>

   <DialogContent dividers>
    {(addingExperience || editingExperience) && (
     <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <CircularProgress />
     </Box>
    )}

    {/* Show error if any */}
    {(addError || editError) && (
     <Typography color="error" sx={{ mb: 2 }}>
      {addErrData?.data?.message || editErrData?.data?.message || 'Failed to save experience'}
     </Typography>
    )}

    {/* Upload Media Section */}
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
     component="label"
    >
     {uploadedMedia ? (
      <img
       src={uploadedMedia}
       alt="Uploaded Media"
       style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
     ) : (
      <>
       <img
        src="/upload-icon.svg"
        alt="Upload Icon"
        style={{ width: '50px', marginBottom: '8px' }}
       />
       <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: 2 }}>
        Upload Media
       </Typography>
      </>
     )}
     <input
      type="file"
      accept="image/*,video/*"
      onChange={handleMediaUpload}
      style={{ display: 'none' }}
     />
    </Box>

    {/* Experience Form Fields */}
    <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
     Title
    </Typography>
    <TextField
     fullWidth
     placeholder="Add Title"
     variant="outlined"
     value={title}
     onChange={(e) => setTitle(e.target.value)}
     sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}
     inputProps={{
      style: { fontFamily: 'Poppins, sans-serif' },
     }}
    />

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

    <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
     Associated Locations
    </Typography>
    <Select
     fullWidth
     displayEmpty
     value={associatedLocations}
     onChange={(e) => setAssociatedLocations(e.target.value)}
     multiple
     renderValue={(selected) => {
      if (selected.length === 0) {
       return 'Add Associated Locations';
      }
      // Map the selected IDs to the location names
      const selectedNames = selected.map((locId) => {
       const loc = locationsData?.data?.find((l) => l.id === parseInt(locId, 10));
       return loc ? loc.name : locId;
      });
      return selectedNames.join(', ');
     }}
     sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}
    >
     {locationsLoading ? (
      <MenuItem disabled>Loading...</MenuItem>
     ) : locationsError ? (
      <MenuItem disabled>Error loading locations</MenuItem>
     ) : (
      locationsData?.data?.map((location) => (
       <MenuItem key={location.id} value={location.id.toString()}>
        <Checkbox
         checked={associatedLocations.indexOf(location.id.toString()) > -1}
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

    {/* Type and Status Select Fields */}
    <Box sx={{ display: 'flex', gap: 2 }}>
     <Box sx={{ width: '100%' }}>
      <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
       Type
      </Typography>
      <Select
       fullWidth
       displayEmpty
       value={type}
       onChange={(e) => setType(e.target.value)}
       sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}
      >
       <MenuItem value="" sx={{ fontFamily: 'Poppins, sans-serif' }}>
        Choose Type
       </MenuItem>
       <MenuItem value="AR" sx={{ fontFamily: 'Poppins, sans-serif' }}>
        AR
       </MenuItem>
       <MenuItem value="Puzzle" sx={{ fontFamily: 'Poppins, sans-serif' }}>
        Puzzle
       </MenuItem>
       <MenuItem value="Text" sx={{ fontFamily: 'Poppins, sans-serif' }}>
        Text
       </MenuItem>
      </Select>
     </Box>

     <Box sx={{ width: '100%' }}>
      <Typography sx={{ marginBottom: 1, fontFamily: 'Poppins, sans-serif' }}>
       Status
      </Typography>
      <Select
       fullWidth
       displayEmpty
       value={status}
       onChange={(e) => setStatus(e.target.value)}
       sx={{ marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}
      >
       <MenuItem value="" sx={{ fontFamily: 'Poppins, sans-serif' }}>
        Choose Status
       </MenuItem>
       <MenuItem value="Active" sx={{ fontFamily: 'Poppins, sans-serif' }}>
        Active
       </MenuItem>
       <MenuItem value="Inactive" sx={{ fontFamily: 'Poppins, sans-serif' }}>
        Inactive
       </MenuItem>
      </Select>
     </Box>
    </Box>

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
      {isEditMode ? 'Save Changes' : 'Add New Experience'}
     </Button>
    </Box>
   </DialogContent>
  </Dialog>
 );
};

export default CreateNewExperienceModal;
