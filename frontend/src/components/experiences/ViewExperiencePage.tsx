// pages/ViewExperiencePage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Typography,
  Button,
  Box,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Menu from '../layout/SideMenu';
import Header from '../layout/Header';
import CreateNewExperienceModal from './CreateNewExperienceModal';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';
import { useDeleteExperienceMutation } from '../../slices/experienceApiSlice';

const ViewExperiencePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const experienceData = location.state?.experience || {}; // Retrieve experience data from the route's state

  // State for modals
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Delete mutation
  const [deleteExperience, { isLoading: isDeleting, isError: deleteError, error: deleteErrData }] =
    useDeleteExperienceMutation();

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleOpenDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleConfirmDelete = async () => {
    if (!experienceData?.id) return;
    try {
      await deleteExperience(experienceData.id).unwrap();
      console.log('Experience deleted successfully');
      setDeleteModalOpen(false);
      navigate('/experience'); // Navigate back after successful deletion
    } catch (err) {
      console.error('Failed to delete experience:', err);
    }
  };

  console.log(experienceData, 'experienceData');
  const mediaFiles = experienceData.experienceImage || []; // Use mediaFiles from experienceData

  return (
    <div className="flex min-h-screen text-darkslategray-200">
      {/* Sidebar Menu */}
      <div className="w-64 bg-[#DCDCDC] shadow-md">
        <Menu />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 space-y-6 font-poppins">
        {/* Header */}
        <Header title="Experience" />

        {/* Experience Details View */}
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
                  {experienceData.title || 'Experience Title'}
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
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <CircularProgress size={20} sx={{ color: '#000' }} />
                  ) : (
                    'Delete'
                  )}
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

            {/* Experience Description */}
            <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
              {experienceData.description || 'No description available.'}
            </Typography>

            {/* Experience Details in a Single Line with Dividers */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 3,
                borderTop: '1px solid #DBDBDB',
                borderBottom: '1px solid #DBDBDB',
                position: 'relative',
                paddingY: 2,
                overflow: 'hidden', // Prevent content from overflowing
              }}
            >
              {/* Type */}
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
                  Type:
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {experienceData.type || 'N/A'}
                </Typography>
                {/* Divider */}
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    backgroundColor: '#DBDBDB',
                    height: '60%',
                    marginLeft: 2,
                  }}
                />
              </Box>

              {/* Status */}
              <Box
                sx={{
                  flex: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 2,
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
                  Status:
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {experienceData.status || 'N/A'}
                </Typography>
                {/* Divider */}
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    backgroundColor: '#DBDBDB',
                    height: '60%',
                    marginLeft: 2,
                  }}
                />
              </Box>

              {/* Associated Hunts */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 2,
                  overflow: 'hidden', // Prevent content from overflowing
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
                  Associated Hunts:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    gap: 0.5,
                    overflow: 'hidden',
                  }}
                >
                  {experienceData.hunts && experienceData.hunts.length > 0 ? (
                    experienceData.hunts.map((hunt, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#888888',
                          borderRadius: '4px',
                          padding: '2px 6px', // Reduced padding
                          marginRight: 0.5,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            marginRight: '4px',
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            color: 'white',
                            fontFamily: 'Poppins',
                            fontSize: '0.75rem',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {hunt}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography sx={{ fontFamily: 'Poppins', fontSize: '0.875rem' }}>
                      N/A
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Media Files Section */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Poppins', marginY: 3 }}>
            Media Files
          </Typography>
          <Box sx={{ backgroundColor: '#FFFFFF', padding: 2 }}>
  {(() => {
    // Convert mediaFiles to an array if it's a string
    const normalizedMediaFiles = Array.isArray(mediaFiles) ? mediaFiles : mediaFiles ? [mediaFiles] : [];

    return normalizedMediaFiles.length > 0 ? (
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
          paddingY: 2,
        }}
      >
        {normalizedMediaFiles.map((src, index) => (
          <Box key={index} sx={{ width: '45%', marginBottom: 2 }}>
            <img
              src={src}
              alt={`Media ${index + 1}`}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </Box>
        ))}
      </Box>
    ) : (
      <Typography
        sx={{ fontFamily: 'Poppins', textAlign: 'center', color: '#555555' }}
      >
        No media files available.
      </Typography>
    );
  })()}
          </Box>
        </div>
      </div>

      {/* Modals */}
      <CreateNewExperienceModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        experienceData={experienceData} // Pass the current experience data for editing
      />
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirmDelete={handleConfirmDelete}
        message={
          deleteError
            ? deleteErrData?.data?.message || 'Failed to delete experience.'
            : 'Are you sure you want to delete this experience?'
        }
      />
    </div>
  );
};

export default ViewExperiencePage;
