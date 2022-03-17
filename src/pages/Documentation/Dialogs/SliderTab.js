import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField, Stack, Button } from '@mui/material';
import SpanSlider from '../../../components/Sliders/SpanSlider';
import IntervalSlider from '../../../components/Sliders/IntervalSlider';


export default function SliderTab(props) {
  const { title, description } = props
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [tijdspan, setTijdspan] = useState('');
  const toSliderTab = (data) => {
    setTijdspan(data);
  };

  const handleSubmit = () => {
    console.log(date.value);
    console.log(tijdspan);
  };
   
  return (
    <Stack component="form"  spacing={1} sx={{ width: '100%' }}>
      <Typography component={"span"} variant="h5">{title}</Typography>
      <Typography>Date</Typography>
        <TextField
          id="date"
          type="date"
          defaultValue="2022-03-17"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      <Typography>Time span</Typography>
        <SpanSlider toSliderTab={toSliderTab}/>
      <Typography>Location</Typography>
      <Box sx={{ '& .MuiTextField-root': { m: 1} }}>
        <TextField
          label="Latitude"
          id="latitude"
          defaultValue="50.850346"
        />
        <TextField
          label="Longitude"
          id="longitude"
          defaultValue="4.351721"
        />        
      </Box>
      <Typography>Shadows interval</Typography>
      <IntervalSlider/>
      <Button 
        onClick={handleSubmit}
        variant="outlined" 
        color="success"
      >
        Submit
      </Button>
    </Stack>
  );
}
