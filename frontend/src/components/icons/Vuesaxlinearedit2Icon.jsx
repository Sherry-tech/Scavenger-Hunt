import { useMemo } from "react";
import PropTypes from "prop-types";

const Vuesaxlinearedit2Icon = ({ className = "", propTop }) => {
  const vuesaxlinearedit2IconStyle = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <img
      className={`absolute top-[44.313rem] left-[81.625rem] w-[1.125rem] h-[1.125rem] z-[1] ${className}`}
      alt=""
      src="/vuesaxlinearedit2.svg"
      style={vuesaxlinearedit2IconStyle}
    />
  );
};

Vuesaxlinearedit2Icon.propTypes = {
  className: PropTypes.string,

  /** Style props */
  propTop: PropTypes.any,
};

export default Vuesaxlinearedit2Icon;
