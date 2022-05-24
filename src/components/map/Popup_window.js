import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { atomLatitude, atomPass } from "../../recoil/parameters";
import SearchLocation from "./Search_Location";

export default function Popup_window() {
  const [open, setOpen] = React.useState(false);
  const setPass = useSetRecoilState(atomPass);
  const handleClickOpen = () => {
    setPass(false);
    setOpen(true);
  };
  const handleClose = () => {
    setPass(true);
    updatePass();
    setOpen(false);
  };
  const [latitude, setLatitude] = useRecoilState(atomLatitude);
  const [myLatitude, setMyLatitude] = useState(latitude);
  const [longitude, setLongitude] = useState(0);

  const updateLatitude = (e) => {
    setMyLatitude(e.target.value);
  };

  const updateLongitude = (e) => {
    setLongitude(e.target.value);
  };

  const updatePass = (e) => {
    setLatitude(myLatitude);
    // hier nog myLatitude en Longitude posten in database
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
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
            <SearchLocation />
            <TextField
              label="Latitude"
              value={myLatitude}
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
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
