// pages/Clue.jsx
import React, { useState } from 'react';
import Menu from '../components/layout/SideMenu';
import Header from '../components/layout/Header';
import ClueTable from '../components/clues/ClueTable';
import { useGetCluesQuery } from '../slices/clueApiSlice';
import Loader from '../components/common/Loader';

const Clue = () => {
 const [searchQuery, setSearchQuery] = useState('');
 const [page, setPage] = useState(1);
 const [limit, setLimit] = useState(10);

 const { data, isLoading, isError, error } = useGetCluesQuery({
  searchName: searchQuery,
  page,
  limit,
 });

 const clues = data?.data?.result || [];
 const totalPages = data?.data?.totalPage || 1;

 return (
  <div className="flex min-h-screen bg-default-theme-white text-darkslategray-200 font-poppins">
   <div className="w-64 bg-[#DCDCDC] shadow-md">
    <Menu />
   </div>

   <div className="flex-1 flex flex-col p-6 space-y-6">
    <Header title="Clues" />
    <div className="flex-1 bg-white rounded-lg shadow-md" style={{ position: 'relative' }}>
     {isLoading && (
      <Loader overlay={true} />
     )}
     {isError && (
      <p style={{ color: 'red' }}>
       {error?.data?.message || 'Error fetching hunts'}
      </p>
     )}

     <ClueTable
      data={clues}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
      totalPages={totalPages}
     />
    </div>
   </div>
  </div>
 );
};

export default Clue;
