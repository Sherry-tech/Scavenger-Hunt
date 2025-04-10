// SuccessPopup.jsx

import React from 'react';
import { Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessPopup = ({ onClose }) => {
 return (
  <div className="w-full max-w-md px-4 text-center">
   <CheckCircleOutlineIcon style={{ fontSize: 80, color: '#4caf50', marginTop: '20px' }} />
   <h3 className="font-poppins text-[24px] font-bold leading-[36px] mt-4 mb-8">
    Password Changed Successfully!
   </h3>
   <Button
    onClick={onClose}
    className="w-full"
    disableElevation
    variant="contained"
    sx={{
     textTransform: "none",
     color: "#fafafb",
     fontSize: "14px",
     background: "#333",
     borderRadius: "6px",
     "&:hover": { background: "#333" },
     height: 47,
    }}
   >
    Log In
   </Button>
  </div>
 );
};

export default SuccessPopup;
