import { useMemo } from "react";
import PropTypes from "prop-types";

const CreatorRow = ({
  className = "",
  propWidth,
  jouyeMedison,
  huntsCreated,
  propDisplay,
  propMinWidth,
}) => {
  const statsStyle = useMemo(() => ({
    width: propWidth,
  }), [propWidth]);

  const huntsCreatedStyle = useMemo(() => ({
    display: propDisplay,
    minWidth: propMinWidth,
  }), [propDisplay, propMinWidth]);

  return (
    <div
      className={`flex items-center p-4 mb-3 bg-white shadow-md rounded-lg ${className}`}
    >
      {/* Avatar and Text */}
      <div className="flex items-center gap-4">
        <img
          className="h-12 w-12 rounded-full"
          alt="creator-avatar"
          src="/info.svg" // Replace with actual image source if available
        />
        <div className="flex flex-col" style={statsStyle}>
          <span className="text-black font-semibold text-sm">
            {jouyeMedison}
          </span>
          <span
            className="text-gray-500 font-medium text-xs"
            style={huntsCreatedStyle}
          >
            {huntsCreated}
          </span>
        </div>
      </div>

      {/* Three Dots Icon */}
      <div className="ml-auto">
        <img
          className="h-5 w-5"
          alt="options"
          src="/points.svg" // Replace with actual three dots icon
        />
      </div>
    </div>
  );
};

CreatorRow.propTypes = {
  className: PropTypes.string,
  jouyeMedison: PropTypes.string,
  huntsCreated: PropTypes.string,

  /** Style props */
  propWidth: PropTypes.any,
  propDisplay: PropTypes.any,
  propMinWidth: PropTypes.any,
};

export default CreatorRow;
