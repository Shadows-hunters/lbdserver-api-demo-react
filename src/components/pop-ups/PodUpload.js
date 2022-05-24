import { Divider, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import  * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import atomGltfModel from "../../recoil/model/atomGltfModel";
import {
    atomDate,
    atomInterval,
    atomLatitude,
    atomOffset,
    atomRange
} from "../../recoil/parameters";
import { atomPodUpload } from "../../recoil/pop-ups";

export default function PodUpload() {

  const [open, setOpen] = useRecoilState(atomPodUpload);
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = () => {
    exportIt();
    setOpen(false);
  };

  const [myUrl, setMyUrl] = React.useState();
  const updateMyUrl = (e) => {
    setMyUrl(e.target.value);
  };

  const gltf = useRecoilValue(atomGltfModel);

  function upload(data, filename) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    };
    
    fetch("http://localhost:5000/Student/data/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  var myObject = {
    date: useRecoilValue(atomDate),
    timespan: useRecoilValue(atomRange),
    latitude: useRecoilValue(atomLatitude),
    offset: useRecoilValue(atomOffset),
    interval: useRecoilValue(atomInterval),
  };

  const exportIt = (e) => {
    const myGltf = JSON.parse(gltf);
    myGltf["ShadowHunting"] = myObject;
    upload(JSON.stringify(myGltf), ".gltf");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Upload to Solid Pod"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Pod folder url"
          value={myUrl}
          onChange={updateMyUrl}
          margin="dense"
        />
        <Divider sx={{ mt: "4px" }} />
        <TextField margin="dense" label="username" disabled={true} />
        <TextField
          sx={{ ml: "8px" }}
          margin="dense"
          label="password"
          disabled={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpload} color="success" variant="contained">
          Upload
        </Button>
        <Button onClick={handleClose}>Exit</Button>
      </DialogActions>
    </Dialog>
  );
}
