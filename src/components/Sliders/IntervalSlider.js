import Slider from '@mui/material/Slider';
import * as React from 'react';

const marks = [
  {
    value: 0.5,
    label: "30min",
  },
  {
    value: 1,
    label: '1h',
  },
  {
    value: 2,
    label: '2h',
  },
  {
    value: 3,
    label: '3h',
  },
];

export default function IntervalSlider(props) {  
  return (
    <Slider
        valueLabelDisplay="auto"
        defaultValue={1}
        step={0.25}
        marks={marks}
        min={0.25}
        max={4}
    />
  );
}
