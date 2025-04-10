// CustomPagination.js
import React from 'react';
import { Box, IconButton, Typography, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

// Helper function to get page numbers for pagination
export const getPageNumbers = (count, rowsPerPage, currentPage) => {
 const totalPages = Math.ceil(count / rowsPerPage);
 const visiblePages = 5; // Adjust as needed
 const pages = [];

 let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
 let endPage = Math.min(totalPages, startPage + visiblePages - 1);

 if (endPage - startPage + 1 < visiblePages) {
  startPage = Math.max(1, endPage - visiblePages + 1);
 }

 for (let i = startPage; i <= endPage; i++) {
  pages.push(i);
 }

 return pages;
};

// Custom Pagination Actions Component
export const CustomPaginationActions = ({ count, page, rowsPerPage, onPageChange }) => {
 const totalPages = Math.ceil(count / rowsPerPage);

 const handleFirstPageButtonClick = (event) => onPageChange(event, 0);
 const handleBackButtonClick = (event) => onPageChange(event, page - 1);
 const handleNextButtonClick = (event) => onPageChange(event, page + 1);
 const handleLastPageButtonClick = (event) => onPageChange(event, totalPages - 1);

 const pageNumbers = getPageNumbers(count, rowsPerPage, page + 1);

 return (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
   <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
    <FirstPageIcon />
   </IconButton>
   <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
    <KeyboardArrowLeft />
   </IconButton>

   {/* Render page numbers */}
   {pageNumbers.map((pageNumber) => (
    <Typography
     key={pageNumber}
     onClick={(event) => onPageChange(event, pageNumber - 1)}
     sx={{
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      backgroundColor: pageNumber - 1 === page ? 'black' : 'white',
      color: pageNumber - 1 === page ? 'white' : 'black',
      cursor: 'pointer',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: pageNumber - 1 === page ? 'bold' : 'normal',
     }}
    >
     {pageNumber}
    </Typography>
   ))}

   {/* Ellipsis if there are more pages */}
   {pageNumbers[pageNumbers.length - 1] < totalPages && (
    <Typography
     sx={{
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
     }}
    >
     ...
    </Typography>
   )}

   <IconButton
    onClick={handleNextButtonClick}
    disabled={page >= totalPages - 1}
    aria-label="next page"
   >
    <KeyboardArrowRight />
   </IconButton>
   <IconButton
    onClick={handleLastPageButtonClick}
    disabled={page >= totalPages - 1}
    aria-label="last page"
   >
    <LastPageIcon />
   </IconButton>
  </Box>
 );
};

// Styled Pagination Container
export const StyledPaginationContainer = styled(Box)({
 display: 'flex',
 justifyContent: 'space-between', // Ensures proper spacing between items
 alignItems: 'center',
 padding: '8px 16px',
 backgroundColor: '#DCDCDC',
 fontFamily: 'Poppins, sans-serif',
 width: '100%', // Ensures the container takes full width
});
