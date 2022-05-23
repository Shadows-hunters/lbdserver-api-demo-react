import AvTimerIcon from "@mui/icons-material/AvTimer";
import EventIcon from "@mui/icons-material/Event";
import GrainIcon from "@mui/icons-material/Grain";
import MapIcon from "@mui/icons-material/Map";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DateAdapter from "@mui/lab/AdapterDayjs";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  Slider,
  SliderThumb,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import atomModel from "../recoil/model/atomModel";
import {
  atomDate,
  atomInterval,
  atomLatitude,
  atomOffset,
  atomPass,
  atomRange,
} from "../recoil/parameters";
import atomSidebar from "../recoil/sidebar/atomSidebar";
import DrawerItem from "./layout/DrawerItem";

const MySlider = styled(Slider)(() => ({
  color: "#52af77",
  height: 8,
  mb: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
}));

const marks1 = [
  {
    value: 7,
    label: "7h",
  },
  {
    value: 12,
    label: "12h",
  },
  {
    value: 17,
    label: "17h",
  },
  {
    value: 22,
    label: "22h",
  },
];

const marks2 = [
  {
    value: 0.5,
    label: "30min",
  },
  {
    value: 1,
    label: "1h",
  },
  {
    value: 2,
    label: "2h",
  },
  {
    value: 3,
    label: "3h",
  },
];

function SpanComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

export default function SliderTab(props) {
  const [pass, setPass] = useRecoilState(atomPass);
  const [date, setDate] = useRecoilState(atomDate);
  const [range, setRange] = useRecoilState(atomRange);
  const [interval, setInterval] = useRecoilState(atomInterval);
  const [latitude, setLatitude] = useRecoilState(atomLatitude);
  const [offset, setOffset] = useRecoilState(atomOffset);

  // copy atom to cache for use while passing is set of
  const [myDate, setMyDate] = useState(date);
  const [myRange, setMyRange] = useState(range);
  const [myInterval, setMyInterval] = useState(interval);
  const [myLatitude, setMyLatitude] = useState(latitude);
  const [myOffset, setMyOffset] = useState(offset);

  const setOpen = useSetRecoilState(atomSidebar);

  const updateOpen = () => {
    setOpen(true);
  };

  const updateRange = (e, data) => {
    // if passing: also updating atom
    if (pass) {
      setRange(data);
    }
    setMyRange(data);
  };
  const updateInterval = (e, data) => {
    if (pass) {
      setInterval(data);
    }
    setMyInterval(data);
  };
  const updateLatitude = (e) => {
    if (pass) {
      setLatitude(e.target.value);
    }
    setMyLatitude(e.target.value);
  };
  const updateOffset = (e) => {
    if (pass) {
      setOffset(e.target.value);
    }
    setMyOffset(e.target.value);
  };

  const updatePass = (e) => {
    if (pass) {
      setPass(false);
    } else {
      setPass(true);
      // update atoms
      setDate(myDate);
      setRange(myRange);
      setInterval(myInterval);
      setLatitude(myLatitude);
      setOffset(myOffset);
    }
  };

  // setter function for model URL
  const setModel = useSetRecoilState(atomModel);

  const newModel = (e) => {
    const uploadedFile = e.target.files[0];
    const url = URL.createObjectURL(uploadedFile);
    setModel(url);
  };

  const newModelUrl = (e) => {
    var myUrl = document.getElementById("myUrl").value;
    console.log(myUrl);
    setModel(myUrl);
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <List onClick={updateOpen}>
      <DrawerItem
        title="Date"
        icon={<EventIcon />}
        body={
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              value={myDate}
              onChange={(newValue) => {
                if (pass) {
                  setDate(newValue.toString());
                }
                setMyDate(newValue.toString());
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        }
      />
      <DrawerItem
        title="Time span"
        icon={<AvTimerIcon />}
        body={
          <MySlider
            valueLabelDisplay="auto"
            value={myRange}
            onChange={updateRange}
            components={{ Thumb: SpanComponent }}
            step={1}
            marks={marks1}
            min={5}
            max={24}
          />
        }
      />
      <DrawerItem
        title="Location"
        icon={<MapIcon />}
        body={
          <Box sx={{ "& .MuiTextField-root": { m: 1 }, width: "130px" }}>
            <TextField
              label="Latitude"
              value={myLatitude}
              onChange={updateLatitude}
            />
            <TextField
              label="Building orientation"
              value={myOffset}
              onChange={updateOffset}
            />
          </Box>
        }
      />
      <DrawerItem
        title="Shadow interval"
        icon={<GrainIcon />}
        body={
          <MySlider
            valueLabelDisplay="auto"
            value={myInterval}
            onChange={updateInterval}
            components={{ Thumb: SpanComponent }}
            step={0.25}
            marks={marks2}
            min={0.25}
            max={4}
          />
        }
      />
      <Divider />
      <Box sx={{ ml: "10px", mt: "10px", mb: "7px" }}>
        <label htmlFor="icon-button-file">
          <Input
            accept=".gltf, .glb"
            id="icon-button-file"
            type="file"
            onChange={newModel}
            sx={{ mt: "10px" }}
          />
          <IconButton component="span" sx={{ mt: "10px", mr: "10px" }}>
            <UploadFileIcon />
          </IconButton>
        </label>
        <TextField id="myUrl" label="or enter URL" variant="standard" />
        <IconButton
          component="span"
          sx={{ mt: "10px", mr: "10px" }}
          onClick={newModelUrl}
        >
          <TaskAltIcon />
        </IconButton>
        <Typography sx={{ ml: "50px", mt: "10px" }} display="block" variant="caption">Accepts .gltf and .glb files</Typography>
      </Box>
      <Divider />
      <Box sx={{ width: "100px", ml: "70px", mt: "10px" }}>
        <FormControlLabel
          control={<Switch checked={pass} onChange={updatePass} />}
          label="Live change?"
        />
      </Box>
    </List>
  );
}
