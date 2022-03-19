import DateAdapter from "@mui/lab/AdapterDayjs";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button, Slider, SliderThumb, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

var SunCalc = require("suncalc");

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

const Separator = styled("div")(
  ({ theme }) => `
  height: ${theme.spacing(1)};
`
);

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
  const { title } = props;

  const [date, setDate] = useState("2022-03-17");
  const [range, setRange] = useState([7, 17]);
  const [interval, setInterval] = useState(1);
  const [result, setResult] = useState("resultaat");

  const updateRange = (e, data) => {
    setRange(data);
  };
  const updateInterval = (e, data) => {
    setInterval(data);
  };

  // sun position
  const handleSubmit = () => {
    let i = range[0];
    var arr = [];
    var day = dayjs(date);

    while (i <= range[1]) {
      const d = day.add(i * 60, "minute");
      console.log(d);
      let position = SunCalc.getPosition(d, latitude.value, longitude.value);
      arr.push(position);
      i += interval;
    }
    setResult(JSON.stringify(arr));
  };

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Typography component={"span"} variant="h5">
        {title}
      </Typography>
      <Typography>Date</Typography>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Typography>Time span</Typography>
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
      <Separator />
      <Typography>Location</Typography>
      <Box sx={{ "& .MuiTextField-root": { m: 1 } }}>
        <TextField label="Latitude" id="latitude" defaultValue={"50.850346"} />
        <TextField label="Longitude" id="longitude" defaultValue={"4.351721"} />
      </Box>
      <Typography>Shadows interval</Typography>
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
      <Separator />
      <Button onClick={handleSubmit} variant="outlined" color="success">
        Submit
      </Button>
      <Typography variant="caption" fontSize={10}>
        {result}
      </Typography>
    </Stack>
  );
}
