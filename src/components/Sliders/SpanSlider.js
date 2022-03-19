import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

export default function SpanSlider() {
  const Span = styled(Slider)(({ theme }) => ({
    color: "#52af77",
    height: 8,
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

  const marks = [
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

  const [val, setVal] = useState([6, 16]);
  const updateRange = (e, data) => {
    setVal(data);
  };

  return (
    <Span
      valueLabelDisplay="auto"
      components={{ Thumb: SpanComponent }}
      defaultValue={[6, 16]}
      onChange={updateRange}
      step={1}
      marks={marks}
      min={5}
      max={24}
    />
  );
}
