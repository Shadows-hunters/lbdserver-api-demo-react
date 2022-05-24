import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import atomGltfModel from "../../recoil/model/atomGltfModel";
import {
  atomDate,
  atomInterval,
  atomLatitude,
  atomOffset,
  atomRange,
} from "../../recoil/parameters";
import { atomModelDownload } from "../../recoil/pop-ups";

export default function ModelDownload() {
  const [open, setOpen] = useRecoilState(atomModelDownload);
  const handleClose = () => {
    setOpen(false);
  };
  const handleDownload = () => {
    exportIt();
    setOpen(false);
  };

  const [name, setName] = React.useState();
  const updateName = (e) => {
    setName(e.target.value);
  };

  const gltf = useRecoilValue(atomGltfModel);

  function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
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
    download(JSON.stringify(myGltf), name + ".gltf");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Download scene as .gltf"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="name"
          value={name}
          onChange={updateName}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDownload} color="success" variant="contained">
          Download
        </Button>
        <Button onClick={handleClose}>Exit</Button>
      </DialogActions>
    </Dialog>
  );
}
