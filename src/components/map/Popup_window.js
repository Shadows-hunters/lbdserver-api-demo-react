import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField, Stack } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { atomLatitude, atomLongitude, atomPass } from "../../recoil/parameters";
import SearchLocation from "./Search_Location";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function Popup_window() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [pass, setPass] = useRecoilState(atomPass);
  const [latitude, setLatitude] = useRecoilState(atomLatitude);
  const [longitude, setLongitude] = useRecoilState(atomLongitude);

  // copy atom to cache for use while passing is set of
  const [myLatitude, setMyLatitude] = useState(latitude);
  const [myLongitude, setMyLongitude] = useState(longitude);

  const updateLatitude = (e) => {
    if (pass) {
      setLatitude(e.target.value);
    }
    setMyLatitude(e.target.value);
  };
  const updateLongitude = (e) => {
    if (pass) {
      setLongitude(e.target.value);
    }
    setMyLongitude(e.target.value);
  };

  const updatePass = (e) => {
    if (pass) {
      setPass(false);
    } else {
      setPass(true);
      // update atoms
      setLatitude(myLatitude);
      setLongitude(myLongitude);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Don't know exact location?
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Search in list or add location
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Typography>
              Search in the list for places. If your location is not included
              yet, you can add it via coordinates once and we will save it so
              you can reuse it later form the database.
            </Typography>
            <SearchLocation></SearchLocation>
            <TextField
              label="Latitude"
              value={myLatitude}
              onChange={updateLatitude}
            />
            <TextField
              label="Longitude"
              value={myLongitude}
              onChange={updateLongitude}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
