import { useMemo } from "react";
import PropTypes from "prop-types";

const FrameComponent = ({
  className = "",
  propAlignSelf,
  propPosition,
  propTop,
  propLeft,
  propWidth,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      position: propPosition,
      top: propTop,
      left: propLeft,
      width: propWidth,
    };
  }, [propAlignSelf, propPosition, propTop, propLeft, propWidth]);

  return (
    <div
      className={`self-stretch rounded bg-gainsboro-200 flex flex-row items-start justify-between py-[1.062rem] pl-[1rem] pr-[1.562rem] box-border max-w-full gap-[1.25rem] text-center text-[1.5rem] text-black font-poppins mq450:flex-wrap ${className}`}
      style={frameDivStyle}
    >
      <div className="h-[4.75rem] w-[70.063rem] relative rounded bg-gainsboro-200 hidden max-w-full" />
      <div className="flex flex-col items-start justify-start pt-[0.187rem] px-[0rem] pb-[0rem]">
        <a className="[text-decoration:none] self-stretch relative font-bold text-[inherit] inline-block min-w-[4.688rem] z-[1] mq450:text-[1.188rem]" />
      </div>
      <div className="flex flex-row items-start justify-start gap-[0.5rem] text-left text-[1rem]">
        <div className="flex flex-col items-start justify-start pt-[0.562rem] pb-[0rem] pl-[0rem] pr-[0.625rem]">
          <img
            className="w-[1.5rem] h-[1.5rem] relative object-cover z-[1]"
            loading="lazy"
            alt=""
            src="/image-2@2x.png"
          />
        </div>
        <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[0.625rem]">
          <div className="w-[0.125rem] h-[2.625rem] relative rounded bg-darkgray-100 z-[1]" />
        </div>
        <div className="h-[2.5rem] w-[2.5rem] relative rounded-[50%] bg-darkgray-200 z-[1]" />
        <div className="flex-1 flex flex-col items-start justify-start">
          <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[5.875rem] z-[1]" />
          <a className="[text-decoration:none] self-stretch relative text-[0.75rem] text-dimgray-300 z-[1]" />
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,

  /** Style props */
  propAlignSelf: PropTypes.any,
  propPosition: PropTypes.any,
  propTop: PropTypes.any,
  propLeft: PropTypes.any,
  propWidth: PropTypes.any,
};

export default FrameComponent;
