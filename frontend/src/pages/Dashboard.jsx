import React from "react";
import FrameComponent1 from "../components/FrameComponent1";
import CreatorRow from "../components/CreatorRow";
import Menu from "../components/layout/SideMenu";
import DashboardTable from "../components/dashboard/DashboardTable";
import Header from "../components/layout/Header";



const Dashboard = () => {

 const columns = [
  {
   title: "Hunt Name",
   field: "huntName",
   render: (row) => (
    <div className="flex items-center">
     <div className="h-10 w-10 bg-darkgray-200 rounded-full mr-2" />
     <span className="text-md font-medium text-black">{row.huntName}</span>
    </div>
   ),
  },
  {
   title: "Participants",
   field: "participants",
   render: (row) => (
    <span className="text-md text-black">{row.participants}</span>
   ),
  },
  {
   title: "Location",
   field: "location",
   render: (row) => (
    <span className="text-md text-black">{row.location}</span>
   ),
  },
  {
   title: "Status",
   field: "status",
   render: (row) => (
    <div className="bg-green-500 text-white px-2 py-1 rounded">
     {row.status}
    </div>
   ),
  },
 ];

 // Define sample data for the table
 const data = [
  {
   huntName: "Burr's Hill - Royal Pokan...",
   participants: "John Smith",
   location: "Bristol",
   status: "Approved",
  },
  {
   huntName: "Another Hunt Name...",
   participants: "Jane Doe",
   location: "Newport",
   status: "Pending",
  },
  {
   huntName: "Hunt in Kent",
   participants: "Alice Johnson",
   location: "Kent",
   status: "Approved",
  },
  // Add more sample data as needed
 ];

 return (
  <div className="flex min-h-screen bg-default-theme-white text-darkslategray-200 font-poppins">
   {/* Sidebar (Menu) */}
   <div className="w-64 bg-[#DCDCDC] shadow-md">
    <Menu />
   </div>

   {/* Main Content */}
   <div className="flex-1 flex flex-col p-6 space-y-6">
    {/* Header */}
    <Header title="Dashboard" />

    {/* Stats Cards */}
    <div className="flex justify-between space-x-4">
     <Card title="Hunts" value="20547" />
     <Card title="Experience" value="20487" />
     <Card title="Locations" value="20297" />
    </div>

    {/* Content Section */}
    <div className="flex flex-1 space-x-4">
     {/* Table Section */}
     <div className="flex-1 bg-white rounded-lg shadow-md">
      <DashboardTable />
     </div>

     {/* Sidebar Section */}
     <div className="w-80 space-y-8">
      <SidebarCard title="Top Creators">
       <CreatorList />
      </SidebarCard>

      <SidebarCard title="Top Participants">
       <CreatorList />
      </SidebarCard>
     </div>
    </div>
   </div>
  </div>
 );
};

// Reusable Card Component
const Card = ({ title, value }) => (
 <div className="flex-1 bg-[#DCDCDC] rounded-lg p-6 flex items-center justify-between shadow">
  <div className="flex items-center space-x-4">
   <div className="h-16 w-16 bg-darkgray-200 rounded-full" />
   <span className="text-md font-medium text-black">{title}</span>
  </div>
  <span className="text-[2.15rem] font-bold text-black">{value}</span>
 </div>
);

// Reusable Sidebar Card Component
const SidebarCard = ({ title, children }) => (
 <div className="bg-[#DCDCDC] rounded-lg p-4 shadow-md">
  <div className="flex items-center justify-between mb-4">
   <h2 className="font-semibold text-black">{title}</h2>
   <a className="text-sm text-black underline">View All</a>
  </div>
  {children}
 </div>
);

// Creator List for Sidebar
const CreatorList = () => (
 <div className="space-y-4">
  <CreatorRow jouyeMedison="Jouye Medison" huntsCreated="1492 Points" />
  <CreatorRow jouyeMedison="Lucas Abraham" huntsCreated="1390 Points" />
  <CreatorRow jouyeMedison="Yossy Angela" huntsCreated="1285 Points" />
  <CreatorRow jouyeMedison="Jouye Medison" huntsCreated="1492 Points" />
 </div>
);

export default Dashboard;
