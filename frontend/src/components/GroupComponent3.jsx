import { useState, useCallback } from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
  TextField,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const GroupComponent3 = ({ className = "" }) => {
  const [groupDateTimePickerValue, setGroupDateTimePickerValue] = useState(
    new Date("2024-08-08")
  );
  const navigate = useNavigate();

  const onGroupButtonClick = useCallback(() => {
    navigate("/hunts-list-view");
  }, [navigate]);

  const onGroupButtonClick1 = useCallback(() => {
    // Please sync "New Hunt" to the project
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div
        className={`absolute top-[8.5rem] left-[24.438rem] shadow-[0px_5px_100px_rgba(0,_0,_0,_0.1)] rounded-8xs bg-default-theme-white w-[41.125rem] flex flex-col items-start justify-start pt-[1.25rem] px-[0rem] pb-[1.812rem] box-border gap-[3.125rem] max-w-full z-[10] text-left text-[0.875rem] text-darkslategray-200 font-poppins ${className}`}
      >
        <div className="relative font-semibold text-gray-200 hidden min-w-[3.813rem]">
          Location
        </div>
        <div className="relative font-semibold text-gray-200 hidden min-w-[6rem]">
          Date Created
        </div>
        <div className="relative font-semibold text-gray-200 hidden min-w-[2.75rem]">
          Points
        </div>
        <div className="relative capitalize hidden min-w-[3.688rem]">
          Newport
        </div>
        <div className="relative capitalize hidden min-w-[5.625rem]">
          Aug 05, 2024
        </div>
        <div className="relative capitalize hidden min-w-[1.688rem]">400</div>
        <div className="relative capitalize hidden">Kent</div>
        <div className="relative capitalize hidden min-w-[5.881rem]">
          Aug 02, 2024
        </div>
        <div className="relative capitalize hidden min-w-[1.625rem]">300</div>
        <div className="relative capitalize hidden">Jul 18, 2024</div>
        <div className="relative capitalize hidden min-w-[1.438rem]">100</div>
        <div className="relative capitalize hidden">Kent</div>
        <div className="relative capitalize hidden">Jul 07, 2024</div>
        <div className="relative capitalize hidden min-w-[1.688rem]">600</div>
        <div className="relative capitalize hidden min-w-[3.688rem]">
          Newport
        </div>
        <div className="relative capitalize hidden min-w-[5.438rem]">
          Jun 28, 2024
        </div>
        <div className="relative capitalize hidden min-w-[1.625rem]">200</div>
        <div className="relative capitalize hidden">Kent</div>
        <div className="relative capitalize hidden min-w-[5.375rem]">
          Jun 22, 2024
        </div>
        <div className="relative capitalize hidden min-w-[1.688rem]">500</div>
        <div className="relative capitalize hidden min-w-[3.688rem]">
          Newport
        </div>
        <div className="relative capitalize hidden min-w-[5.438rem]">
          Jun 28, 2024
        </div>
        <div className="relative capitalize hidden min-w-[1.688rem]">900</div>
        <div className="relative capitalize hidden min-w-[3.688rem]">
          Newport
        </div>
        <div className="relative capitalize hidden min-w-[5.188rem]">
          Jun 15, 2024
        </div>
        <div className="relative capitalize hidden min-w-[1.625rem]">200</div>
        <div className="relative capitalize hidden">Kent</div>
        <div className="relative capitalize hidden min-w-[5.438rem]">
          Jun 08, 2024
        </div>
        <div className="relative capitalize hidden min-w-[1.688rem]">500</div>
        <div className="relative capitalize hidden min-w-[3.688rem]">
          Newport
        </div>
        <div className="relative capitalize hidden min-w-[5.881rem]">
          Jun 03, 2023
        </div>
        <div className="relative capitalize hidden min-w-[1.688rem]">900</div>
        <div className="w-[10.438rem] rounded-md border-dimgray-400 border-[1px] border-solid box-border overflow-hidden hidden flex-row items-center justify-between py-[0.562rem] px-[0.75rem] whitespace-nowrap gap-[0.821rem] text-darkslategray-700">
          <div className="relative capitalize">Filter by Location</div>
          <img
            className="h-[0.5rem] w-[0.744rem] relative rounded-12xs object-contain"
            alt=""
            src="/polygon-2.svg"
          />
        </div>
        <div className="w-[7.063rem] rounded-md border-dimgray-400 border-[1px] border-solid box-border overflow-hidden hidden flex-row items-center justify-between py-[0.562rem] px-[0.75rem] whitespace-nowrap gap-[1.25rem] text-darkslategray-700">
          <div className="relative capitalize">Sort By</div>
          <img
            className="h-[0.5rem] w-[0.744rem] relative rounded-12xs object-contain"
            alt=""
            src="/polygon-2.svg"
          />
        </div>
        <div className="w-[0.063rem] h-[2.2rem] relative border-dimgray-400 border-r-[1px] border-solid box-border hidden" />
        <img
          className="self-stretch h-[44.438rem] relative rounded-8xs max-w-full overflow-hidden shrink-0 hidden"
          alt=""
          src="/rectangle-28.svg"
        />
        <div className="self-stretch flex flex-col items-start justify-start gap-[1.231rem] max-w-full text-[0.75rem] text-black">
          <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.5rem] pr-[1.75rem] box-border max-w-full text-[1.375rem]">
            <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[1.25rem]">
              <h3 className="m-0 relative text-inherit font-semibold font-[inherit] z-[1] mq450:text-[1.125rem]">
                Create New Hunt
              </h3>
              <div className="flex flex-col items-start justify-start pt-[0.312rem] px-[0rem] pb-[0rem]">
                <img
                  className="w-[1.5rem] h-[1.5rem] relative z-[1]"
                  loading="lazy"
                  alt=""
                  src="/vuesaxlinearclosecircle.svg"
                />
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.937rem] max-w-full">
            <div className="self-stretch h-[0.063rem] relative border-darkslategray-500 border-t-[1px] border-solid box-border z-[1]" />
            <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[1.5rem] box-border max-w-full">
              <div className="flex-1 rounded-lg bg-gainsboro-300 border-darkslategray-600 border-[1px] border-dashed box-border flex flex-col items-start justify-start py-[3.937rem] pl-[16.375rem] pr-[16.187rem] gap-[0.375rem] max-w-full z-[1]">
                <div className="w-[38.125rem] h-[12.75rem] relative rounded-lg bg-gainsboro-300 border-darkslategray-600 border-[1px] border-dashed box-border hidden max-w-full" />
                <div className="flex flex-row items-start justify-start py-[0rem] px-[1.125rem]">
                  <img
                    className="h-[3.125rem] w-[3.125rem] relative overflow-hidden shrink-0 z-[1]"
                    loading="lazy"
                    alt=""
                    src="/upload.svg"
                  />
                </div>
                <div className="relative inline-block min-w-[5.438rem] z-[1]">
                  Upload Image
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[3.938rem] flex flex-row items-start justify-start py-[0rem] px-[1.5rem] box-border max-w-full">
            <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[0.125rem] max-w-full">
              <div className="relative z-[1]">Hunt Name</div>
              <div className="self-stretch flex-1 rounded border-darkgray-500 border-[1px] border-solid box-border flex flex-row items-start justify-start py-[0.562rem] px-[0.812rem] max-w-full z-[1]">
                <input
                  className="w-[11.188rem] [border:none] [outline:none] font-poppins text-[0.875rem] bg-[transparent] relative text-darkslategray-400 text-left inline-block p-0"
                  placeholder="Solve a puzzle at lakeside"
                  type="text"
                />
                <div className="h-[2.688rem] w-[38.125rem] relative rounded border-darkgray-500 border-[1px] border-solid box-border hidden max-w-full" />
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[1.5rem] box-border max-w-full">
            <div className="flex-1 flex flex-col items-start justify-start gap-[0.25rem] max-w-full">
              <div className="self-stretch flex flex-row items-start justify-start flex-wrap content-start gap-[1.25rem]">
                <div className="flex-1 flex flex-col items-start justify-start gap-[1.375rem] min-w-[12rem]">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[0.312rem]">
                    <div className="relative z-[1]">Location</div>
                    <FormControl
                      className="self-stretch h-[2.688rem] font-poppins text-[0.875rem] text-darkslategray-400 z-[2]"
                      variant="standard"
                      sx={{
                        borderColor: "#959595",
                        borderStyle: "SOLID",
                        borderTopWidth: "1px",
                        borderRightWidth: "1px",
                        borderBottomWidth: "1px",
                        borderLeftWidth: "1px",
                        borderRadius: "4px",
                        width: "100%",
                        height: "43px",
                        m: 0,
                        p: 0,
                        "& .MuiInputBase-root": {
                          m: 0,
                          p: 0,
                          minHeight: "43px",
                          justifyContent: "center",
                          display: "inline-flex",
                        },
                        "& .MuiInputLabel-root": {
                          m: 0,
                          p: 0,
                          minHeight: "43px",
                          display: "inline-flex",
                        },
                        "& .MuiMenuItem-root": {
                          m: 0,
                          p: 0,
                          height: "43px",
                          display: "inline-flex",
                        },
                        "& .MuiSelect-select": {
                          m: 0,
                          p: 0,
                          height: "43px",
                          alignItems: "center",
                          display: "inline-flex",
                        },
                        "& .MuiInput-input": { m: 0, p: 0 },
                        "& .MuiInputBase-input": {
                          color: "#302f2f",
                          fontSize: 14,
                          fontWeight: "Regular",
                          fontFamily: "Poppins",
                          textAlign: "left",
                          p: "0 !important",
                          marginLeft: "13px",
                        },
                      }}
                    >
                      <InputLabel color="primary" />
                      <Select
                        color="primary"
                        disableUnderline
                        displayEmpty
                        IconComponent={() => (
                          <img
                            width="20px"
                            height="20px"
                            src="/chevrondown.svg"
                            style={{ marginRight: "10px" }}
                          />
                        )}
                      >
                        <MenuItem>Bristol</MenuItem>
                      </Select>
                      <FormHelperText />
                    </FormControl>
                  </div>
                  <div className="w-[15.25rem] flex flex-row items-start justify-between gap-[1.25rem]">
                    <div className="relative z-[1]">Points</div>
                    <div className="relative z-[1]">Mode</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-[1.375rem] min-w-[12rem]">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[0.312rem]">
                    <div className="relative inline-block min-w-[1.563rem] z-[1]">
                      City
                    </div>
                    <FormControl
                      className="self-stretch h-[2.688rem] font-poppins text-[0.875rem] text-darkslategray-400 z-[2]"
                      variant="standard"
                      sx={{
                        borderColor: "#959595",
                        borderStyle: "SOLID",
                        borderTopWidth: "1px",
                        borderRightWidth: "1px",
                        borderBottomWidth: "1px",
                        borderLeftWidth: "1px",
                        borderRadius: "4px",
                        width: "100%",
                        height: "43px",
                        m: 0,
                        p: 0,
                        "& .MuiInputBase-root": {
                          m: 0,
                          p: 0,
                          minHeight: "43px",
                          justifyContent: "center",
                          display: "inline-flex",
                        },
                        "& .MuiInputLabel-root": {
                          m: 0,
                          p: 0,
                          minHeight: "43px",
                          display: "inline-flex",
                        },
                        "& .MuiMenuItem-root": {
                          m: 0,
                          p: 0,
                          height: "43px",
                          display: "inline-flex",
                        },
                        "& .MuiSelect-select": {
                          m: 0,
                          p: 0,
                          height: "43px",
                          alignItems: "center",
                          display: "inline-flex",
                        },
                        "& .MuiInput-input": { m: 0, p: 0 },
                        "& .MuiInputBase-input": {
                          color: "#302f2f",
                          fontSize: 14,
                          fontWeight: "Regular",
                          fontFamily: "Poppins",
                          textAlign: "left",
                          p: "0 !important",
                          marginLeft: "15px",
                        },
                      }}
                    >
                      <InputLabel color="primary" />
                      <Select
                        color="primary"
                        disableUnderline
                        displayEmpty
                        IconComponent={() => (
                          <img
                            width="20px"
                            height="20px"
                            src="/chevrondown-1.svg"
                            style={{ marginRight: "10px" }}
                          />
                        )}
                      >
                        <MenuItem>Providence</MenuItem>
                      </Select>
                      <FormHelperText />
                    </FormControl>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[6.562rem] pr-[6.75rem]">
                    <div className="relative z-[1]">Date Created</div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[1.312rem] max-w-full text-[0.875rem] text-dimgray-100">
                <div className="self-stretch flex flex-row items-start justify-start gap-[1.25rem] mq675:flex-wrap">
                  <TextField
                    className="[border:none] bg-[transparent] flex-1 font-poppins text-[0.875rem] text-darkslategray-400 min-w-[7.688rem] z-[1]"
                    placeholder="500"
                    variant="outlined"
                    sx={{
                      "& fieldset": { borderColor: "#959595" },
                      "& .MuiInputBase-root": {
                        height: "40px",
                        fontSize: "14px",
                      },
                      "& .MuiInputBase-input": { color: "#302f2f" },
                    }}
                  />
                  <FormControl
                    className="h-[2.5rem] w-[11.875rem] font-poppins text-[0.875rem] text-darkslategray-400 z-[1]"
                    variant="standard"
                    sx={{
                      borderColor: "#959595",
                      borderStyle: "SOLID",
                      borderTopWidth: "1px",
                      borderRightWidth: "1px",
                      borderBottomWidth: "1px",
                      borderLeftWidth: "1px",
                      borderRadius: "4px",
                      width: "31.147540983606557%",
                      height: "40px",
                      m: 0,
                      p: 0,
                      "& .MuiInputBase-root": {
                        m: 0,
                        p: 0,
                        minHeight: "40px",
                        justifyContent: "center",
                        display: "inline-flex",
                      },
                      "& .MuiInputLabel-root": {
                        m: 0,
                        p: 0,
                        minHeight: "40px",
                        display: "inline-flex",
                      },
                      "& .MuiMenuItem-root": {
                        m: 0,
                        p: 0,
                        height: "40px",
                        display: "inline-flex",
                      },
                      "& .MuiSelect-select": {
                        m: 0,
                        p: 0,
                        height: "40px",
                        alignItems: "center",
                        display: "inline-flex",
                      },
                      "& .MuiInput-input": { m: 0, p: 0 },
                      "& .MuiInputBase-input": {
                        color: "#302f2f",
                        fontSize: 14,
                        fontWeight: "Regular",
                        fontFamily: "Poppins",
                        textAlign: "left",
                        p: "0 !important",
                        marginLeft: "13px",
                      },
                    }}
                  >
                    <InputLabel color="primary" />
                    <Select
                      color="primary"
                      disableUnderline
                      displayEmpty
                      IconComponent={() => (
                        <img
                          width="20px"
                          height="20px"
                          src="/chevrondown-2.svg"
                          style={{ marginRight: "10px" }}
                        />
                      )}
                    >
                      <MenuItem>Difficult</MenuItem>
                    </Select>
                    <FormHelperText />
                  </FormControl>
                  <div className="w-[11.875rem] z-[1]">
                    <DatePicker
                      value={groupDateTimePickerValue}
                      onChange={(newValue) => {
                        setGroupDateTimePickerValue(newValue);
                      }}
                      sx={{
                        fieldset: {
                          borderColor: "#959595",
                          borderTopWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 1,
                          borderLeftWidth: 1,
                        },
                        "&:hover": {
                          fieldset: { borderColor: "#959595" },
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "#959595",
                          },
                        },
                        "& input::placeholder": {
                          textColor: "#302f2f",
                          fontSize: 14,
                        },
                        input: {
                          color: "#302f2f",
                          fontSize: 14,
                          textAlign: "left",
                          fontWeight: "400",
                        },
                        "& .MuiInputBase-root": {
                          height: 40,
                          gap: "8px",
                          flexDirection: { flexDirection: "row" },
                        },
                      }}
                      slotProps={{
                        textField: {
                          size: "medium",
                          fullWidth: true,
                          required: false,
                          autoFocus: false,
                          error: false,
                        },
                        openPickerIcon: {
                          component: () => (
                            <img
                              width="20px"
                              height="20px"
                              src="/calendar.svg"
                            />
                          ),
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="w-[26rem] flex flex-row items-start justify-between gap-[1.25rem] max-w-full mq450:flex-wrap">
                  <div className="flex flex-row items-start justify-start gap-[0.5rem]">
                    <div className="flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem]">
                      <input
                        className="m-0 w-[1rem] h-[1rem] relative z-[1]"
                        type="checkbox"
                      />
                    </div>
                    <div className="relative tracking-[0.1px] z-[1]">
                      Play Hunt Individually
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start gap-[0.5rem]">
                    <div className="flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem]">
                      <input
                        className="m-0 w-[1rem] h-[1rem] relative z-[1]"
                        type="checkbox"
                      />
                    </div>
                    <div className="relative tracking-[0.1px] z-[1]">
                      Play Hunt with Team
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[1.5rem] box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-start gap-[1.25rem] max-w-full mq675:flex-wrap">
            <Button
              className="h-[2.875rem] flex-1 min-w-[12rem] cursor-pointer z-[1] mq675:flex-1"
              disableElevation
              variant="contained"
              sx={{
                textTransform: "none",
                color: "rgba(51, 51, 51, 0.7)",
                fontSize: "14",
                background: "rgba(153, 153, 153, 0.4)",
                borderRadius: "4px",
                "&:hover": { background: "rgba(153, 153, 153, 0.4)" },
                height: 46,
              }}
              onClick={onGroupButtonClick}
            >
              Cancel
            </Button>
            <Button
              className="h-[2.875rem] flex-1 min-w-[12rem] cursor-pointer z-[1] mq675:flex-1"
              disableElevation
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "14",
                background: "#000",
                borderRadius: "4px",
                "&:hover": { background: "#000" },
                height: 46,
              }}
              onClick={onGroupButtonClick1}
            >
              Create New Hunt
            </Button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

GroupComponent3.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent3;
