import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { atomMyLatitude } from "../../recoil/parameters";
import SearchLocation from "./Search_Location";

export default function Popup_window() {
  var newLocation = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      city: myLocation,
      latitude: parseInt(latitude),
      longitude: parseInt(longitude),
      forced: true,
    });
    console.log(raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/map", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  var newLocation2 = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      city: document.getElementById("search-location-box").value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/mapget", requestOptions)
      .then((response) => response.text())
      .then((result) => test(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  const test = (e) => {
    console.log(e);
    console.log(e.latitude);
    setAtomLatitude(e.latitude);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    newLocation();
    setAtomLatitude(latitude);
    setOpen(false);
  };
  const handleClose1 = () => {
    newLocation2();
    setOpen(false);
  };

  const setAtomLatitude = useSetRecoilState(atomMyLatitude);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [myLocation, setLocation] = useState("Location 1");

  const updateLatitude = (e) => {
    setLatitude(e.target.value);
  };

  const updateLongitude = (e) => {
    setLongitude(e.target.value);
  };

  const updateLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div>
      <Button sx={{ ml: "8px" }} variant="outlined" onClick={handleClickOpen}>
        Don't know exact location?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent dividers>
          <Stack spacing={2}>
            <Typography>
              Search in the list for places. If your location is not included
              yet, you can add it via coordinates once and we will save it so
              you can reuse it later form the database.
            </Typography>
            <Stack spacing={2} direction="row">
              <SearchLocation />
              <DialogActions>
                <Button autoFocus onClick={handleClose1}>
                  Save location
                </Button>
              </DialogActions>
            </Stack>
            <Typography>
              If your location can not be found in the list, you can add it
              here.
            </Typography>
            <TextField
              label="Name Location"
              value={myLocation}
              onChange={updateLocation}
            />
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Add location to list</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
