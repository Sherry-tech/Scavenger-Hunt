import CreatorRow from "./CreatorRow";
import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[0.375rem] text-left text-[0.75rem] text-darkslategray-300 font-poppins ${className}`}
    >
      <CreatorRow
        jouyeMedison="Jouye Medison"
        huntsCreated="20 Hunts created"
      />
      <div className="self-stretch h-[4rem] relative">
        <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[10px_24px_54px_rgba(15,_13,_35,_0.04)] rounded-3xs bg-default-theme-white" />
        <div className="absolute top-[0.5rem] left-[0.625rem] w-[18.581rem] flex flex-row items-center justify-between gap-[1.25rem]">
          <div className="flex flex-row items-center justify-start gap-[0.5rem]">
            <img
              className="h-[3rem] w-[3.019rem] relative"
              alt=""
              src="/info.svg"
            />
            <div className="w-[6.731rem] flex flex-col items-start justify-start">
              <div className="self-stretch h-[1.25rem] relative">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%]">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%]">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%]">
                      <div className="absolute w-full top-[0%] left-[0%] leading-[1.25rem] font-medium inline-block h-full">
                        Lucas Abraham
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <input
                className="w-[calc(100%_-_0px)] [border:none] [outline:none] font-medium font-poppins text-[0.75rem] bg-[transparent] relative leading-[1.25rem] text-black text-left inline-block min-w-[4.063rem] p-0"
                placeholder="10 Hunts created"
                type="text"
              />
            </div>
          </div>
          <img
            className="h-[0.875rem] w-[0.206rem] relative"
            alt=""
            src="/points.svg"
          />
        </div>
      </div>
      <CreatorRow
        propWidth="unset"
        jouyeMedison="Yossy Angela"
        huntsCreated="18 Hunts created"
        propDisplay="inline-block"
        propMinWidth="6.731rem"
      />
      <CreatorRow
        propWidth="unset"
        jouyeMedison="Jouye Medison"
        huntsCreated="50 Hunts created"
        propDisplay="inline-block"
        propMinWidth="6.731rem"
      />
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
