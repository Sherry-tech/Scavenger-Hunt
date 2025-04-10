// pages/Location.jsx
import React from 'react';
import Menu from '../components/layout/SideMenu';
import Header from '../components/layout/Header';
import LocationTable from '../components/locations/LocationTable';
import { useGetLocationsQuery } from '../slices/locationApiSlice';

const Location = () => {
 const { data: locations, error, isLoading } = useGetLocationsQuery();

 return (
  <div className="flex min-h-screen bg-default-theme-white text-darkslategray-200 font-poppins">
   <div className="w-64 bg-[#DCDCDC] shadow-md">
    <Menu />
   </div>

   <div className="flex-1 flex flex-col p-6 space-y-6">
    <Header title="Locations" />
    {/* Location Table */}
    {isLoading ? (
     <p>Loading...</p>
    ) : error ? (
     <p>Error: {error.toString()}</p>
    ) : (
     <LocationTable data={locations} />
    )}
   </div>
  </div>
 );
};

export default Location;
