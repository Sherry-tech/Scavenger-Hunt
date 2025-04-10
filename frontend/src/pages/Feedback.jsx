// pages/Feedback.jsx
import React from 'react';
import Menu from '../components/layout/SideMenu';
import Header from '../components/layout/Header';


const Feedback = () => (
 <div className="flex min-h-screen bg-default-theme-white text-darkslategray-200 font-poppins">
  <div className="w-64 bg-[#DCDCDC] shadow-md">
   <Menu />
  </div>

  <div className="flex-1 flex flex-col p-6 space-y-6">
   <Header title="Feedback" />
  </div>
 </div>
);

export default Feedback;
