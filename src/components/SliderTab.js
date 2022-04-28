import AvTimerIcon from "@mui/icons-material/AvTimer";
import EventIcon from "@mui/icons-material/Event";
import GrainIcon from "@mui/icons-material/Grain";
import MapIcon from "@mui/icons-material/Map";
import DateAdapter from "@mui/lab/AdapterDayjs";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  Button,
  Slider,
  SliderThumb,
  Stack,
  TextField,
} from "@mui/material";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { sunPositions } from "./calculations/formulas";
import DrawerItem from "./layout/DrawerItem";

var dayjs = require("dayjs");
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

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
  const [date, setDate] = useState("2022-03-17");
  const [range, setRange] = useState([7, 17]);
  const [interval, setInterval] = useState(1);
  const [result, setResult] = useState("resultaat");
  const [latitude, setLatitude] = useState("50.850346");
  const [longitude, setLongitude] = useState("4.351721");

  const updateRange = (e, data) => {
    setRange(data);
  };
  const updateInterval = (e, data) => {
    setInterval(data);
  };
  const updateLatitude = (e) => {
    setLatitude(e.target.value);
  };
  const updateLongitude = (e) => {
    setLongitude(e.target.value);
  };

  // sun position
  const handleSubmit = () => {
    // -----------
    // to use api for calculations
    // -----------

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   date: date,
    //   start: range[0],
    //   end: range[1],
    //   longitude: longitude,
    //   latitude: latitude,
    //   interval: interval,
    // });

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch("http://localhost:8080/positions", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => setResult(result))
    //   .catch((error) => console.log("error", error));

    setResult(
      sunPositions(date, range[0], range[1], latitude, longitude, interval)
    );
    props.result(result);
  };

  return (
    <List onClick={props.MyOpen}>
      <DrawerItem
        title="Date"
        icon={<EventIcon />}
        body={
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
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
            value={range}
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
              value={latitude}
              onChange={updateLatitude}
            />
            <TextField
              label="Longitude"
              value={longitude}
              onChange={updateLongitude}
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
            value={interval}
            onChange={updateInterval}
            components={{ Thumb: SpanComponent }}
            step={0.25}
            marks={marks2}
            min={0.25}
            max={4}
          />
        }
      />
      <Stack sx={{ width: "100px", ml: "70px", mt: "20px" }}>
        <Button onClick={handleSubmit} variant="outlined" color="success">
          Submit
        </Button>
      </Stack>
    </List>
  );
}
