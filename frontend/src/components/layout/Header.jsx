// components/layout/Header.js
import React from 'react';

const Header = ({ title = 'Scavenger Hunt' }) => (
 <div className="bg-[#DCDCDC] rounded-lg py-1 px-4 shadow-sm">
  <div className="flex items-center justify-between">
   <h1 className="text-2xl font-bold text-black">{title}</h1>
   <div className="flex items-center space-x-4">
    <img
     className="h-8 w-8 object-cover"
     alt="Bell"
     src="/image-2@2x.png"
    />
    <div className="w-px h-8 bg-darkgray-100" />
    <div className="flex items-center space-x-2">
     <div className="h-10 w-10 bg-darkgray-200 rounded-full" />
     <div className="flex flex-col">
      <span className="font-semibold text-black">John Smith</span>
      <span className="text-sm text-dimgray-300">Admin</span>
     </div>
    </div>
   </div>
  </div>
 </div>
);

export default Header;
