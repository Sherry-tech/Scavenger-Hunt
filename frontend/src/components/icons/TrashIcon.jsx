import { useMemo } from "react";
import PropTypes from "prop-types";

const TrashIcon = ({
  className = "",
  trash,
  propPosition,
  propTop,
  propLeft,
}) => {
  const trashIconStyle = useMemo(() => {
    return {
      position: propPosition,
      top: propTop,
      left: propLeft,
    };
  }, [propPosition, propTop, propLeft]);

  return (
    <img
      className={`h-[1.125rem] w-[1.125rem] relative overflow-hidden shrink-0 z-[1] ${className}`}
      alt=""
      src={trash}
      style={trashIconStyle}
    />
  );
};

TrashIcon.propTypes = {
  className: PropTypes.string,
  trash: PropTypes.string,

  /** Style props */
  propPosition: PropTypes.any,
  propTop: PropTypes.any,
  propLeft: PropTypes.any,
};

export default TrashIcon;
