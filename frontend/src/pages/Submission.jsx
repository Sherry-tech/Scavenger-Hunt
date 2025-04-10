import React from 'react';
import { Button, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Menu from '../components/layout/SideMenu';
import Header from '../components/layout/Header';
import SubmissionTable from '../components/submissions/SubmissionTable'; // Import SubmissionTable

const Submission = () => {
 const [viewType, setViewType] = useState('userSubmission'); // Toggle state

 const handleViewChange = (event, newView) => {
  if (newView !== null) {
   setViewType(newView);
  }
 };

 const data = [
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participant: 'John Smith',
   location: 'Newport',
   submissionDate: 'Aug 05, 2024',
   points: 400,
  },
 ];

 return (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
   <div className="flex min-h-screen bg-default-theme-white text-darkslategray-200 font-poppins">
    {/* Sidebar (Menu) */}
    <div className="w-64 bg-[#DCDCDC] shadow-md">
     <Menu />
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col p-6 space-y-6">
     {/* Header */}
     <Header title="Submissions" />



     {/* Submission Table */}
     <SubmissionTable data={data} />
    </div>
   </div>
  </LocalizationProvider>
 );
};

export default Submission;
