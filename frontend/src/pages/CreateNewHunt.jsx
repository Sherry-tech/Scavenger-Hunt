import { useCallback } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import FrameComponent from "../components/FrameComponent";
import TrashIcon from "../components/icons/TrashIcon";
import Vuesaxlinearedit2Icon from "../components/icons/Vuesaxlinearedit2Icon";
import GroupComponent2 from "../components/GroupComponent2";
import GroupComponent3 from "../components/GroupComponent3";

const CreateNewHunt = () => {
  const onEyeIconClick = useCallback(() => {
    // Please sync "View Hunt" to the project
  }, []);

  return (
    <div className="w-full h-[61.5rem] relative bg-default-theme-white overflow-hidden leading-[normal] tracking-[normal] text-left text-[0.875rem] text-darkslategray-200 font-poppins mq450:h-auto mq450:min-h-[984]">
      <img
        className="absolute top-[7.625rem] left-[18.375rem] rounded w-[69.625rem] h-[52.25rem]"
        alt=""
        src="/rectangle-4568.svg"
      />
      <FrameComponent
        propAlignSelf="unset"
        propPosition="absolute"
        propTop="1.25rem"
        propLeft="18.375rem"
        propWidth="70.063rem"
      />
      <div className="absolute top-[13.938rem] left-[68.875rem] font-semibold text-gray-200 inline-block w-[2.563rem] h-[1.313rem] min-w-[2.563rem] z-[1]">
        Mode
      </div>
      <div className="absolute top-[13.938rem] left-[79.688rem] font-semibold text-gray-200 inline-block w-[3.438rem] h-[1.313rem] min-w-[3.438rem] z-[1]">
        Actions
      </div>
      <div className="absolute top-[16.25rem] left-[19.625rem] border-dimgray-500 border-t-[1px] border-solid box-border w-[67.188rem] h-[0.063rem] z-[1]" />
      <div className="absolute top-[13.938rem] left-[19.625rem] font-semibold text-gray-200 inline-block w-[5.125rem] h-[1.313rem] min-w-[5.125rem] z-[1]">
        Hunt Name
      </div>
      <div className="absolute top-[17.5rem] left-[68.875rem] capitalize inline-block w-[3.375rem] h-[1.313rem] min-w-[3.375rem] z-[1]">
        Difficult
      </div>
      <div className="absolute top-[20.063rem] left-[19.625rem] border-dimgray-500 border-t-[1px] border-solid box-border w-[67.188rem] h-[0.063rem] z-[1]" />
      <div className="absolute top-[16.875rem] left-[19.625rem] rounded-[50%] bg-darkgray-400 w-[2.563rem] h-[2.563rem] z-[1]" />
      <div className="absolute top-[17.5rem] left-[22.938rem] capitalize inline-block w-[10.688rem] h-[1.313rem] z-[1]">
        Burr's Hill - Royal Pokan...
      </div>
      <img
        className="absolute top-[17.625rem] left-[83.563rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/trash.svg"
      />
      <img
        className="absolute top-[17.625rem] left-[81.625rem] w-[1.125rem] h-[1.125rem] z-[1]"
        loading="lazy"
        alt=""
        src="/vuesaxlinearedit2.svg"
      />
      <img
        className="absolute top-[17.625rem] left-[79.688rem] w-[1.125rem] h-[1.125rem] overflow-hidden cursor-pointer z-[1]"
        loading="lazy"
        alt=""
        src="/eye.svg"
        onClick={onEyeIconClick}
      />
      <div className="absolute top-[23.875rem] left-[19.625rem] border-dimgray-500 border-t-[1px] border-solid box-border w-[67.188rem] h-[0.063rem] z-[1]" />
      <div className="absolute top-[21.313rem] left-[68.875rem] capitalize inline-block w-[2.188rem] h-[1.313rem] min-w-[2.188rem] z-[1]">
        Hard
      </div>
      <div className="absolute top-[20.688rem] left-[19.625rem] rounded-[50%] bg-darkgray-400 w-[2.563rem] h-[2.563rem] z-[1]" />
      <div className="absolute top-[21.313rem] left-[22.938rem] capitalize inline-block w-[10.688rem] h-[1.313rem] z-[1]">
        Burr's Hill - Royal Pokan...
      </div>
      <TrashIcon
        trash="/trash.svg"
        propPosition="absolute"
        propTop="21.438rem"
        propLeft="83.563rem"
      />
      <img
        className="absolute top-[21.438rem] left-[81.625rem] w-[1.125rem] h-[1.125rem] z-[1]"
        loading="lazy"
        alt=""
        src="/vuesaxlinearedit2.svg"
      />
      <img
        className="absolute top-[21.438rem] left-[79.688rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/eye.svg"
      />
      <div className="absolute top-[24.5rem] left-[19.625rem] rounded-[50%] bg-darkgray-400 w-[2.563rem] h-[2.563rem] z-[1]" />
      <div className="absolute top-[25.125rem] left-[22.938rem] capitalize inline-block w-[10.688rem] h-[1.313rem] z-[1]">
        Burr's Hill - Royal Pokan...
      </div>
      <div className="absolute top-[25.125rem] left-[68.888rem] capitalize inline-block w-[2.063rem] h-[1.313rem] min-w-[2.063rem] z-[1]">
        Easy
      </div>
      <div className="absolute top-[27.688rem] left-[19.625rem] border-dimgray-500 border-t-[1px] border-solid box-border w-[67.188rem] h-[0.063rem] z-[1]" />
      <TrashIcon
        trash="/trash-2.svg"
        propPosition="absolute"
        propTop="25.25rem"
        propLeft="83.563rem"
      />
      <img
        className="absolute top-[25.25rem] left-[81.638rem] w-[1.125rem] h-[1.125rem] z-[1]"
        loading="lazy"
        alt=""
        src="/vuesaxlinearedit2.svg"
      />
      <img
        className="absolute top-[25.25rem] left-[79.7rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/eye.svg"
      />
      <div className="absolute top-[28.938rem] left-[68.875rem] capitalize inline-block w-[2.188rem] h-[1.313rem] min-w-[2.188rem] z-[1]">
        Hard
      </div>
      <div className="absolute top-[31.5rem] left-[19.625rem] border-dimgray-500 border-t-[1px] border-solid box-border w-[67.188rem] h-[0.063rem] z-[1]" />
      <div className="absolute top-[28.313rem] left-[19.625rem] rounded-[50%] bg-darkgray-400 w-[2.563rem] h-[2.563rem] z-[1]" />
      <div className="absolute top-[28.938rem] left-[22.938rem] capitalize inline-block w-[10.688rem] h-[1.313rem] z-[1]">
        Burr's Hill - Royal Pokan...
      </div>
      <TrashIcon
        trash="/trash.svg"
        propPosition="absolute"
        propTop="29.063rem"
        propLeft="83.563rem"
      />
      <img
        className="absolute top-[29.063rem] left-[81.625rem] w-[1.125rem] h-[1.125rem] z-[1]"
        loading="lazy"
        alt=""
        src="/vuesaxlinearedit2.svg"
      />
      <img
        className="absolute top-[29.063rem] left-[79.688rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/eye.svg"
      />
      <div className="absolute top-[32.75rem] left-[68.875rem] capitalize inline-block w-[3.375rem] h-[1.313rem] min-w-[3.375rem] z-[1]">
        Difficult
      </div>
      <div className="absolute top-[35.313rem] left-[19.625rem] border-dimgray-500 border-t-[1px] border-solid box-border w-[67.188rem] h-[0.063rem] z-[1]" />
      <div className="absolute top-[32.125rem] left-[19.625rem] rounded-[50%] bg-darkgray-400 w-[2.563rem] h-[2.563rem] z-[1]" />
      <div className="absolute top-[32.75rem] left-[22.938rem] capitalize inline-block w-[10.688rem] h-[1.313rem] z-[1]">
        Burr's Hill - Royal Pokan...
      </div>
      <TrashIcon
        trash="/trash.svg"
        propPosition="absolute"
        propTop="32.875rem"
        propLeft="83.563rem"
      />
      <img
        className="absolute top-[32.875rem] left-[81.625rem] w-[1.125rem] h-[1.125rem] z-[1]"
        loading="lazy"
        alt=""
        src="/vuesaxlinearedit2.svg"
      />
      <img
        className="absolute top-[32.875rem] left-[79.688rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/eye.svg"
      />
      <div className="absolute top-[36.563rem] left-[68.875rem] capitalize inline-block w-[2.063rem] h-[1.313rem] min-w-[2.063rem] z-[1]">
        Easy
      </div>
      <div className="absolute top-[39.125rem] left-[19.625rem] border-dimgray-500 border-t-[1px] border-solid box-border w-[67.188rem] h-[0.063rem] z-[1]" />
      <div className="absolute top-[35.938rem] left-[19.625rem] rounded-[50%] bg-darkgray-400 w-[2.563rem] h-[2.563rem] z-[1]" />
      <div className="absolute top-[36.563rem] left-[22.938rem] capitalize inline-block w-[10.688rem] h-[1.313rem] z-[1]">
        Burr's Hill - Royal Pokan...
      </div>
      <TrashIcon
        trash="/trash.svg"
        propPosition="absolute"
        propTop="36.688rem"
        propLeft="83.563rem"
      />
      <img
        className="absolute top-[36.688rem] left-[81.625rem] w-[1.125rem] h-[1.125rem] z-[1]"
        loading="lazy"
        alt=""
        src="/vuesaxlinearedit2.svg"
      />
      <img
        className="absolute top-[36.688rem] left-[79.688rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/eye.svg"
      />
      <div className="absolute top-[40.375rem] left-[68.875rem] capitalize inline-block w-[2.188rem] h-[1.313rem] min-w-[2.188rem] z-[1]">
        Hard
      </div>
      <div className="absolute top-[42.938rem] left-[19.625rem] border-dimgray-500 border-t-[1px] border-solid box-border w-[67.188rem] h-[0.063rem] z-[1]" />
      <div className="absolute top-[39.75rem] left-[19.625rem] rounded-[50%] bg-darkgray-400 w-[2.563rem] h-[2.563rem] z-[1]" />
      <div className="absolute top-[40.375rem] left-[22.938rem] capitalize inline-block w-[10.688rem] h-[1.313rem] z-[1]">
        Burr's Hill - Royal Pokan...
      </div>
      <TrashIcon
        trash="/trash.svg"
        propPosition="absolute"
        propTop="40.5rem"
        propLeft="83.563rem"
      />
      <Vuesaxlinearedit2Icon propTop="40.5rem" />
      <img
        className="absolute top-[40.5rem] left-[79.688rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/eye.svg"
      />
      <div className="absolute top-[44.188rem] left-[68.875rem] capitalize inline-block w-[3.375rem] h-[1.313rem] min-w-[3.375rem] z-[1]">
        Difficult
      </div>
      <div className="absolute top-[46.75rem] left-[19.625rem] border-dimgray-500 border-t-[1px] border-solid box-border w-[67.188rem] h-[0.063rem] z-[1]" />
      <div className="absolute top-[43.563rem] left-[19.625rem] rounded-[50%] bg-darkgray-400 w-[2.563rem] h-[2.563rem] z-[1]" />
      <div className="absolute top-[44.188rem] left-[22.938rem] capitalize inline-block w-[10.688rem] h-[1.313rem] z-[1]">
        Burr's Hill - Royal Pokan...
      </div>
      <TrashIcon
        trash="/trash.svg"
        propPosition="absolute"
        propTop="44.313rem"
        propLeft="83.563rem"
      />
      <Vuesaxlinearedit2Icon />
      <img
        className="absolute top-[44.313rem] left-[79.688rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/eye.svg"
      />
      <div className="absolute top-[48rem] left-[68.875rem] capitalize inline-block w-[2.063rem] h-[1.313rem] min-w-[2.063rem] z-[1]">
        Easy
      </div>
      <div className="absolute top-[50.563rem] left-[19.625rem] border-dimgray-500 border-t-[1px] border-solid box-border w-[67.188rem] h-[0.063rem] z-[1]" />
      <div className="absolute top-[47.375rem] left-[19.625rem] rounded-[50%] bg-darkgray-400 w-[2.563rem] h-[2.563rem] z-[1]" />
      <div className="absolute top-[48rem] left-[22.938rem] capitalize inline-block w-[10.688rem] h-[1.313rem] z-[1]">
        Burr's Hill - Royal Pokan...
      </div>
      <img
        className="absolute top-[48.125rem] left-[83.563rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/trash.svg"
      />
      <img
        className="absolute top-[48.125rem] left-[81.625rem] w-[1.125rem] h-[1.125rem] z-[1]"
        loading="lazy"
        alt=""
        src="/vuesaxlinearedit2.svg"
      />
      <img
        className="absolute top-[48.125rem] left-[79.688rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/eye.svg"
      />
      <div className="absolute top-[51.813rem] left-[68.875rem] capitalize inline-block w-[2.188rem] h-[1.313rem] min-w-[2.188rem] z-[1]">
        Hard
      </div>
      <div className="absolute top-[54.375rem] left-[19.625rem] border-dimgray-500 border-t-[1px] border-solid box-border w-[67.188rem] h-[0.063rem] z-[1]" />
      <div className="absolute top-[51.188rem] left-[19.625rem] rounded-[50%] bg-darkgray-400 w-[2.563rem] h-[2.563rem] z-[1]" />
      <div className="absolute top-[51.813rem] left-[22.938rem] capitalize inline-block w-[10.688rem] h-[1.313rem] z-[1]">
        Burr's Hill - Royal Pokan...
      </div>
      <img
        className="absolute top-[51.938rem] left-[83.563rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/trash.svg"
      />
      <img
        className="absolute top-[51.938rem] left-[81.625rem] w-[1.125rem] h-[1.125rem] z-[1]"
        loading="lazy"
        alt=""
        src="/vuesaxlinearedit2.svg"
      />
      <img
        className="absolute top-[51.938rem] left-[79.688rem] w-[1.125rem] h-[1.125rem] overflow-hidden z-[1]"
        loading="lazy"
        alt=""
        src="/eye.svg"
      />
      <div className="absolute top-[25.063rem] left-[37.25rem] capitalize inline-block w-[3.688rem] h-[1.313rem] min-w-[3.688rem] z-[1]">
        Newport
      </div>
      <a className="[text-decoration:none] absolute top-[9.188rem] left-[19.625rem] text-[1.375rem] font-semibold text-black inline-block w-[6.25rem] h-[2.063rem] min-w-[6.25rem] z-[1] mq450:text-[1.125rem]" />
      <Button
        className="absolute top-[8.875rem] left-[75.563rem] z-[1]"
        disableElevation
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#fff",
          fontSize: "14",
          background: "#000",
          borderRadius: "4px",
          "&:hover": { background: "#000" },
          width: 179,
          height: 43,
        }}
      >
        Create New Hunt
      </Button>
      <TextField
        className="[border:none] bg-[transparent] absolute top-[8.875rem] left-[59.25rem] font-poppins text-[0.875rem] text-darkslategray-700 z-[1]"
        placeholder="Search By Name..."
        variant="outlined"
        InputProps={{
          endAdornment: (
            <img
              width="22px"
              height="22px"
              src="/vuesaxlinearsearchnormal.svg"
            />
          ),
        }}
        sx={{
          "& fieldset": { borderColor: "rgba(104, 104, 104, 0.3)" },
          "& .MuiInputBase-root": {
            height: "44px",
            paddingRight: "12px",
            borderRadius: "6px",
            fontSize: "14px",
          },
          "& .MuiInputBase-input": { color: "rgba(59, 59, 59, 0.7)" },
          width: "246px",
        }}
      />
      <GroupComponent2 />
      <div className="absolute top-[57.125rem] left-[19.875rem] text-[1rem] text-darkslategray-100 inline-block w-[7.75rem] h-[1.5rem] min-w-[7.75rem] z-[1]">
        Items per page
      </div>
      <FormControl
        className="absolute top-[57.063rem] left-[27.938rem] font-helvetica-neue text-[1rem] text-darkslategray-100 z-[1]"
        variant="standard"
        sx={{
          borderColor: "#9da5b1",
          borderStyle: "SOLID",
          borderTopWidth: "1px",
          borderRightWidth: "1px",
          borderBottomWidth: "1px",
          borderLeftWidth: "1px",
          backgroundColor: "#fff",
          borderRadius: "5px",
          width: "44px",
          height: "26px",
          m: 0,
          p: 0,
          "& .MuiInputBase-root": {
            m: 0,
            p: 0,
            minHeight: "26px",
            justifyContent: "center",
            display: "inline-flex",
          },
          "& .MuiInputLabel-root": {
            m: 0,
            p: 0,
            minHeight: "26px",
            display: "inline-flex",
          },
          "& .MuiMenuItem-root": {
            m: 0,
            p: 0,
            height: "26px",
            display: "inline-flex",
          },
          "& .MuiSelect-select": {
            m: 0,
            p: 0,
            height: "26px",
            alignItems: "center",
            display: "inline-flex",
          },
          "& .MuiInput-input": { m: 0, p: 0 },
          "& .MuiInputBase-input": {
            fontFamily: "Helvetica Neue",
            textAlign: "left",
            p: "0 !important",
            marginLeft: "9px",
          },
        }}
      >
        <InputLabel color="secondary" />
        <Select
          color="secondary"
          disableUnderline
          displayEmpty
          IconComponent={() => (
            <img
              width="9px"
              height="5px"
              src="/chevronexpand.svg"
              style={{ marginRight: "9px" }}
            />
          )}
        >
          <MenuItem>2</MenuItem>
        </Select>
        <FormHelperText />
      </FormControl>
      <div className="absolute top-[56.875rem] left-[73.688rem] rounded-tl-8xs rounded-tr-none rounded-br-none rounded-bl-8xs bg-default-theme-white border-darkslategray-800 border-[1px] border-solid box-border w-[2.188rem] h-[2.063rem] flex flex-row items-center justify-center py-[0.5rem] px-[0.687rem] z-[1]">
        <img
          className="h-[0.813rem] w-[0.688rem] relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/chevrondoubleleft.svg"
        />
      </div>
      <div className="absolute top-[56.875rem] left-[75.813rem] bg-default-theme-white border-darkslategray-800 border-[1px] border-solid box-border w-[1.563rem] h-[2.063rem] flex flex-row items-center justify-center p-[0.5rem] z-[2]">
        <img
          className="h-[0.813rem] w-[0.438rem] relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/chevronleft.svg"
        />
      </div>
      <div className="absolute top-[56.875rem] left-[77.313rem] bg-default-theme-white border-darkslategray-800 border-[1px] border-solid box-border w-[1.375rem] h-[2.063rem] flex flex-row items-start justify-start py-[0.187rem] pl-[0.5rem] pr-[0.312rem] z-[3] text-[1rem] text-darkslategray-300">
        <div className="relative inline-block min-w-[0.438rem]">1</div>
      </div>
      <div className="absolute top-[56.875rem] left-[78.625rem] bg-darkslategray-300 flex flex-row items-start justify-start py-[0.281rem] pl-[0.5rem] pr-[0.437rem] z-[4] text-[1rem] text-default-theme-white">
        <div className="relative inline-block min-w-[0.688rem]">2</div>
      </div>
      <div className="absolute top-[56.875rem] left-[80.188rem] bg-default-theme-white border-darkslategray-800 border-[1px] border-solid box-border w-[1.625rem] h-[2.063rem] flex flex-row items-start justify-start py-[0.187rem] pl-[0.5rem] pr-[0.312rem] z-[5] text-[1rem] text-darkslategray-300">
        <div className="relative inline-block min-w-[0.688rem]">3</div>
      </div>
      <div className="absolute top-[56.875rem] left-[81.75rem] bg-default-theme-white border-darkslategray-800 border-[1px] border-solid box-border w-[1.875rem] h-[2.063rem] flex flex-row items-start justify-start py-[0.375rem] pl-[0.5rem] pr-[0.312rem] z-[6] text-[1rem] text-darkslategray-300 font-helvetica-neue">
        <div className="relative inline-block min-w-[0.938rem]">...</div>
      </div>
      <img
        className="absolute top-[56.875rem] left-[83.563rem] w-[1.563rem] h-[2.063rem] object-contain z-[7]"
        loading="lazy"
        alt=""
        src="/pagination-button-next@2x.png"
      />
      <div className="absolute top-[58.938rem] left-[87.25rem] rounded-tl-8xs rounded-tr-none rounded-br-none rounded-bl-8xs bg-default-theme-white border-darkslategray-800 border-[1px] border-solid box-border w-[2.188rem] h-[2.063rem] flex flex-row items-center justify-center py-[0.5rem] px-[0.687rem] [transform:_rotate(180deg)] [transform-origin:0_0] z-[8]">
        <img
          className="h-[0.813rem] w-[0.688rem] relative overflow-hidden shrink-0 [transform:_rotate(-180deg)]"
          loading="lazy"
          alt=""
          src="/chevrondoubleleft.svg"
        />
      </div>
      <section className="absolute top-[calc(50%_-_492px)] left-[calc(50%_-_720px)] bg-gray-300 w-full h-full z-[9]" />
      <GroupComponent3 />
    </div>
  );
};

export default CreateNewHunt;
