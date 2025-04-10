import { useCallback } from "react";
import PropTypes from "prop-types";

const GroupComponent1 = ({ className = "" }) => {
  const onGroupContainerClick = useCallback(() => {
    // Please sync "Edit Hunt" to the project
  }, []);

  const onGroupContainerClick1 = useCallback(() => {
    // Please sync "Delete Hunt" to the project
  }, []);

  return (
    <section
      className={`absolute top-[8.938rem] left-[19.375rem] w-[67.75rem] h-[11.563rem] text-left text-[0.875rem] text-black font-poppins ${className}`}
    >
      <div className="absolute top-[0rem] left-[0rem] rounded-6xs bg-default-theme-white w-full h-full" />
      <div className="absolute top-[1.313rem] left-[2.625rem] w-[63.813rem] h-[2.688rem]">
        <h3 className="m-0 absolute top-[0.313rem] left-[0rem] text-[1.375rem] font-semibold font-[inherit] whitespace-pre-wrap mq450:text-[1.125rem]">
          HunBurr's Hill - Royal Pokanoket Burial Sites
        </h3>
        <div
          className="absolute top-[0rem] left-[55.25rem] w-[8.563rem] h-[2.688rem] cursor-pointer text-center text-default-theme-white"
          onClick={onGroupContainerClick}
        >
          <div className="absolute top-[0rem] left-[0rem] rounded bg-black w-full h-full flex flex-row items-center justify-center py-[0.625rem] px-[1.875rem] box-border">
            <div className="w-[2.813rem] relative leading-[1.25rem] inline-block shrink-0">
              Edit
            </div>
          </div>
        </div>
        <div
          className="absolute top-[0rem] left-[45.938rem] w-[8.563rem] h-[2.688rem] cursor-pointer"
          onClick={onGroupContainerClick1}
        >
          <div className="absolute top-[0rem] left-[0rem] rounded border-black border-[1px] border-solid box-border w-full h-full flex flex-row items-center justify-center py-[0.625rem] px-[1.875rem]">
            <div className="relative leading-[1.25rem]">Delete</div>
          </div>
        </div>
      </div>
      <div className="absolute top-[5.313rem] left-[0rem] w-full h-[5.813rem] text-gray-200">
        <div className="absolute top-[0rem] left-[0rem] bg-gainsboro-300 w-[67.75rem] h-[2.813rem]" />
        <div className="absolute top-[0.75rem] left-[1.375rem] w-[61.5rem] h-[5.063rem]">
          <div className="absolute top-[0rem] left-[22.063rem] w-[3.813rem] h-[4.438rem] text-darkslategray-200">
            <div className="absolute top-[3.125rem] left-[0rem] capitalize inline-block w-[3.688rem] min-w-[3.688rem]">
              Newport
            </div>
            <div className="absolute top-[0rem] left-[0rem] font-semibold text-gray-200 inline-block min-w-[3.813rem]">
              Location
            </div>
          </div>
          <div className="absolute top-[0rem] left-[59rem] w-[2.5rem] h-[4.438rem] text-darkslategray-200">
            <div className="absolute top-[3.125rem] left-[0rem] capitalize inline-block min-w-[2rem]">
              Easy
            </div>
            <div className="absolute top-[0rem] left-[0rem] font-semibold text-gray-200 inline-block min-w-[2.5rem]">
              Mode
            </div>
          </div>
          <div className="absolute top-[0rem] left-[34rem] w-[6rem] h-[4.438rem]">
            <div className="absolute top-[0rem] left-[0rem] font-semibold inline-block min-w-[6rem]">
              Date Created
            </div>
            <div className="absolute top-[3.125rem] left-[0rem] capitalize text-darkslategray-200 inline-block min-w-[5.625rem]">
              Aug 05, 2024
            </div>
          </div>
          <div className="absolute top-[0rem] left-[48.125rem] w-[2.75rem] h-[4.438rem]">
            <div className="absolute top-[0rem] left-[0rem] font-semibold inline-block min-w-[2.75rem]">
              Points
            </div>
            <div className="absolute top-[3.125rem] left-[0rem] capitalize text-darkslategray-200 inline-block min-w-[1.688rem]">
              500
            </div>
          </div>
          <div className="absolute h-full top-[0rem] bottom-[0rem] left-[0rem] w-[13.938rem]">
            <div className="absolute top-[0rem] left-[0rem] font-semibold inline-block w-[13.938rem]">
              Hunt Name
            </div>
            <div className="absolute top-[2.5rem] left-[0rem] flex flex-row items-center justify-start gap-[0.75rem] text-darkslategray-200">
              <div className="h-[2.563rem] w-[2.563rem] relative rounded-[50%] bg-darkgray-400" />
              <div className="relative capitalize">
                Burr's Hill - Royal Pokan...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

GroupComponent1.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent1;
