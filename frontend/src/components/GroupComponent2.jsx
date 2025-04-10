import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import PropTypes from "prop-types";

const GroupComponent2 = ({ className = "" }) => {
  return (
    <div
      className={`absolute top-[0rem] left-[0rem] bg-gainsboro-100 w-[16.875rem] flex flex-col items-start justify-start pt-[1.937rem] px-[1.625rem] pb-[17.75rem] box-border gap-[5.375rem] text-left text-[2.625rem] text-black font-poppins ${className}`}
    >
      <div className="w-[16.875rem] h-[61.5rem] relative bg-gainsboro-100 hidden" />
      <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[7.5rem] z-[1] mq450:text-[1.563rem] mq750:text-[2.125rem]" />
      <nav className="m-0 self-stretch flex flex-col items-start justify-start gap-[0.875rem] z-[1] text-center text-[0.875rem] text-black font-poppins">
        <div className="self-stretch rounded flex flex-row items-start justify-start py-[0.75rem] px-[1rem]">
          <div className="flex-1 flex flex-row items-start justify-start gap-[0.5rem]">
            <div className="h-[1.313rem] w-[1.313rem] relative rounded-[50%] bg-dimgray-200" />
            <div className="relative font-medium">Dashboard</div>
          </div>
        </div>
        <TextField
          className="[border:none] bg-[transparent] self-stretch font-poppins font-medium text-[1rem] text-default-theme-white"
          placeholder="Hunt"
          variant="outlined"
          sx={{
            "& fieldset": { border: "none" },
            "& .MuiInputBase-root": { height: "48px", backgroundColor: "#000" },
            "& .MuiInputBase-input": { color: "#fff" },
          }}
        />
        <div className="self-stretch rounded flex flex-row items-start justify-start py-[0.75rem] px-[1rem]">
          <div className="flex-1 flex flex-row items-start justify-start gap-[0.5rem]">
            <div className="flex flex-col items-start justify-start pt-[0.093rem] px-[0rem] pb-[0rem]">
              <div className="w-[1.125rem] h-[1.125rem] relative rounded-[50%] bg-dimgray-200" />
            </div>
            <div className="relative font-medium">Submission</div>
          </div>
        </div>
        <div className="self-stretch rounded flex flex-row items-start justify-start py-[0.75rem] px-[1rem]">
          <div className="flex-1 flex flex-row items-start justify-start gap-[0.5rem]">
            <div className="flex flex-col items-start justify-start pt-[0.093rem] px-[0rem] pb-[0rem]">
              <div className="w-[1.125rem] h-[1.125rem] relative rounded-[50%] bg-dimgray-200" />
            </div>
            <div className="relative font-medium inline-block min-w-[4.875rem]">
              Experience
            </div>
          </div>
        </div>
        <div className="self-stretch rounded flex flex-row items-start justify-start py-[0.75rem] px-[1rem]">
          <div className="flex-1 flex flex-row items-start justify-start gap-[0.5rem]">
            <div className="flex flex-col items-start justify-start pt-[0.093rem] px-[0rem] pb-[0rem]">
              <div className="w-[1.125rem] h-[1.125rem] relative rounded-[50%] bg-dimgray-200" />
            </div>
            <div className="relative font-medium">Location</div>
          </div>
        </div>
        <div className="self-stretch rounded flex flex-row items-start justify-start py-[0.75rem] px-[1rem]">
          <div className="flex-1 flex flex-row items-start justify-start gap-[0.5rem]">
            <div className="flex flex-col items-start justify-start pt-[0.093rem] px-[0rem] pb-[0rem]">
              <div className="w-[1.125rem] h-[1.125rem] relative rounded-[50%] bg-dimgray-200" />
            </div>
            <div className="relative font-medium">Clues</div>
          </div>
        </div>
        <div className="self-stretch rounded flex flex-row items-start justify-start py-[0.75rem] px-[1rem]">
          <div className="flex-1 flex flex-row items-start justify-start gap-[0.5rem]">
            <div className="flex flex-col items-start justify-start pt-[0.093rem] px-[0rem] pb-[0rem]">
              <div className="w-[1.125rem] h-[1.125rem] relative rounded-[50%] bg-dimgray-200" />
            </div>
            <div className="relative font-medium inline-block min-w-[4.438rem]">
              Feedback
            </div>
          </div>
        </div>
        <div className="self-stretch rounded flex flex-row items-start justify-start py-[0.75rem] px-[1rem]">
          <div className="flex-1 flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[2.5rem] gap-[0.5rem]">
            <div className="flex flex-col items-start justify-start pt-[0.093rem] px-[0rem] pb-[0rem]">
              <div className="w-[1.125rem] h-[1.125rem] relative rounded-[50%] bg-dimgray-200" />
            </div>
            <div className="flex-1 relative font-medium">Mass Messaging</div>
          </div>
        </div>
        <div className="self-stretch rounded flex flex-row items-start justify-start py-[0.75rem] px-[1rem]">
          <div className="flex-1 flex flex-row items-start justify-start gap-[0.5rem]">
            <div className="flex flex-col items-start justify-start pt-[0.093rem] px-[0rem] pb-[0rem]">
              <div className="w-[1.125rem] h-[1.125rem] relative rounded-[50%] bg-dimgray-200" />
            </div>
            <div className="flex-1 relative font-medium">
              Account Management
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

GroupComponent2.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent2;
