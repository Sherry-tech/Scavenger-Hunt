// components/layout/SideMenu.jsx
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const SideMenu = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const currentPath = location.pathname; // Current path

  const handleNavigation = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  // SideMenu Items with updated activePaths
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", iconBg: "bg-dimgray-200" },
    {
      name: "Hunt",
      path: "/hunt",
      iconBg: "bg-dimgray-200",
      activePaths: ["/hunt", "/view-hunt"], // Added activePaths for Hunt
    },
    { name: "Submission", path: "/submission", iconBg: "bg-dimgray-200" },
    { name: "Experience", path: "/experience", iconBg: "bg-dimgray-200", activePaths: ["/experience", "/view-experience"] },
    { name: "Location", path: "/location", iconBg: "bg-dimgray-200", activePaths: ["/location", "/view-location"] },
    { name: "Clues", path: "/clues", iconBg: "bg-dimgray-200" },
    { name: "Feedback", path: "/feedback", iconBg: "bg-dimgray-200" },
    { name: "Notifications", path: "/notifications", iconBg: "bg-dimgray-200" },
    { name: "User Account", path: "/account-management", iconBg: "bg-dimgray-200" },
  ];

  return (
    <div
      className={`h-full w-[16.875rem] text-left text-[2.625rem] text-black font-poppins relative ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-full rounded bg-gainsboro-200" />

      {/* SideMenu Navigation */}
      <nav className="absolute top-[11.25rem] left-[1.625rem] w-[13.563rem] flex flex-col gap-[0.875rem]">
        {menuItems.map((item) => {
          // Check if currentPath starts with any of the paths in activePaths
          let isActive = false;
          if (item.activePaths) {
            isActive = item.activePaths.some((path) => currentPath.startsWith(path));
          } else {
            isActive = currentPath.startsWith(item.path);
          }

          return (
            <div
              key={item.name}
              className={`flex items-center py-[0.75rem] px-[1rem] rounded ${isActive
                ? "bg-black text-white"
                : "hover:bg-gray-300 cursor-pointer"
                }`}
              onClick={() => handleNavigation(item.path)}
            >
              <div
                className={`h-[1.125rem] w-[1.125rem] rounded-full ${isActive ? "bg-white" : item.iconBg
                  }`}
              />
              <span className="ml-[0.5rem] font-medium text-[1rem]">
                {item.name}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

SideMenu.propTypes = {
  className: PropTypes.string,
};

export default SideMenu;
