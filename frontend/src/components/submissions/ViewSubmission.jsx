import React, { useState } from 'react';
import {
 Box,
 Typography,
 Button,
 Dialog,
 DialogContent,
 DialogTitle,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; // Use Material UI icon

// ViewSubmission Component
const ViewSubmission = ({ open, onClose }) => {
 const [isApprovedModalOpen, setApprovedModalOpen] = useState(false); // Approval modal state

 // Handlers for approval modal
 const handleOpenApprovedModal = () => setApprovedModalOpen(true);
 const handleCloseApprovedModal = () => setApprovedModalOpen(false);

 return (
  <>
   <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
     Actual Hunt Image
    </DialogTitle>
    <DialogContent>
     <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
      <img
       src="/hunt-image.png"
       alt="Actual Hunt"
       style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }}
      />
      <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
       Clue: <span style={{ fontWeight: 'normal' }}>WMHDC</span>
      </Typography>
     </Box>

     <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
      Participant Image
     </Typography>
     <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
      <img
       src="/hunt-image.png"
       alt="Participant"
       style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }}
      />
      <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
       Clue: <span style={{ fontWeight: 'normal' }}>WJHDC</span>
      </Typography>
     </Box>

     <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
      <Button
       variant="contained"
       onClick={handleOpenApprovedModal} // Open approval modal on click
       sx={{
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'Poppins, sans-serif',
        width: '48%',
        '&:hover': { backgroundColor: '#333' },
       }}
      >
       Approve
      </Button>
      <Button
       variant="contained"
       sx={{
        backgroundColor: '#E0E0E0',
        color: 'black',
        fontFamily: 'Poppins, sans-serif',
        width: '48%',
        '&:hover': { backgroundColor: '#D6D6D6' },
       }}
      >
       Reject
      </Button>
     </Box>
    </DialogContent>
   </Dialog>

   {/* Approval Confirmation Modal */}
   <Dialog open={isApprovedModalOpen} onClose={handleCloseApprovedModal} maxWidth="sm" fullWidth>
    <DialogContent sx={{ textAlign: 'center', padding: '32px' }}>
     <StarIcon sx={{ fontSize: 60, marginBottom: 2, color: 'black' }} />
     <Typography
      variant="h6"
      sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', marginBottom: 2 }}
     >
      Request Approved & moved into related Hunt
     </Typography>
     <Button
      variant="contained"
      onClick={handleCloseApprovedModal} // Close modal on click
      sx={{
       backgroundColor: 'black',
       color: 'white',
       fontFamily: 'Poppins, sans-serif',
       width: '100%',
       marginTop: 2,
       '&:hover': { backgroundColor: '#333' },
      }}
     >
      Cancel
     </Button>
    </DialogContent>
   </Dialog>
  </>
 );
};

export default ViewSubmission;
