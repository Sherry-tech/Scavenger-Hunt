// pages/Experience.jsx
import React, { useState } from 'react';
import Menu from '../components/layout/SideMenu';
import Header from '../components/layout/Header';
import ExperienceTable from '../components/experiences/ExperienceTable';
import { useGetExperiencesQuery } from '../slices/experienceApiSlice';

const Experience = () => {
 const [searchByName, setSearchByName] = useState('');
 const [page, setPage] = useState(1); // Start from page 1
 const [limit, setLimit] = useState(5); // Default items per page

 const { data, error, isLoading } = useGetExperiencesQuery({
  searchByName,
  page,
  limit,
 });

 const experiences = data?.data || []; // Adjust based on your API response structure

 return (
  <div className="flex min-h-screen bg-default-theme-white text-darkslategray-200 font-poppins">
   {/* Sidebar (Menu) */}
   <div className="w-64 bg-[#DCDCDC] shadow-md">
    <Menu />
   </div>

   {/* Main Content */}
   <div className="flex-1 flex flex-col p-6 space-y-6 font-poppins">
    {/* Header */}
    <Header title="Experiences" />

    {/* Experience Table */}
    {isLoading ? (
     <p>Loading...</p>
    ) : error ? (
     <p style={{ color: 'red' }}>
      {error?.data?.message || 'Error fetching experiences'}
     </p>
    ) : (
     <ExperienceTable
      data={experiences}
      searchByName={searchByName}
      setSearchByName={setSearchByName}
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
      totalItems={data?.totalItems || experiences.length}
     />
    )}
   </div>
  </div>
 );
};

export default Experience;
