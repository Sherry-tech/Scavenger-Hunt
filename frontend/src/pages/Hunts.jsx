// pages/HuntsListView.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Menu from '../components/layout/SideMenu';
import Header from '../components/layout/Header';
import HuntTable from '../components/hunt/HuntTable';
import { useGetHuntsQuery } from '../slices/huntApiSlice';
import Loader from '../components/common/Loader';

const HuntsListView = () => {
  const navigate = useNavigate();
  const [searchByName, setSearchByName] = useState('');
  const [page, setPage] = useState(1); // Start from page 1
  const [limit, setLimit] = useState(10);

  // Use the useGetHuntsQuery hook to fetch data
  const { data, isLoading, isError, error } = useGetHuntsQuery({
    searchByName,
    page,
    limit,
  });

  // Extract hunts data safely
  const hunts = data?.data || [];

  // Handler for changing the page
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handler for changing the limit (rows per page)
  const handleRowsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
  };

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
          <Header title="Hunts" />

          {/* Hunt Table */}
          <div className="flex-1 bg-white rounded-lg shadow-md" style={{ position: 'relative' }}>
            {isLoading && (
              <Loader overlay={true} />
            )}
            {isError && (
              <p style={{ color: 'red' }}>
                {error?.data?.message || 'Error fetching hunts'}
              </p>
            )}
            <HuntTable
              data={hunts}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={limit}
              searchByName={searchByName}
              setSearchByName={setSearchByName}
            />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default HuntsListView;
